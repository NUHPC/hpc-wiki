# Systems

NU RC operates Irgetas, Shabyt and Muon. Choose the smallest system and partition that meet the workload's CPU, memory, GPU and interconnect needs.

!!! warning "Snapshot-derived inventory"
    The inventory below was extracted from pages saved on 4 August 2026. Hardware is relatively stable, but operating systems, available nodes and storage status can change. Before publication, an administrator should resolve the CPU-model conflict noted below and verify the live inventory.

## At a glance

| Cluster | Compute nodes | CPU cores per node | Accelerator | Memory per node | CPU / GPU partition |
|---|---:|---:|---|---:|---|
| **Irgetas** | 10 CPU + 6 GPU | 192 | 4 × NVIDIA H100 80 GB on each GPU node | 384 GB CPU; 768 GB GPU | `ZEN4` / `H100` |
| **Shabyt** | 20 CPU + 4 GPU | 64 | 2 × NVIDIA V100 32 GB on each GPU node | 256 GB | `CPU` / `NVIDIA` |
| **Muon** | 10 CPU | 14 | None | 64 GB | `HPE` |

Use `sinfo` for availability and `scontrol show partition <name>` for the current partition configuration. Do not choose a GPU partition for a CPU-only workload merely because it is idle.

## Irgetas

Deployed in September 2025, Irgetas is a direct-liquid-cooled HPE system with an NVIDIA NDR fabric.

### Compute nodes

- **10 CPU nodes:** 2 × AMD EPYC 9684X (96 cores each), 384 GB DDR5-4800, 1.92 TB local SSD, 200 Gb/s NDR InfiniBand.
- **6 GPU nodes:** 2 × AMD EPYC 9654 (96 cores each), 4 × NVIDIA H100 SXM5 80 GB, 768 GB DDR5-4800, 1.92 TB local SSD, 2 × 400 Gb/s NDR InfiniBand.
- **Login node:** AMD EPYC 9684X, 192 GB RAM, 7.68 TB local SSD, 200 Gb/s NDR InfiniBand.

The Systems article names EPYC **9654** for GPU nodes, while the Policies article names EPYC **9454**. Both are site-specific claims and cannot be settled from the archive alone; this edition follows the more detailed Systems inventory and flags the value for administrator confirmation.

### Shared storage

The snapshot describes an all-NVMe `/shared` server with 122 TB raw and 84 TB usable RAID-6 capacity for software and home directories. Group storage is exposed under `/datahub`; see [Policies](policies.md) for quota and backup status.

<div class="quick-grid" markdown>

![Irgetas rack](../assets/images/Irgetas_picture_1.jpg){ loading=lazy }
![Irgetas equipment](../assets/images/Irgetas_picture_3.jpg){ loading=lazy }

</div>

## Shabyt

Deployed in 2020, Shabyt is an HPE cluster with an EDR InfiniBand fabric.

- **20 CPU nodes:** 2 × AMD EPYC 7502 (32 cores each), 256 GB DDR4-2933, 100 Gb/s EDR InfiniBand.
- **4 GPU nodes:** 2 × AMD EPYC 7452 (32 cores each), 2 × NVIDIA V100 32 GB, 256 GB DDR4-2933, 100 Gb/s EDR InfiniBand.
- **Login node:** AMD EPYC 7502P (32 cores), 256 GB RAM, 100 Gb/s EDR InfiniBand.
- **Shared storage:** 16 TB raw / 9.9 TB usable NVMe RAID-6 for `/shared`; a 144 TB raw HPE MSA array for `/zdisk`.

<div class="quick-grid" markdown>

![Shabyt racks](../assets/images/Shabyt_picture_1.jpg){ loading=lazy }
![Shabyt hardware diagram](../assets/images/Shabyt_hardware_scheme.png){ loading=lazy }

</div>

## Muon

Muon is an older HPE system deployed in 2017 and used by the Physics Department.

- **10 CPU nodes:** Intel Xeon E5-2690 v4 (14 cores), 64 GB DDR4-2400, 56 Gb/s FDR InfiniBand.
- **Login node:** Intel Xeon E5-2640 v4 (10 cores), 64 GB RAM, FDR InfiniBand plus 1 Gb/s Ethernet.
- **Storage:** 3.072 TB raw SSD RAID-Z2 for `/shared` and 7.2 TB raw HDD RAID-5 for `/zdisk`.

The old Policies text says Muon compute-to-storage traffic is limited to “1 Mbit/s Ethernet”, which conflicts with this inventory and is almost certainly a unit or topology error. The new documentation makes no throughput promise until the storage path is measured and confirmed.

<div class="quick-grid" markdown>

![Muon equipment](../assets/images/Muon_picture_1.jpg){ loading=lazy }
![Muon cluster](../assets/images/Muon_picture_3.jpg){ loading=lazy }

</div>

## Other campus facilities

The snapshot also listed facilities that are not managed by NU RC:

| Facility | Snapshot summary | Access route |
|---|---|---|
| Q-Symphony bioinformatics cluster | 8 dual-Xeon nodes with 512 GB RAM each; 1.3 PB raw storage; FDR InfiniBand | Contact the owning bioinformatics laboratory |
| ISSAI AI infrastructure | DGX-1, DGX-2 and DGX A100 systems with NVIDIA accelerators | Contact ISSAI |

Ownership and contacts change more often than hardware. The public documentation should link to an authoritative unit directory instead of embedding personal contact details.

## Inspect the node assigned to a job

Inside a Slurm allocation:

```bash
lscpu
free -h
numactl --hardware        # if installed
nvidia-smi -L            # GPU jobs only
cat /etc/os-release
```

Do not run sustained benchmarks on a login node. Record the job ID, node list and module set with performance results.
