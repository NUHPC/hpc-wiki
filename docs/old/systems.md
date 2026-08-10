# Systems

<div class="snapshot-banner">
Original wording normalized from <strong>Systems - NU HPC Wiki.mhtml</strong>, saved on 4 August 2026. Commands and limits on this page are historical and may be incorrect.
</div>

Nazarbayev University High Performance Computing team currently operates three main facilities - Irgetas, Shabyt, and Muon. Below we provide a brief overview of them.


## Irgetas cluster

<span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_picture_1.jpg" class="mw-file-description"><img src="../../assets/images/Irgetas_picture_1.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_picture_2.jpg" class="mw-file-description"><img src="../../assets/images/Irgetas_picture_2.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_picture_3.jpg" class="mw-file-description"><img src="../../assets/images/Irgetas_picture_3.jpg" decoding="async" width="420" height="236" /></a></span>

<span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_picture_4.jpg" class="mw-file-description"><img src="../../assets/images/Irgetas_picture_4.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_picture_5.jpg" class="mw-file-description"><img src="../../assets/images/Irgetas_picture_5.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_picture_6.jpg" class="mw-file-description"><img src="../../assets/images/Irgetas_picture_6.jpg" decoding="async" width="420" height="236" /></a></span>

The Irgetas cluster is NU's most advanced computational facility on campus. It was deployed in September 2025 and features high compute density and efficiency enabled by direct liquid cooling. Manufactured by Hewlett Packard Enterprise (HPE), it has the following configuration:

- 6 GPU compute nodes. Each GPU node features
  2 × <a href="https://www.amd.com/en/products/processors/server/epyc/4th-generation-9004-and-8004-series/amd-epyc-9654.html" class="external text" rel="nofollow">AMD EPYC 9654</a> CPUs (96 cores / 192 threads per CPU, 2.4 GHz Base)

  4 × <a href="https://www.nvidia.com/en-us/data-center/h100/" class="external text" rel="nofollow">Nvidia H100 SMX5</a> GPUs (80 GB HBM3 per GPU)

  768 GB DDR5-4800 RAM (12-channel)

  1.92 TB local SSD scratch storage

  2 × Infiniband NDR 400 Gb/s network adapters (800 Gb/s total)

  25 Gb/s SPF28 Ethernet network adapter

  Rocky Linux 9.7

<!-- -->

- 10 CPU compute nodes. Each CPU node features
  2 × <a href="https://www.amd.com/en/products/processors/server/epyc/4th-generation-9004-and-8004-series/amd-epyc-9684x.html" class="external text" rel="nofollow">AMD EPYC 9684X</a> CPUs (96 cores / 192 threads per CPU, 2.55 GHz Base, 1152 MB 3D V-Cache)

  384 GB DDR5-4800 RAM (12-channel)

  1.92 TB local SSD scratch storage

  Infiniband NDR 200 Gb/s network adapter

  25 Gb/s SPF28 Ethernet network adapter

  Rocky Linux 9.7

<!-- -->

- 1 Interactive login node
  <a href="https://www.amd.com/en/products/processors/server/epyc/4th-generation-9004-and-8004-series/amd-epyc-9684x.html" class="external text" rel="nofollow">AMD EPYC 9684X</a> (96 cores / 192 threads, 2.55 GHz Base, 1152 MB 3D V-Cache)

  192 GB DDR5-4800 RAM (12-channel)

  7.68 TB local SSD scratch storage

  Infiniband NDR 200 Gb/s network adapter

  25 Gb/s SPF28 Ethernet network adapter

  Rocky Linux 9.7

<!-- -->

- 1 Management node
  <a href="https://www.amd.com/en/products/processors/server/epyc/4th-generation-9004-and-8004-series/amd-epyc-9354.html" class="external text" rel="nofollow">AMD EPYC 9354</a> CPUs (32 cores / 64 threads, 3.25 GHz Base)

  256 GB DDR5-4800 RAM (8-channel)

  15.36 TB local SSD storage

  25 Gb/s SPF28 Ethernet network adapter

  Rocky Linux 9.7

<!-- -->

