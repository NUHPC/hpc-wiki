# Maintainer checklist

Resolve these items with the live service before publishing the rewritten pages as authoritative.

## Access and support

- [ ] Add account eligibility and request steps.
- [ ] Publish each external login FQDN, required VPN/network route and MFA flow.
- [ ] Publish verified SSH host-key fingerprints through an independent trusted channel.
- [ ] Confirm the Helpdesk URL and the monitored support email.
- [ ] Document planned-maintenance and incident channels.

## Hardware and storage

- [ ] Resolve Irgetas H100-node CPU: EPYC 9654 in Systems vs EPYC 9454 in Policies.
- [ ] Verify node counts, RAM available to jobs, GPU models/memory and operating-system release.
- [ ] Correct the “1 Mbit/s Ethernet” claims and document the actual Shabyt `/zdisk` and Muon storage paths.
- [ ] Verify 84 TB usable Irgetas `/shared`, 9.9 TB Shabyt `/shared`, and group-storage capacities.
- [ ] Decide whether personal contact details for other campus facilities should be replaced with unit directories.

## Scheduler

- [ ] Capture `sinfo -o "%P %a %l %D %c %m %G"` on every cluster.
- [ ] Review `scontrol show partition` and approved QoS/association records.
- [ ] Verify wall times, per-user job/CPU/GPU caps and the meaning of “relative priority”.
- [ ] Confirm whether Slurm CPUs map to cores or hardware threads on each partition.
- [ ] Test `srun` with each supported MPI stack and document any required PMIx option.
- [ ] Confirm GPU request syntax: `--gpus`, `--gres`, and any required GPU type.
- [ ] Confirm `sacct`, `seff`, `--test-only` and email notification availability.

## Software

- [ ] Replace module placeholders only after running `module spider` on each cluster.
- [ ] Test the serial, OpenMP, MPI, GPU, Gaussian, MATLAB and LAMMPS examples in small allocations.
- [ ] Confirm Gaussian module/license access and the node-local scratch environment variable.
- [ ] Confirm MATLAB toolbox/license behavior.
- [ ] Document supported container runtime and image policy.

## Data policy

- [ ] Verify the 400 GB / 100 GB / 300 GB home quotas and 1 TB group quotas.
- [ ] Test one quota command per filesystem; resolve whether BeeGFS commands apply to Muon.
- [ ] Define backup scope, frequency, retention, recovery-point objective and restore process.
- [ ] State explicitly which filesystems are not backed up.
- [ ] Link authoritative acceptable-use, sensitive-data and retention policies.

## Git and publication

- [ ] Replace every `CHANGE-ME` repository/CODEOWNERS placeholder.
- [ ] Protect `main`; require reviews and the `build` check.
- [ ] Run `mkdocs build --strict` from a clean clone with Git plugins enabled.
- [ ] Review mobile, dark-mode, search, code-copy, diff and edit-link behavior.
- [ ] Decide whether to deploy with GitHub Pages, GitLab Pages or the university web platform.
