# Quick start

This path submits a harmless job, checks its state and reads its output. It does not require application modules.

## 1. Confirm access details

You need an active NU HPC account, the approved network path (campus network or VPN, if required), and the external login hostname supplied by the HPC team.

!!! warning "Access page was missing from the archive"
    The imported pages mention the internal aliases `access` (Irgetas), `ln01` (Shabyt) and `mln01` (Muon), but not the public FQDN, VPN route, MFA flow or account-request procedure. Maintainers must add those values before publishing this page.

From your **local computer**:

```bash
ssh <username>@<cluster-login-host>
```

On first contact, compare the host-key fingerprint with a value published by the HPC team. Do not approve an unexpected or changed fingerprint without verification.

## 2. Create a working directory

After login:

```bash
mkdir -p "$HOME/hpc-tutorial/logs"
cd "$HOME/hpc-tutorial"
```

Keep each project in its own directory. Store source and small configuration files in Git; do not commit large datasets, credentials or generated results.

## 3. Select a partition

The snapshot lists these partition names:

| Cluster | General CPU | GPU |
|---|---:|---:|
| Irgetas | `ZEN4` | `H100` |
| Shabyt | `CPU` | `NVIDIA` |
| Muon | `HPE` | — |

Confirm the live value before submitting:

```bash
sinfo -o "%P %a %l %D %G"
```

## 4. Write a batch script

Create `hello.slurm` and replace `<partition>` with the CPU partition for your cluster:

```bash title="hello.slurm"
#!/bin/bash
#SBATCH --job-name=hello
#SBATCH --partition=<partition>
#SBATCH --time=00:02:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=256M
#SBATCH --output=logs/%x-%j.out

set -euo pipefail

echo "job_id=${SLURM_JOB_ID}"
echo "host=$(hostname)"
echo "started=$(date --iso-8601=seconds)"
srun sleep 10
echo "finished=$(date --iso-8601=seconds)"
```

`%x` expands to the job name and `%j` to the job ID. Slurm does not create missing parent directories, which is why `logs/` was created first.

## 5. Submit and monitor

```bash
sbatch hello.slurm
squeue --me
```

`sbatch` prints the assigned job ID. It is an identifier, not a fixed four- or five-digit number. For a specific job:

```bash
scontrol show job <job-id>
squeue -j <job-id> -o "%.18i %.9P %.16j %.2t %.10M %.6D %R"
```

`R` means running and `PD` means pending. For a pending job, the final column gives a reason such as `Resources`, `Priority` or a request/configuration problem. An estimated start time is only an estimate:

```bash
squeue --start -j <job-id>
```

Cancel a job when it is no longer needed:

```bash
scancel <job-id>
```

## 6. Read output and accounting

After the job leaves `squeue`:

```bash
cat logs/hello-<job-id>.out
sacct -j <job-id> --format=JobID,JobName,Partition,State,Elapsed,MaxRSS,ExitCode
```

If `seff` is installed, `seff <job-id>` gives a compact efficiency summary. Use the measurements to reduce over-requested time, memory and CPUs on later runs.

## Transfer files

Run transfers from your **local computer**, not from an active compute job:

=== "rsync (recommended)"

    ```bash
    rsync -avP ./project/ <username>@<cluster-login-host>:~/project/
    rsync -avP <username>@<cluster-login-host>:~/project/results/ ./results/
    ```

=== "scp"

    ```bash
    scp -r ./project <username>@<cluster-login-host>:~/
    ```

`rsync` can resume and avoid retransferring unchanged files. Follow university rules for sensitive, licensed or personally identifiable data.

## Short interactive work

Use an interactive allocation for debugging, not for an unattended production run:

```bash
srun --partition=<partition> --time=00:20:00 \
  --nodes=1 --ntasks=1 --cpus-per-task=2 --mem=2G \
  --pty bash -l
```

The command may wait until resources are available. Exit the shell as soon as testing is complete so the allocation is released.

## Next steps

- Choose the closest [job template](job-submission.md).
- Learn how to [find modules and create Python environments](software.md).
- Check [wall times, quotas and backup coverage](policies.md).