- NVMe SSD storage server for software and user home directories (/shared)
  2 × <a href="https://www.amd.com/en/products/processors/server/epyc/4th-generation-9004-and-8004-series/amd-epyc-9354.html" class="external text" rel="nofollow">AMD EPYC 9354</a> CPUs (32 cores / 64 threads per CPU, 3.25 GHz Base)

  768 GB DDR5-4800 RAM (12-channel)

  122 TB total raw capacity (16 × 7.68TB U.3 SSDs)

  84 TB total usable space in RAID 6 configuration

  Sustained sequential read speed from compute nodes \> 80 Gb/s

  Sustained sequential write speed from compute nodes \> 20 Gb/s

  2 × Infiniband NDR 400 Gb/s network adapters (800 Gb/s total)

  25 Gb/s SPF28 Ethernet network adapter

  Rocky Linux 9.7

<!-- -->

- Nvidia Infiniband NDR Quantum-2 QM9700 managed switch (compute network)
  64 ports (400 Gb/s per port)

<!-- -->

- HPE Aruba Networking CX 8325‑48Y8C 25G SFP/SFP+/SFP28 switch (application network)
  48 ports (SFP28, 25 Gb/s per port)

<!-- -->

- HPE Aruba Networking 2930F 48G 4SFP+ switch (management network)
  48 ports (1 Gb/s per port)

<!-- -->

- HPE Cray XD Direct liquid cooling system
  HPE Cray XD 75kW 208V FIO In-Rack Coolant Distribution Unit

  Three-chiller setup with BlueBox ZETA Rev HE FC 3.2

The system is assembled in a single rack and physically located in NU data center in Block 1.

|              |               |               |              |              |
|--------------|---------------|---------------|--------------|--------------|
| Subsystem    | FP8           | FP16          | FP32         | FP64         |
| CPUs (total) |               |               | 245.0 TFLOPS | 122.5 TFLOPS |
| GPUs (total) | 47,492 TFLOPS | 23,746 TFLOPS | 1,606 TFLOPS | 803 TFLOPS   |

Irgetas cluster theoretical peak performance

<span typeof="mw:File/Frameless"><a href="https://hpc.nu.edu.kz/index.php/File:Irgetas_rack.png" class="mw-file-description"><img src="../../assets/images/Irgetas_rack.png" decoding="async" width="217" height="496" /></a></span>


## Shabyt cluster

<span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Shabyt_picture_3.jpg" class="mw-file-description"><img src="../../assets/images/Shabyt_picture_3.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Shabyt_picture_1.jpg" class="mw-file-description"><img src="../../assets/images/Shabyt_picture_1.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Shabyt_picture_2.jpg" class="mw-file-description"><img src="../../assets/images/Shabyt_picture_2.jpg" decoding="async" width="420" height="236" /></a></span>

The Shabyt cluster is manufactured by Hewlett Packard Enterprise (HPE) and deployed in 2020. For several years it served as the primary platform for performing computational tasks by NU researchers. It has the following hardware configuration:

- 20 CPU compute nodes. Each CPU node features
  2 × <a href="https://www.amd.com/en/products/processors/server/epyc/7002-series.html" class="external text" rel="nofollow">AMD EPYC 7502</a> CPUs (32 cores / 64 threads per CPU, 2.5 GHz Base)

  256 GB DDR4-2933 RAM (8-channel)

  Infiniband EDR 100 Gb/s network adapter

  Rocky Linux 9.7

<!-- -->

- 4 GPU compute nodes. Each GPU node features
  2 × <a href="https://www.amd.com/en/products/processors/server/epyc/7002-series.html" class="external text" rel="nofollow">AMD EPYC 7452</a> CPUs (32 cores / 64 threads per CPU, 2.3 GHz Base)

  2 × <a href="https://www.nvidia.com/en-gb/data-center/tesla-v100/" class="external text" rel="nofollow">Nvidia V100</a> GPUs (32 GB HBM2 per GPU)

  256 GB DDR4-2933 RAM (8-channel)

  Infiniband EDR 100 Gb/s network adapter

  Rocky Linux 9.7

<!-- -->

