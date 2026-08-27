# Automatic deployment

The university Nginx site at `https://hpc-wiki.nu.edu.kz/` is separate from GitHub Pages. The required GitHub `build` check validates a pull request, but a merge does not update the Nginx document root by itself.

The supported server-side deployment uses a systemd timer on `hpc-wiki`:

1. poll `origin/main` every two minutes;
2. do nothing when the deployed commit is current;
3. check out a new `origin/main` commit in a dedicated clone;
4. build it with `mkdocs build --clean --strict` as an unprivileged user;
5. publish only a successful build to `/var/www/nu-hpc-wiki`;
6. restore the SELinux context and verify the local HTTPS endpoint;
7. record the deployed commit and write all output to the systemd journal.

The deployment checkout is separate from a maintainer's checkout under `/home/webadm`. Do not edit the deployment checkout manually.

## Security model

- `hpcwiki` is a system account without an interactive shell.
- Git fetch and MkDocs execute as `hpcwiki`, not root.
- The Python environment and deployment script are root-owned.
- Root only copies a completed static build, applies SELinux labels and performs the local health check.
- The installed script is outside the Git checkout. Updating `deploy/nu-hpc-wiki-deploy` in a pull request does not alter the server's executable until an administrator reviews and reinstalls it.
- The repository must remain protected by pull-request review and the required `build` check.

## One-time installation

Run these steps on `hpc-wiki` after the deployment files have been merged into `main`.

### 1. Update the administrator checkout

```bash
cd ~/nu-hpc-install/nu-hpc-mkdocs
git switch main
git pull --ff-only origin main
```

### 2. Verify required commands

```bash
for command in git rsync python3 curl restorecon flock runuser; do
  command -v "$command" || echo "MISSING: $command"
done
```

Install any missing packages through the approved Rocky Linux repositories before continuing.

### 3. Create the deployment identity and directories

```bash
id hpcwiki >/dev/null 2>&1 || \
  sudo useradd \
    --system \
    --home-dir /var/lib/nu-hpc-wiki/work \
    --no-create-home \
    --shell /usr/sbin/nologin \
    hpcwiki

sudo install -d \
  -o root \
  -g root \
  -m 0755 \
  /var/lib/nu-hpc-wiki

sudo install -d \
  -o hpcwiki \
  -g hpcwiki \
  -m 0755 \
  /var/lib/nu-hpc-wiki/work

sudo install -d \
  -o root \
  -g root \
  -m 0755 \
  /opt/nu-hpc-wiki \
  /var/www/nu-hpc-wiki
```

Keep the Nginx document root root-owned:

```bash
sudo chown -R root:root /var/www/nu-hpc-wiki
sudo find /var/www/nu-hpc-wiki -type d -exec chmod 0755 {} +
sudo find /var/www/nu-hpc-wiki -type f -exec chmod 0644 {} +
sudo restorecon -RF /var/www/nu-hpc-wiki
```

### 4. Create the dedicated checkout

```bash
sudo -u hpcwiki -H \
  git clone \
    --branch main \
    --single-branch \
    https://github.com/NUHPC/hpc-wiki.git \
    /var/lib/nu-hpc-wiki/work/repo
```

For a private repository, use an organization-approved read-only credential instead of placing a personal token in a command, service file or remote URL.

### 5. Create the root-owned Python environment

```bash
sudo python3 -m venv /opt/nu-hpc-wiki/venv

sudo /opt/nu-hpc-wiki/venv/bin/python \
  -m pip install \
  --disable-pip-version-check \
  -r /var/lib/nu-hpc-wiki/work/repo/requirements.lock.txt
```

Record the dependency set installed in that environment:

```bash
sudo sha256sum \
  /var/lib/nu-hpc-wiki/work/repo/requirements.lock.txt |
  awk '{print $1}' |
  sudo tee /opt/nu-hpc-wiki/requirements.sha256 >/dev/null

sudo chown root:root /opt/nu-hpc-wiki/requirements.sha256
sudo chmod 0644 /opt/nu-hpc-wiki/requirements.sha256
```

The split pipeline above is intentional. Do not paste the hash manually.

### 6. Install the reviewed script and units

