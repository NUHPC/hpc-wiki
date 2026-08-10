# About NU Research Computing

Nazarbayev University Research Computing (NU RC) operates shared high-performance computing systems for research and teaching. The clusters provide more CPU cores, memory, accelerators and storage than a workstation, but they are not a faster replacement for every desktop task.

## Choose HPC when you need

- a parallel application that can use many CPU cores or GPUs;
- more memory than a workstation provides;
- many independent runs, samples or parameter combinations;
- long, unattended batch execution;
- a reproducible software environment shared by a research group.

For latency-sensitive services, continuous data ingestion, web applications or guaranteed real-time response, use a dedicated server or an appropriate cloud/service platform. Slurm jobs wait in a queue and therefore have no guaranteed start time.

## How the service works

1. Connect to a **login node** to transfer files, edit scripts, compile code and submit work.
2. Describe the required resources in a **Slurm batch script**.
3. Slurm places the job in a queue and starts it on one or more **compute nodes** when resources are available.
4. The application writes results and logs to files; use accounting data to tune the next request.

!!! danger "Login nodes are shared"
    Do not run production computations, large data analyses or GPU workloads on a login node. Use a batch job or a short Slurm interactive allocation.

## Start here

- [Submit a first two-minute job](quick-start.md)
- [Choose a cluster and partition](systems.md)
- [Adapt a serial, OpenMP, MPI or GPU template](job-submission.md)
- [Find software and create environments](software.md)
- [Check quotas, time limits and responsibilities](policies.md)

## Expectations for reproducible work

Record the following with each project:

- the Git commit of your source and batch scripts;
- exact module names from `module list`;
- environment files such as `environment.yml` or `requirements.txt`;
- the Slurm job ID and relevant `sacct` output;
- input-data versions and checksums where practical.

This information makes a calculation easier to reproduce and gives the support team the evidence needed to diagnose failures.

## Support

For accounts, access, software installation and quota requests, use the NU Helpdesk service referenced by the university. For technical questions, contact [hpcadmin@nu.edu.kz](mailto:hpcadmin@nu.edu.kz) and include the cluster, job ID, batch script, module list and the smallest relevant error excerpt. Never email passwords, private keys or access tokens.
