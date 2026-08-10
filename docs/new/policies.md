# Policies and limits

These rules protect a shared research service. Users are responsible for their accounts, jobs and data; principal investigators are responsible for ensuring that group members are trained and that use is authorized for university research or teaching.

!!! warning "Administrator approval required"
    Numerical values on this page come from MHTML snapshots saved on 4 August 2026. They are presented as a migration baseline, not as proof of the live configuration. The HPC Committee and administrators may change limits. Complete the [maintainer checklist](../contribute/maintainer-checklist.md) before treating this edition as policy.

## Acceptable use

- Use only your own account and approved authentication methods. Do not share credentials.
- Submit production computation through Slurm. Login nodes are for access, file management, editing, compilation and short tests.
- Request resources that the application will use. Release interactive allocations promptly.
- Do not attempt to bypass quotas, scheduler controls, access restrictions or licensing.
- Protect confidential, licensed and personally identifiable data according to NU policy and applicable law.
- Report suspected security incidents, compromised credentials and destructive software behavior immediately.

Intentional misuse or repeated noncompliance may lead to account suspension and escalation under university policy. Link the final site to the authoritative NU Acceptable Use Policy; the MHTML archive did not include that policy's text.

## Storage

### Snapshot quota baseline

| System | Home path | Default home quota | Group path | Default group quota |
|---|---|---:|---|---:|
| Irgetas | `/shared/home/<username>` | 400 GB | `/datahub/<group>` | 1 TB |
| Shabyt | `/shared/home/<username>` | 100 GB | `/zdisk/<group>` | 1 TB |
| Muon | `/shared/home/<username>` | 300 GB | `/zdisk/<group>` | 1 TB |

Quota increases require a PI-supported Helpdesk request and are reviewed individually. Capacity units, grace periods, inode limits and group ownership should be stated in the approved operational policy.

### Check usage

The snapshot mentions `uq`, `userquota` and the following BeeGFS queries:

```bash
beegfs-ctl --getquota --uid "$(id -u)"
beegfs-ctl --getquota --uid "$(id -u <username>)"
```

These commands are filesystem- and permission-dependent. The archive's description of Muon storage does not clearly match the BeeGFS command, so maintainers must document one tested command per filesystem instead of promising that every command works everywhere.

### Performance is not capacity

Use home/shared SSD storage for active work and group HDD storage for larger, less latency-sensitive data. The old pages repeatedly say “1 Mbit/s Ethernet”; the hardware inventory names 1 Gb/s Ethernet and InfiniBand links. This edition removes the unsupported throughput promise. Measure representative I/O inside an allocation and confirm the storage topology with administrators.

### Backup and recovery

The snapshot says `/shared/home` is backed up several times per week and that `/zdisk` and `/datahub` are not covered. Until an approved service definition states otherwise:

- treat group storage as **not backed up**;
- keep an independent copy of irreplaceable data;
- do not treat RAID as backup;
- expect storage to be unavailable during a hardware incident;
- verify recovery-point, retention and restore-request procedures before relying on home backup.

## Partitions and wall times

| System | Partition | Nodes | CPU cores / threads per node | RAM per node | GPUs per node | Snapshot maximum wall time |
|---|---|---:|---:|---:|---:|---:|
| Irgetas | `ZEN4` | 10 | 192 / 384 | 384 GB | — | 7 days |
| Irgetas | `H100` | 6 | 192 / 384 | 768 GB | 4 × H100 | 4 days |
| Shabyt | `CPU` | 20 | 64 / 128 | 256 GB | — | 14 days |
| Shabyt | `NVIDIA` | 4 | 64 / 128 | 256 GB | 2 × V100 | 2 days |
| Muon | `HPE` | 10 | 14 / 28 | 64 GB | — | 14 days |

Live checks:

```bash
sinfo -o "%P %a %l %D %c %m %G"
scontrol show partition <partition>
```

The scheduler may reserve some memory for the operating system. Do not infer an exact `--mem` ceiling solely from installed RAM.

## Quality of Service