- 1 Interactive login node
  <a href="https://www.amd.com/en/products/processors/server/epyc/7002-series.html" class="external text" rel="nofollow">AMD EPYC 7502P</a> CPU (32 cores / 64 threads, 2.5 GHz Base)

  256 GB DDR4-2933 RAM (8-channel)

  Infiniband EDR 100 Gb/s network adapter

  Rocky Linux 9.7

<!-- -->

- A storage system consisting of two NVMe SSD storage servers in RAID 6 configuration for software and user home directories (/shared). The total capacity is 16 TB (raw), 9.9 TB (usable). Each storage server features
  <a href="https://www.amd.com/en/products/processors/server/epyc/7002-series.html" class="external text" rel="nofollow">AMD EPYC 7452</a> CPU (32 cores / 64 threads, 2.3 GHz Base)

  128 GB DDR4-2933 RAM (8-channel)

  10 × 800 GB SFF NVMe SSDs

  2 × Infiniband EDR 100 Gb/s network adapters (200 Gb/s total)

  Rocky Linux 9.7

<!-- -->

- 144 TB (raw) HPE MSA 2050 SAS HDD Array in RAID 6 configuration for backups and large data storage for user groups (/zdisk)

<!-- -->

- Mellanox Infiniband EDR v2 Managed switch (compute network)
  36 ports (100 Gb/s per port)

<!-- -->

- HPE 5700 48G 4XG 2QSFP+ switch (application network)
  48 ports (1 Gb/s per port)

<!-- -->

- Aruba 2540 48G 4SFP+ switch (management network)
  48 ports (1 Gb/s per port)

The system is assembled in two racks and is physically located in NU data center in Block C2

|              |     |              |              |             |
|--------------|-----|--------------|--------------|-------------|
| Subsystem    | FP8 | FP16         | FP32         | FP64        |
| CPUs (total) |     |              | 121.7 TFLOPS | 60.8 TFLOPS |
| GPUs (total) |     | 897.6 TFLOPS | 112.2 TFLOPS | 56.1 TFLOPS |

Shabyt cluster theoretical peak performance

<span typeof="mw:File/Frameless"><a href="https://hpc.nu.edu.kz/index.php/File:Shabyt_racks.png" class="mw-file-description"><img src="../../assets/images/Shabyt_racks.png" decoding="async" width="300" height="532" /></a></span>         <span typeof="mw:File/Frameless"><a href="https://hpc.nu.edu.kz/index.php/File:Shabyt_hardware_scheme.png" class="mw-file-description"><img src="../../assets/images/Shabyt_hardware_scheme.png" decoding="async" width="372" height="544" /></a></span>


## Muon cluster

<span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Muon_picture_1.jpg" class="mw-file-description"><img src="../../assets/images/Muon_picture_1.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Muon_picture_3.jpg" class="mw-file-description"><img src="../../assets/images/Muon_picture_3.jpg" decoding="async" width="420" height="236" /></a></span> <span class="mw-image-border" typeof="mw:File"><a href="https://hpc.nu.edu.kz/index.php/File:Muon_picture_2.jpg" class="mw-file-description"><img src="../../assets/images/Muon_picture_2.jpg" decoding="async" width="420" height="236" /></a></span>

Muon is an older cluster used by the faculty of Physics Department. It was manufactured by HPE and first deployed in 2017. It has the following hardware configuration:

- 10 CPU compute nodes. Each CPU node features
  <a href="https://www.intel.com/content/www/us/en/products/sku/91770/intel-xeon-processor-e52690-v4-35m-cache-2-60-ghz/specifications.html" class="external text" rel="nofollow">Intel Xeon CPU E5-2690v4</a> (14 cores / 28 threads, 2600 MHz Base)

  64 GB DDR4-2400 RAM (4-channel)

  Infiniband FDR 56 Gb/s network adapter

  Rocky Linux 9.7

<!-- -->

- Interactive login node
  <a href="https://www.intel.com/content/www/us/en/products/sku/92984/intel-xeon-processor-e52640-v4-25m-cache-2-40-ghz/specifications.html" class="external text" rel="nofollow">Intel Xeon CPU E5-2640v4</a> (10 cores / 20 threads, 2400 MHz Base)

  64 GB DDR4-2400 RAM (4-channel)

  Infiniband FDR 56 Gb/s network adapter (compute traffic)

  1 Gb/s Ethernet network adapter (WAN traffic)

  Rocky Linux 9.7

