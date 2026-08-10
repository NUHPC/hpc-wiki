# Policies

<div class="snapshot-banner">
Original wording normalized from <strong>Policies - NU HPC Wiki.mhtml</strong>, saved on 4 August 2026. Commands and limits on this page are historical and may be incorrect.
</div>

**Important Note:** Software configurations on NU HPC facilities are updated on a continuous basis. Minor policy changes also occur regularly. Some of these changes might not be immediately reflected on this website. The limits on job execution and maximum storage allocations are subject to change based on decisions made by the NU HPC Committee and actual system utilization.


## Acceptable use

The HPC system is a unique resource for NU researchers and the community. It has special characteristics, such as a large amount of RAM and the capability for massive parallelism. Due to its uniqueness and expense, its use is supervised by the HPC team to ensure efficient and fair utilization.

Users are accountable for their actions. It is responsibility of PIs to ensure that their group members have the necessary expertise to use NU HPC facilities properly and do it for research purposes only. Intentional misuse of NU HPC resources or noncompliance with our [Acceptable Use Policy](https://hpc.nu.edu.kz/index.php/Acceptable_Use_Policy "Acceptable Use Policy") can lead to temporary or permanent disabling of accounts, and administrative or even legal actions.

## Storage quotas

### Home directory

Users’ home directories are physically stored on fast SSD arrays that have very high bandwidth and enterprise class endurance of the flash drives.

In the case of Irgetas and Shabyt cluster, the main storage servers are connected to the system via Infiniband. All compute nodes are also connected via Infiniband. This provides very high bandwidth for users both when they access their data from the login node and when running their jobs on compute nodes using SLURM.

In Muon cluster the main SSD storage is in the login node with all SSD connected via fast u.2 interfaces. However, Muon's compute nodes have limited bandwidth with the login node (1 Mbit/s Ethernet). Therefore, batch jobs cannot read and write data faster than this network bandwidth.

|         |                           |                       |
|---------|---------------------------|-----------------------|
| System  | Path                      | Default storage limit |
| Irgetas | `/shared/home/<username>` | 400 GB                |
| Shabyt  | `/shared/home/<username>` | 100 GB                |
| Muon    | `/shared/home/<username>` | 300 GB                |

Default quota for users’ home directories on NU HPC systems

In some exceptional cases users may be granted a higher storage quota in their home directories. An increased limit must be requested via <a href="https://helpdesk.nu.edu.kz/support/catalog/items/272" class="external text" rel="nofollow">Helpdesk's ticketing system</a>. Such requests are reviewed on a individual basis and approved only in exceptional cases.

### Checking your storage quota

In Shabyt and Muon one can use the following terminal commands to check your or your group member storage quota in home directory as well as to see how much of it is actually being used.

`beegfs-ctl --getquota --uid $(id -u)`

`beegfs-ctl --getquota --uid $(id -u <username>)`

`uq`

`userquota`

### Additional storage - zdisk, datahub

In Shabyt cluster, users can store larger amounts of data in their group directory on a slower HDD array. Keep in mind that this array is not connected with Infiniband. Therefore, data access and transfer speeds from both the login node and compute nodes are limited to the standard 1 Mbit/s Ethernet speeds. In `/zdisk`, each research group has a shared allocation. This can be particularly handy when the data needs to be transferred, exchanged, or shared within a research group. Similarly, in Irgetas cluster, there is a directory called shared `/datahub` where each research group has its allocation for additional storage on an external HDD array.

|         |                                |                       |
|---------|--------------------------------|-----------------------|
| System  | Path                           | Default storage limit |
| Irgetas | `/datahub/<researchgroupname>` | 1 TB                  |
| Shabyt  | `/zdisk/<researchgroupname>`   | 1 TB                  |
| Muon    | `/zdisk/<researchgroupname>`   | 1 TB                  |

Default storage quota for zdisk on NU HPC systems

Again, in exceptional cases individual users or groups may be granted an increased quota. Such requests are reviewed on an individual basis upon receiving a ticket by the PI via <a href="https://helpdesk.nu.edu.kz/support/catalog/items/272" class="external text" rel="nofollow">NU Helpdesk</a>.


## Data Integrity and Backup

Users are fully responsible for the integrity and safety of their data stored on NU HPC facilities. Although our clusters employ enterprise-grade hardware, failures remain possible. Home directories (`/shared/home`) are automatically backed up several times per week. Please note that this policy does not cover group storage allocations in `/zdisk` and `/datahub`. In the event of a major hardware failure, access to your data may be unavailable for an extended period while the system is under repair. In some cases, full recovery may take days or even weeks. Furthermore, no storage system is 100% reliable. For this reason, we strongly recommend that you maintain your own backups of important or irreplaceable data on your personal computer or other secure storage solutions. Regular personal backups will help ensure data safety and minimize disruption in case of unexpected system issues.

## Partitions

A partition in SLURM essentially means a queue: a logical grouping of compute nodes that share the same access rules and limits. Users submit jobs to a partition, and SLURM schedules them on nodes belonging to that partition. On NU HPC systems partitions group compute nodes that have identical hardware.

### Irgetas

The Irgetas cluster has two available partitions for user jobs.

- `ZEN4` : This partition includes 10 CPU-only nodes. Each node has two 96-core AMD EPYC 9684X CPUs
- `H100` : This partition consists of 6 GPU nodes. Each node has two 96-core AMD EPYC 9454 CPUs and four Nvidia H100 GPUs. All Irgetas jobs requiring GPU computations must be queued to this partition. While it is possible to run jobs that use CPUs only in this partition, users are highly discouraged from doing so to ensure efficient utilization of the system. Submitting CPU jobs to partition H100 can only be justified if this partition sits idle for a very long time, while the ZEN4 partition is heavily crowded with many jobs waiting in the queue.

### Shabyt

The Shabyt cluster has two available partitions for user jobs.

- `CPU` : This partition includes 20 CPU-only nodes. Each node has two 32-core AMD EPYC 7502 CPUs
- `NVIDIA` : This partition consists of 4 GPU nodes. Each node has two 32-core AMD EPYC 7452 CPUs and two NVIDIA V100 GPUs. All Shabyt jobs requiring GPU computations must be queued to this partition. While it is possible to run jobs that use CPUs only in this partition, users are discouraged from doing so to ensure efficient utilization of the system. Submitting CPU jobs to partition NVIDIA can only be justified if this partition sits idle for a very long time, while the CPU partition is heavily crowded with many jobs waiting in the queue.

### Muon

The Muon cluster has a single partition.

- `HPE`. This includes all ten compute nodes each having a single 14-core Intel Xeon CPU.

## Quality of Service (QoS)

Users belonging to different university units and research groups have different limits on how many jobs they can run simultaneously. This is controlled by the Quality of Service (QoS) category in SLURM.

### Irgetas

The Irgetas cluster has four active QoS categories

- `hpcnc` : Members of research groups that are part of the research cluster called High Performance Computing, Networking, and Cybersecurity (HPCNC), which procured Shabyt
- `nu` : All other NU researchers (default category)
- `issai` : Members of the Institute of Smart Systems and Artificial Intelligence
- `issai-ext` : External collaborators of the Institute of Smart Systems and Artificial Intelligence
- `stud` : Students with temporary accounts who take courses related to HPC (e.g. PHYS 421/521/721)

### Shabyt

The Shabyt cluster has three active QoS categories:

- `hpcnc` : Members of research groups that are part of the research cluster called High Performance Computing, Networking, and Cybersecurity (HPCNC), which procured Shabyt
- `nu` : All other NU researchers (default category)
- `stud` : Students with temporary accounts who take courses related to HPC (e.g. PHYS 421/521/721)

### Muon

The Muon cluster has two active QoS categories:

- `hpcnc` : Members of research groups that are part of the research cluster called High Performance Computing, Networking, and Cybersecurity (HPCNC), which procured Shabyt
- `nu` : All other NU researchers (default category)

## Job time limits

The following table lists maximum allowed job durations (wall time) in different partitions of NU HPC systems, as well as key characteristics (RAM, number of cores, number of GPUs) for compute nodes in each partition.

<table class="wikitable">
<caption>Time limits for jobs in different partitions of NU HPC systems</caption>
<colgroup>
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
<col style="width: 11%" />
</colgroup>
<tbody>
<tr class="header">
<th>System</th>
<th>Partition</th>
<th>Max job duration</th>
<th>Number of nodes
<p>available</p></th>
<th>Max CPU cores
<p>per node</p></th>
<th>Max threads
<p>per node</p></th>
<th>Total RAM
<p>per node</p></th>
<th>RAM available to jobs
<p>per node</p></th>
<th>GPUs
<p>per node</p></th>
</tr>
&#10;<tr class="odd">
<td colspan="8" style="background-color: #000000; height: 1px"></td>
<td></td>
</tr>
<tr class="even">
<td>Irgetas</td>
<td><code>ZEN4</code></td>
<td>7 days (168 hours)</td>
<td>10</td>
<td>192</td>
<td>384</td>
<td>384 GB</td>
<td>376.9 GB (385974 MB)</td>
<td>n/a</td>
</tr>
<tr class="odd">
<td>Irgetas</td>
<td><code>H100</code></td>
<td>4 days (96 hours)</td>
<td>6</td>
<td>192</td>
<td>384</td>
<td>768 GB</td>
<td>751.95 GB (770000 MB)</td>
<td>4</td>
</tr>
<tr class="even">
<td colspan="8" style="background-color: #000000; height: 1px"></td>
<td></td>
</tr>
<tr class="odd">
<td>Shabyt</td>
<td><code>CPU</code></td>
<td>14 days (336 hours)</td>
<td>20</td>
<td>64</td>
<td>128</td>
<td>256 GB</td>
<td>250 GB (256000 MB)</td>
<td>n/a</td>
</tr>
<tr class="even">
<td>Shabyt</td>
<td><code>NVIDIA</code></td>
<td>2 days (48 hours)</td>
<td>4</td>
<td>64</td>
<td>128</td>
<td>256 GB</td>
<td>250 GB (256000 MB)</td>
<td>2</td>
</tr>
<tr class="odd">
<td colspan="8" style="background-color: #000000; height: 1px"></td>
<td></td>
</tr>
<tr class="even">
<td>Muon</td>
<td><code>HPE</code></td>
<td>14 days (336 hours)</td>
<td>10</td>
<td>14</td>
<td>28</td>
<td>64 GB</td>
<td>61.5 GB (63000 MB)</td>
<td>n/a</td>
</tr>
</tbody>
</table>

Time limits for jobs in different partitions of NU HPC systems


## Limits on the number of jobs, cores, threads, and GPUs

All limits on the number of simultaneously running jobs, CPU cores used, GPUs used, and job priorities are listed below for all clusters and QoS categories.

<table class="wikitable">
<caption>Maximum number of simultaneously running jobs, CPU cores, and threads for NU HPC systems</caption>
<colgroup>
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
<col style="width: 12%" />
</colgroup>
<tbody>
<tr class="header">
<th>System</th>
<th>QoS</th>
<th>Partition</th>
<th>Max simultaneously
<p>running jobs</p>
<p>per user</p></th>
<th>Max CPU cores
<p>per user</p>
<p>(total for all</p>
<p>running jobs)</p></th>
<th>Max threads
<p>per user</p>
<p>(total for all</p>
<p>running jobs)</p></th>
<th>Max GPUs
<p>per user</p>
<p>(total for all</p>
<p>running jobs)</p></th>
<th>Job launch priority
<p>(higher relative value</p>
<p>means it moves up faster</p>
<p>in the list of waiting jobs)</p></th>
</tr>
&#10;<tr class="odd">
<td colspan="8" style="background-color: #000000; height: 1px"></td>
</tr>
<tr class="even">
<td>Irgetas</td>
<td><code>hpcnc</code></td>
<td><code>ZEN4</code></td>
<td>12</td>
<td>576</td>
<td>1152</td>
<td>n/a</td>
<td>5</td>
</tr>
<tr class="odd">
<td>Irgetas</td>
<td><code>nu</code></td>
<td><code>ZEN4</code></td>
<td>12</td>
<td>576</td>
<td>1152</td>
<td>n/a</td>
<td>5</td>
</tr>
<tr class="even">
<td>Irgetas</td>
<td><code>issai</code></td>
<td><code>ZEN4</code></td>
<td>12</td>
<td>576</td>
<td>1152</td>
<td>n/a</td>
<td>5</td>
</tr>
<tr class="odd">
<td>Irgetas</td>
<td><code>issai-ext</code></td>
<td><code>ZEN4</code></td>
<td>4</td>
<td>192</td>
<td>384</td>
<td>n/a</td>
<td>1</td>
</tr>
<tr class="even">
<td>Irgetas</td>
<td><code>stud</code></td>
<td><code>ZEN4</code></td>
<td>4</td>
<td>192</td>
<td>384</td>
<td>n/a</td>
<td>5</td>
</tr>
<tr class="odd">
<td>Irgetas</td>
<td><code>hpcnc</code></td>
<td><code>H100</code></td>
<td>12</td>
<td>576</td>
<td>1152</td>
<td>12</td>
<td>5</td>
</tr>
<tr class="even">
<td>Irgetas</td>
<td><code>nu</code></td>
<td><code>H100</code></td>
<td>12</td>
<td>576</td>
<td>1152</td>
<td>12</td>
<td>5</td>
</tr>
<tr class="odd">
<td>Irgetas</td>
<td><code>issai</code></td>
<td><code>H100</code></td>
<td>24</td>
<td>1152</td>
<td>2304</td>
<td>24</td>
<td>10</td>
</tr>
<tr class="even">
<td>Irgetas</td>
<td><code>issai-ext</code></td>
<td><code>H100</code></td>
<td>12</td>
<td>576</td>
<td>1152</td>
<td>12</td>
<td>5</td>
</tr>
<tr class="odd">
<td>Irgetas</td>
<td><code>stud</code></td>
<td><code>H100</code></td>
<td>4</td>
<td>192</td>
<td>384</td>
<td>4</td>
<td>5</td>
</tr>
<tr class="even">
<td colspan="8" style="background-color: #000000; height: 1px"></td>
</tr>
<tr class="odd">
<td>Shabyt</td>
<td><code>hpcnc</code></td>
<td><code>CPU</code>, <code>NVIDIA</code></td>
<td>40</td>
<td>1280</td>
<td>2560</td>
<td>8</td>
<td>10</td>
</tr>
<tr class="even">
<td>Shabyt</td>
<td><code>nu</code></td>
<td><code>CPU</code>, <code>NVIDIA</code></td>
<td>12</td>
<td>256</td>
<td>512</td>
<td>8</td>
<td>5</td>
</tr>
<tr class="odd">
<td>Shabyt</td>
<td><code>stud</code></td>
<td><code>CPU</code>, <code>NVIDIA</code></td>
<td>4</td>
<td>128</td>
<td>256</td>
<td>4</td>
<td>5</td>
</tr>
<tr class="even">
<td colspan="8" style="background-color: #000000; height: 1px"></td>
</tr>
<tr class="odd">
<td>Muon</td>
<td><code>hpcnc</code></td>
<td><code>HPE</code></td>
<td>40</td>
<td>140</td>
<td>280</td>
<td>n/a</td>
<td>10</td>
</tr>
<tr class="even">
<td>Muon</td>
<td><code>nu</code></td>
<td><code>HPE</code></td>
<td>40</td>
<td>140</td>
<td>280</td>
<td>n/a</td>
<td>10</td>
</tr>
</tbody>
</table>

Maximum number of simultaneously running jobs, CPU cores, and threads for NU HPC systems


## Acknowledgments in publications

If computational resources provided by Nazarbayev University Research Computing (NU RC) were essential to research reported in a publication, please include an acknowledgment — typically in the same section where funding sources are acknowledged. Example wordings (feel free to adapt), but ensure the exact phrase **Nazarbayev University Research Computing** appears:

- *The authors acknowledge the use of computational resources provided by Nazarbayev University Research Computing.*
- *A.B. and C.D. acknowledge the use of the Irgetas HPC cluster at Nazarbayev University Research Computing.*