The snapshot lists the following categories:

| Cluster | QoS values | Intended group in snapshot |
|---|---|---|
| Irgetas | `hpcnc`, `nu`, `issai`, `issai-ext`, `stud` | HPCNC; general NU; ISSAI; ISSAI external collaborators; course students |
| Shabyt | `hpcnc`, `nu`, `stud` | HPCNC; general NU; course students |
| Muon | `hpcnc`, `nu` | HPCNC; general NU |

The old page says Irgetas has four categories but lists five; this edition corrects the count by avoiding the contradictory sentence. Users normally should not select a QoS unless administrators instruct them to do so.

Where permitted, inspect associations with:

```bash
sacctmgr show assoc user="$USER" format=Cluster,Account,User,Partition,QOS
```

## Snapshot concurrency limits

The values below reproduce the 4 August 2026 snapshot in a more compact form. “CPU” means the site's configured Slurm CPU unit; confirm whether it maps to a core or hardware thread.

| System | QoS | Partition | Running jobs | CPU cores | Threads | GPUs | Relative priority |
|---|---|---|---:|---:|---:|---:|---:|
| Irgetas | `hpcnc` | `ZEN4` | 12 | 576 | 1,152 | — | 5 |
| Irgetas | `nu` | `ZEN4` | 12 | 576 | 1,152 | — | 5 |
| Irgetas | `issai` | `ZEN4` | 12 | 576 | 1,152 | — | 5 |
| Irgetas | `issai-ext` | `ZEN4` | 4 | 192 | 384 | — | 1 |
| Irgetas | `stud` | `ZEN4` | 4 | 192 | 384 | — | 5 |
| Irgetas | `hpcnc` | `H100` | 12 | 576 | 1,152 | 12 | 5 |
| Irgetas | `nu` | `H100` | 12 | 576 | 1,152 | 12 | 5 |
| Irgetas | `issai` | `H100` | 24 | 1,152 | 2,304 | 24 | 10 |
| Irgetas | `issai-ext` | `H100` | 12 | 576 | 1,152 | 12 | 5 |
| Irgetas | `stud` | `H100` | 4 | 192 | 384 | 4 | 5 |
| Shabyt | `hpcnc` | `CPU`, `NVIDIA` | 40 | 1,280 | 2,560 | 8 | 10 |
| Shabyt | `nu` | `CPU`, `NVIDIA` | 12 | 256 | 512 | 8 | 5 |
| Shabyt | `stud` | `CPU`, `NVIDIA` | 4 | 128 | 256 | 4 | 5 |
| Muon | `hpcnc` | `HPE` | 40 | 140 | 280 | — | 10 |
| Muon | `nu` | `HPE` | 40 | 140 | 280 | — | 10 |

Treat these as caps, not entitlements or performance targets. Pending work can be constrained by fair share, associations, reservations, licenses, maintenance and the requested combination of resources.

## Efficient scheduling

- Ask for realistic wall time and memory; shorter or smaller jobs may fit scheduling gaps.
- Use CPU partitions for CPU-only workloads.
- Use `--exclusive` only when the job genuinely needs an entire node.
- Use job arrays with a concurrency cap for independent sweeps.
- Check `sacct`/`seff` after representative jobs and tune future requests.
- Checkpoint runs that approach a partition's time limit.

## Publications

If NU RC resources were essential to published work, include an acknowledgment containing the exact service name **Nazarbayev University Research Computing**. Examples:

> The authors acknowledge the use of computational resources provided by Nazarbayev University Research Computing.

> A.B. and C.D. acknowledge the use of the Irgetas HPC cluster at Nazarbayev University Research Computing.

Record publications through the university process if required by the final service policy.

## Requesting help

For policy, quota or access changes, use the approved Helpdesk service. For a failed job, send the cluster name, job ID, batch script, `module list`, relevant `sacct` output and the smallest error excerpt to [hpcadmin@nu.edu.kz](mailto:hpcadmin@nu.edu.kz). Do not include passwords, tokens, private keys or unnecessary research data.