<!-- -->

- 3.072 TB (raw) SSD array in RAID-Z2 configuration for software and user home directories (/shared)

<!-- -->

- 7.2 TB (raw) HDD RAID 5 storage for backups and large data storage for user group (/zdisk)

<!-- -->

- Mellanox SX6005 Infiniband FDR unmanaged switch (compute network)
  12 ports (56 Gb/s per port)

<!-- -->

- HPE 5800 Ethernet switch (management network)
  48 ports (1 Gb/s per port)

The system is physically located in NU data center in Block 1.

|              |     |      |             |            |
|--------------|-----|------|-------------|------------|
| Subsystem    | FP8 | FP16 | FP32        | FP64       |
| CPUs (total) |     |      | 11.6 TFLOPS | 5.8 TFLOPS |

Muon cluster theoretical peak performance


## Other facilities on campus

There are several other computational facilities at NU that are not managed by the NU HPC Team. Brief information about them is provided below. All inquiries regarding their use for research projects should be directed to the person responsible for each facility.

<table class="wikitable" style="float: left; margin: auto">
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="header">
<th>Cluster name</th>
<th>Short description</th>
<th>Contact details</th>
</tr>
&#10;<tr class="odd">
<td>High-performance bioinformatics cluster "Q-Symphony"</td>
<td><p><strong>HPE Apollo R2600 Gen10 cluster</strong><br />
Compute nodes: 8 nodes x dual Intel Xeon Gold 6226R (16 cores / 32 threads, 3.3 GHz Base), 512 GB DDR4-2933 RAM per node<br />
Storage: 1.3 PB (raw) HDD storage HPE D6020<br />
Interconnect: Infiniband FDR<br />
OS: RedHat Linux<br />
This cluster is optimized for bioinformatics research and big genomics datasets analysis<br />
</p></td>
<td>Ulykbek Kairov<br />
Head of Laboratory - Leading Researcher, Laboratory of bioinformatics and systems biology, Private Institution National Laboratory Astana<br />
Email: ulykbek.kairov@nu.edu.kz</td>
</tr>
<tr class="even">
<td>Computational resources for AI infrastructure at NU</td>
<td><p><strong>NVIDIA DGX-1 (1 unit)</strong><br />
CPU: dual Intel Xeon ES-2698v4 (20 cores / 40 threads, 2.2GHz Base), 512 GB DDR4 RAM<br />
GPUs: 8 x NVIDIA Tesla V100<br />
GPU Memory: 8 x 32 GB HBM2<br />
Storage 4 x 1.92 TB SSD in RAID0<br />
OS: Ubuntu Linux<br />
</p>
<p><strong>NVIDIA DGX-2 (2 units)</strong><br />
CPU: dual Intel Xeon Platinum 8168 (24 cores / 48 threads, 2.7 GHz Base), 512 GB DDR4-2133 RAM<br />
GPUs: 16 x NVIDIA Tesla V100<br />
GPU Memory: 16 x 32 GB HBM2<br />
Storage: 30.72 TB NVMe SSD<br />
OS: Ubuntu Linux<br />
</p>
<p><strong>DGX A100 (4 units)</strong><br />
CPU: dual AMD EPYC Rome 7742 (64 cores / 128 threads, 2.25 GHz Base), 512 GB DDR4 RAM<br />
GPUs: 8 x NVIDIA A100<br />
GPU: Memory 8 x 40 GB HBM2<br />
Storage: 15 TB NVMe SSD<br />
OS: Ubuntu Linux<br />
</p></td>
<td>Yerbol Absalyamov<br />
Technical Project Coordinator, Institute of Smart Systems and Artificial Intelligence, Nazarbayev University<br />
Email: yerbol.absalyamov@nu.edu.kz<br />
Makat Tlebaliyev<br />
Computer Engineer, Institute of Smart Systems and Artificial Intelligence, Nazarbayev University<br />
Email: makat.tlebaliyev@nu.edu.kz</td>
</tr>
</tbody>
</table>