```bash
sudo install \
  -o root -g root -m 0755 \
  deploy/nu-hpc-wiki-deploy \
  /usr/local/sbin/nu-hpc-wiki-deploy

sudo install \
  -o root -g root -m 0644 \
  deploy/nu-hpc-wiki-deploy.service \
  /etc/systemd/system/nu-hpc-wiki-deploy.service

sudo install \
  -o root -g root -m 0644 \
  deploy/nu-hpc-wiki-deploy.timer \
  /etc/systemd/system/nu-hpc-wiki-deploy.timer

sudo systemctl daemon-reload
```

Check the installed copies:

```bash
sudo bash -n /usr/local/sbin/nu-hpc-wiki-deploy
sudo systemd-analyze verify \
  /etc/systemd/system/nu-hpc-wiki-deploy.service \
  /etc/systemd/system/nu-hpc-wiki-deploy.timer
```

### 7. Run the first deployment

```bash
sudo systemctl start nu-hpc-wiki-deploy.service

sudo systemctl status \
  nu-hpc-wiki-deploy.service \
  --no-pager -l

sudo journalctl \
  -u nu-hpc-wiki-deploy.service \
  --no-pager -n 100
```

Success ends with a message similar to:

```text
[nu-hpc-wiki-deploy] Successfully deployed <commit>.
```

Verify that the recorded commit equals GitHub `main`:

```bash
sudo cat /var/lib/nu-hpc-wiki/deployed-commit

sudo -u hpcwiki -H \
  git -C /var/lib/nu-hpc-wiki/work/repo \
  rev-parse origin/main
```

### 8. Enable the timer

```bash
sudo systemctl enable --now nu-hpc-wiki-deploy.timer

systemctl list-timers \
  nu-hpc-wiki-deploy.timer \
  --all
```

The timer should show its next execution within approximately two minutes.

## Routine operation

After the timer is enabled, the publication flow is:

```text
branch → pull request → successful build → approval → merge to main
       → timer detects commit → strict server build → Nginx publication
```

No administrator login is required for an ordinary documentation merge.

Useful commands:

```bash
# Recent deployment log
sudo journalctl -u nu-hpc-wiki-deploy.service --no-pager -n 100

# Follow a deployment live
sudo journalctl -fu nu-hpc-wiki-deploy.service

# Trigger an immediate check
sudo systemctl start nu-hpc-wiki-deploy.service

# Show the deployed commit
sudo cat /var/lib/nu-hpc-wiki/deployed-commit

# Show the next scheduled check
systemctl list-timers nu-hpc-wiki-deploy.timer --all
```

## Dependency updates

The service deliberately refuses to deploy when `requirements.lock.txt` changes. This prevents a documentation merge from silently modifying the root-owned Python environment.

After reviewing and merging a dependency update, run:

```bash
cd ~/nu-hpc-install/nu-hpc-mkdocs
git switch main
git pull --ff-only origin main

sudo /opt/nu-hpc-wiki/venv/bin/python \
  -m pip install \
  --disable-pip-version-check \
  -r requirements.lock.txt

sudo sha256sum \
  requirements.lock.txt |
  awk '{print $1}' |
  sudo tee /opt/nu-hpc-wiki/requirements.sha256 >/dev/null

sudo systemctl start nu-hpc-wiki-deploy.service
```

## Pause or remove automatic deployment

Pause polling without removing files:

```bash
sudo systemctl disable --now nu-hpc-wiki-deploy.timer
```

Re-enable it:

```bash
sudo systemctl enable --now nu-hpc-wiki-deploy.timer
```

Do not delete the deployment checkout, virtual environment or current web root during ordinary troubleshooting. Their presence makes recovery and comparison easier.

## Troubleshooting

| Symptom | Check |
|---|---|
| Timer runs but no deployment occurs | Compare `deployed-commit` with `origin/main` and inspect the journal |
| `requirements.lock.txt changed` | Review the dependency PR, update the root-owned virtual environment and refresh its hash |
| Git authentication fails | Confirm the repository visibility or install an approved read-only credential |
| Strict build fails | Fix the documentation in a new pull request; the existing site remains in place |
| `rsync` or `restorecon` fails | Verify ownership, free space and SELinux status for `/var/www/nu-hpc-wiki` |
| Local HTTPS check fails | Check `nginx -t`, `systemctl status nginx` and the certificate for `hpc-wiki.nu.edu.kz` |

The deployment marker is written only after the build, copy, SELinux relabel and local HTTPS check succeed. A failed run remains visible in `systemctl status` and `journalctl` and is retried by the timer.
