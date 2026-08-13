<div class="hero" markdown>

# Quick Start

**New to high-performance computing?** This guide takes you from the basic idea of HPC to your first scheduled job on an NU cluster.

[Run your first job](#the-15-minute-path){ .md-button .md-button--primary }
[Learn how HPC works](#hpc-in-two-minutes){ .md-button }

</div>

You do not need prior HPC experience. Basic familiarity with files and a command line is helpful, but every command needed for the first job is shown below.

By the end of this guide, you will be able to:

- explain the difference between a login node and a compute node;
- connect to Irgetas, Shabyt or Muon through SSH;
- create and submit a small Slurm batch job;
- monitor, cancel and inspect a job;
- find its output and understand the most common job states;
- decide where to learn next for your own CPU, GPU, Python, MPI or application workflow.

<div class="quick-grid" markdown>

<a class="quick-card" href="#get-access">
<strong>1 · Get access</strong>
<span>Account, campus network or VPN, and two-factor authentication.</span>
</a>

<a class="quick-card" href="#connect-with-ssh">
<strong>2 · Connect</strong>
<span>Open a secure terminal session on a cluster login node.</span>
</a>

<a class="quick-card" href="#submit-the-job">
<strong>3 · Submit</strong>
<span>Ask Slurm to run a safe two-minute example.</span>
</a>

<a class="quick-card" href="#inspect-the-result">
<strong>4 · Inspect</strong>
<span>Read the log, check the final state and tune the next request.</span>
</a>

</div>

!!! danger "The one rule to remember"
    **Do not run production computations on a login node.** Login nodes are shared entry points for file management, editing, compilation and job submission. Put CPU-intensive, memory-intensive, long-running and GPU work into a Slurm job.

## HPC in two minutes

**HPC** means *High-Performance Computing*. An HPC cluster combines many servers, called **nodes**, through fast networks and shared storage. The cluster is not one enormous desktop computer: it is a shared system in which a scheduler assigns resources to many users fairly.

| Component | What it does | What you do there |
|---|---|---|
| **Your computer** | Your laptop or workstation | Prepare code, connect through VPN, transfer files and open SSH sessions |
| **Login node** | Shared entry point to a cluster | Navigate files, edit scripts, compile, load modules and submit jobs |
| **Slurm scheduler** | Manages the queue and allocates resources | Request CPUs, memory, GPUs and time in a batch script |
| **Compute node** | Runs the actual calculation | Slurm starts your application here; you normally do not log in directly |
| **Shared storage** | Makes project files visible across nodes | Keep inputs, scripts, environments, logs and results in approved locations |

A typical workflow looks like this:

1. Connect to a **login node** with SSH.
2. Put your code and input data in a project directory.
3. Describe the required resources and commands in a **Slurm batch script**.
4. Submit the script with `sbatch`.
5. Slurm keeps the job pending until suitable resources are available.
6. The job runs on one or more **compute nodes** and writes output to files.
7. Inspect the result and accounting information, then adjust the next request.

### Is HPC a good fit for my task?

| HPC is usually a good fit when you need… | Consider another platform when you need… |
|---|---|
| many independent simulations, samples or parameter combinations | an always-on website, API or database server |
| software that can use many CPU cores, MPI processes or GPUs | guaranteed immediate or real-time response |
| more memory than a workstation can provide | a small interactive task that already runs comfortably on a laptop |
| long, unattended calculations with logs and checkpoints | continuous ingestion where every event must be processed instantly |
| repeatable execution of the same workflow over many inputs | software that is incompatible with Linux or the available environment |

!!! info "More hardware does not automatically make code faster"
    Slurm reserves the resources you request; it does not rewrite or parallelize your application. A serial program normally uses one CPU core even if the job reserves 64. A CPU-only program does not use a GPU merely because it runs on a GPU node.

## The 15-minute path

For this tutorial you need:

- an active NU HPC username;
- the password and two-factor authentication instructions sent by the HPC team;
- a computer connected to the NU campus network, or to the NU GlobalProtect VPN when off campus;
- a terminal with the `ssh` command;
- the cluster assigned to your account.

If all five are ready, start at [Connect with SSH](#connect-with-ssh). If not, complete the access steps first.

## Get access

Access to NU HPC facilities is available to NU faculty, research assistants and students for university research and teaching. Every user must have an individual account and a valid `nu.edu.kz` email address.

### Request an account

1. The principal investigator (PI) submits the [HPC group and account request](https://helpdesk.nu.edu.kz/hc/en-us/services/01KA1D82Z46HH4NH1CG1ARXVV5) through NU IT Helpdesk.
2. Requests for research assistants and students must be sponsored and initiated by their PI. Group members do not submit their own initial requests.
3. The HPC team reviews the request.
4. After approval, the new user receives a username, temporary password, QR code and first-login instructions.
5. The user follows the received instructions and configures the second authentication factor.

For later additions or removals within an existing group, the PI can use the [HPC User Management request](https://helpdesk.nu.edu.kz/hc/en-us/services/01KAGVETN0VSRXBYC7DF8GD7SC) or contact [hpcadmin@nu.edu.kz](mailto:hpcadmin@nu.edu.kz).

!!! warning "Accounts are personal"
    Never share an HPC account, password, QR code or one-time verification code. A PI must request a separate account for every group member.

### Connect to the NU network

The cluster login addresses are on the NU internal network.

=== "On campus"

    Connect to the campus network. GlobalProtect VPN is not required.

=== "Off campus"

    Connect with the NU **GlobalProtect** VPN before starting SSH. If VPN access is not active, search for `VPN` in [NU IT Helpdesk](https://helpdesk.nu.edu.kz/). VPN support is handled by the Helpdesk rather than by the HPC administrators.

Consumer VPN services such as NordVPN or ExpressVPN do not replace the NU corporate VPN.

### Configure two-factor authentication

NU HPC access uses a password plus a six-digit one-time code. Before the first login:

1. Install Google Authenticator on the phone used for authentication.
2. Open the app and scan the QR code sent by the HPC administrator.
3. Keep the recovery or re-enrolment instructions in an approved secure location.
4. At login, enter your password and then the current six-digit code when prompted.

If the account email gives instructions that differ from this page, follow the email and ask the HPC team to confirm the current process.

## Choose a cluster

Use the cluster assigned to your research group. The table below helps you understand the names you will see in commands; it is not a reason to move work to a different system without authorization.

| Cluster | SSH target | General CPU partition | GPU partition | Typical hardware |
|---|---|---|---|---|
| **Irgetas** | `irgetas` | `ZEN4` | `H100` | 192 CPU cores per node; H100 GPU nodes available |
| **Shabyt** | `shabyt` | `CPU` | `NVIDIA` | 64 CPU cores per node; V100 GPU nodes available |
| **Muon** | `muon` | `HPE` | — | 14 CPU cores per node; no GPU partition |

The aliases above resolve on the campus network or through the NU VPN. The corresponding internal addresses are `172.25.1.32` for Irgetas, `10.3.64.61` for Shabyt and `10.3.64.46` for Muon.

!!! tip "CPU or GPU?"
    Start in the CPU partition unless your application explicitly supports GPU acceleration and you know how to enable that backend. GPU nodes also contain CPUs, but reserving them for CPU-only work wastes scarce accelerators.

See [Systems](systems.md) for the full hardware inventory. After login, treat live Slurm output as authoritative:

```bash
sinfo -o "%P %a %l %D %c %m %G"
```

## Connect with SSH

Open a terminal on **your own computer**, replace `<username>` and choose the assigned cluster.

=== "Irgetas"

    ```bash
    ssh <username>@irgetas
    ```

=== "Shabyt"

    ```bash
    ssh <username>@shabyt
    ```

=== "Muon"

    ```bash
    ssh <username>@muon
    ```

The `ssh` command is available in Windows PowerShell and Command Prompt, macOS Terminal, and most Linux terminals. Windows users who prefer a graphical client may use PuTTY.

On the first connection, SSH displays a host-key fingerprint and asks whether to continue. Compare the fingerprint with the value provided by the HPC team before entering `yes`. A changed fingerprint can be legitimate after maintenance, but it must be verified rather than accepted blindly.

When typing a password, the terminal normally displays no characters, dots or asterisks. This is expected. Enter the password, press ++enter++, then enter the six-digit authentication code when prompted.

After login, verify your session:

```bash
whoami
hostname
pwd
echo "$HOME"
```

You may see `access` on Irgetas, `ln01` on Shabyt or `mln01` on Muon as the login-node hostname.

!!! failure "If SSH does not connect"
    Check, in this order: campus network or GlobalProtect status, the cluster name, your username, whether the account invitation/setup is complete, and whether the password and six-digit code are entered at the correct prompts. Do not send passwords or one-time codes to support.

## Learn five shell commands

The cluster uses Linux. These commands are enough to navigate the first tutorial:

| Command | Meaning | Example |
|---|---|---|
| `pwd` | show the current directory | `pwd` |
| `ls` | list directory contents | `ls -lah` |
| `cd` | change directory | `cd "$HOME"` |
| `mkdir` | create a directory | `mkdir -p project/logs` |
| `less` | read a text file page by page | `less logs/hello-123.out` |

Useful path symbols:

- `$HOME` is your home directory;
- `~` is a shorter spelling for your home directory;
- `.` means the current directory;
- `..` means the parent directory;
- Linux paths and filenames are case-sensitive.

## Create a project directory

Run the following commands **after connecting to the cluster**:

```bash
mkdir -p "$HOME/hpc-quick-start/logs"
cd "$HOME/hpc-quick-start"
pwd
```

Use one directory per project and separate inputs, scripts, logs and results as the project grows. This makes jobs easier to reproduce and prevents files from unrelated runs being mixed together.

For shared group data, Irgetas uses `/datahub/<groupname>`, while Shabyt and Muon use `/zdisk/<groupname>`. Permissions and quotas are managed by the HPC team. See [Policies and limits](policies.md) before moving large datasets.

!!! warning "Storage is not automatically a backup"
    Keep an independent copy of irreplaceable data. RAID protects against some hardware failures but is not a backup. Do not assume that group storage can be restored after deletion or corruption.

## Create your first batch script

A **batch script** is a text file with two parts:

1. `#SBATCH` lines tell Slurm what resources to reserve.
2. Shell commands tell the compute node what to run.

Open a text editor:

```bash
nano hello.slurm
```

Paste the script below. Replace `<cpu-partition>` with `ZEN4`, `CPU` or `HPE` according to the cluster table above.

```bash title="hello.slurm" linenums="1"
#!/bin/bash
#SBATCH --job-name=hello
#SBATCH --partition=<cpu-partition>
#SBATCH --time=00:02:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --output=logs/%x-%j.out

set -euo pipefail

echo "Hello from NU Research Computing"
echo "job_id=$SLURM_JOB_ID"
echo "job_name=$SLURM_JOB_NAME"
echo "compute_node=$(hostname)"
echo "working_directory=$(pwd)"
echo "started=$(date --iso-8601=seconds)"

srun sleep 10

echo "finished=$(date --iso-8601=seconds)"
```

In Nano, press ++ctrl+o++, then ++enter++ to save, and ++ctrl+x++ to exit.

### Understand the resource request

| Directive | Meaning in this example |
|---|---|
| `--job-name=hello` | gives the job a readable name |
| `--partition=...` | selects a group of suitable compute nodes |
| `--time=00:02:00` | sets a maximum wall time of two minutes |
| `--nodes=1` | keeps the job on one compute node |
| `--ntasks=1` | starts one program process |
| `--cpus-per-task=1` | reserves one CPU for that process |
| `--mem=1G` | reserves 1 GiB of memory on the node |
| `--output=...` | writes terminal output to a log file |

`%x` becomes the job name and `%j` becomes the unique Slurm job ID. Slurm does not create missing parent directories, which is why `logs/` was created first.

Check the saved file:

```bash
sed -n '1,40p' hello.slurm
```

## Submit the job

Submit the script from the project directory:

```bash
sbatch hello.slurm
```

Slurm responds with a value similar to:

```text
Submitted batch job 123456
```

`123456` is the **job ID**. Your number will be different. Save it whenever you troubleshoot or contact support.

Monitor your jobs:

```bash
squeue -u "$USER"
```

For one job and a readable pending reason:

```bash
squeue -j <job-id> -o "%.18i %.9P %.16j %.2t %.10M %.6D %R"
```

The example runs for only ten seconds, so it may disappear from `squeue` before you see it. That normally means it has finished; use `sacct` to inspect completed jobs.

### Common job states

| State | Code | Meaning |
|---|---:|---|
| Pending | `PD` | waiting in the queue for priority, resources or another condition |
| Running | `R` | executing on a compute node |
| Completing | `CG` | the program ended and Slurm is finalizing the job |
| Completed | `CD` | finished successfully from Slurm's perspective |
| Failed | `F` | exited with an error |
| Cancelled | `CA` | cancelled by a user or administrator |
| Timeout | `TO` | reached the requested wall-time limit |
| Out of memory | `OOM` | used more memory than the allocation allowed |

A pending job is not necessarily broken. The final column from the formatted `squeue` command explains why it is waiting. `Priority` and `Resources` are normal; an invalid partition, association or impossible resource request requires correction.

To cancel a queued or running job:

```bash
scancel <job-id>
```

Cancel jobs you no longer need so shared resources are released.

## Inspect the result

List the generated log and print it:

```bash
ls -lh logs/
cat logs/hello-<job-id>.out
```

Expected content is similar to:

```text
Hello from NU Research Computing
job_id=123456
job_name=hello
compute_node=cn01
working_directory=/shared/home/your.name/hpc-quick-start
started=2026-08-12T10:00:00+05:00
finished=2026-08-12T10:00:10+05:00
```

The compute-node name will differ. The important result is that it is **not** the shared login node.

Check the final state and resource accounting:

```bash
sacct -j <job-id> \
  --format=JobID,JobName,Partition,State,Elapsed,AllocCPUS,MaxRSS,ExitCode
```

If the optional `seff` utility is installed, it provides a compact efficiency summary:

```bash
seff <job-id>
```

!!! success "First milestone complete"
    You have connected to an NU cluster, submitted work to Slurm, executed a command on a compute node and retrieved its output. Real applications follow the same pattern: prepare files, request resources, submit, monitor and inspect.

## Transfer your own files

Run transfer commands from a terminal on **your local computer**, not from inside an active compute job. Replace `<cluster>` with `irgetas`, `shabyt` or `muon`.

=== "Upload one file"

    ```bash
    scp ./my_script.py <username>@<cluster>:~/my-project/
    ```

=== "Upload a directory"

    ```bash
    scp -r ./my-project <username>@<cluster>:~/
    ```

=== "Synchronize a project"

    ```bash
    rsync -avP ./my-project/ <username>@<cluster>:~/my-project/
    ```

=== "Download results"

    ```bash
    rsync -avP <username>@<cluster>:~/my-project/results/ ./results/
    ```

`rsync` is preferable for repeated or interrupted transfers because it can continue and skip unchanged files. Windows users who prefer a graphical interface can use WinSCP or FileZilla with SFTP.

Do not place passwords, private keys, access tokens or unnecessary sensitive data in project directories. Follow NU requirements for personal, confidential, licensed and controlled research data.

## Find and load software

Clusters provide software through **Lmod environment modules**. Modules let several application and compiler versions coexist without installing them system-wide.

```bash
module spider python
module spider <software-name>
module avail
module list
```

After identifying the exact module, load it explicitly:

```bash
module purge
module load <exact-module-name>
module list
```

Use the same module stack when building and running an application. Record `module list` in job logs so the environment can be reproduced later.

!!! example "Typical Python pattern"
    ```bash
    module purge
    module load <python-module-found-with-module-spider>
    python -m venv "$HOME/.venvs/my-project"
    source "$HOME/.venvs/my-project/bin/activate"
    python -m pip install -r requirements.txt
    ```

Do not copy a historical module version from another cluster. Available names and versions differ and change over time. See [Software](software.md) for Python environments, Conda, compilers, MPI, CUDA and application examples.

## Adapt the example to your workload

Start small: use a tiny input, short time limit, modest memory and one CPU. Confirm correctness first, then scale one resource at a time.

| Workload | Slurm request pattern | Application requirement |
|---|---|---|
| Serial program | `--ntasks=1 --cpus-per-task=1` | one process |
| Multithreaded / OpenMP | `--ntasks=1 --cpus-per-task=N` | configure the application to use `N` threads |
| MPI | `--ntasks=N` | launch an MPI-enabled build with the site-supported launcher |
| GPU | CPU request plus a GPU resource | use a GPU-enabled build and select the GPU partition |
| Many independent inputs | Slurm job array | map one array index to one input |

For tested templates, resource explanations and troubleshooting, continue to [Job submission](job-submission.md).

### Short interactive debugging

Use an interactive allocation only when you need a shell on a compute node for a short test or debugger session:

```bash
srun --partition=<partition> --time=00:20:00 \
  --nodes=1 --ntasks=1 --cpus-per-task=2 --mem=2G \
  --pty bash -l
```

The request may wait in the queue. Run `hostname` to confirm the allocation, then type `exit` as soon as testing is complete. Interactive allocations are not a substitute for unattended production jobs.

## Build a good first real job

Before submitting your own application, answer these questions:

1. **Which cluster and partition am I authorized to use?**
2. **Is the application serial, multithreaded, MPI-enabled or GPU-enabled?**
3. **How many processes and threads will it actually start?**
4. **How much memory did a small representative run use?**
5. **What wall time is realistic, including a safety margin?**
6. **Where will inputs, logs, temporary files and final results be stored?**
7. **Can the application checkpoint and resume after interruption?**
8. **Have I recorded the code version, module set and input version?**

After representative runs, use `sacct` or `seff` to compare requested and used resources. Smaller accurate requests often start sooner and leave more capacity for everyone.

## Common misconceptions

??? question "Will my code automatically run faster on the cluster?"
    Not necessarily. One CPU core on a cluster may have a similar or lower clock speed than one core in a workstation. HPC gains come from parallel execution, accelerators, large memory, fast interconnects, automation and the ability to run many jobs. The software must be able to use those resources.

??? question "If I request more CPU cores, will Slurm make my program parallel?"
    No. Slurm only reserves cores. Your application must use threads, multiple processes, MPI or another parallel model, and its configuration must match the Slurm request. Otherwise the extra cores remain idle.

??? question "Will any program become faster in a GPU partition?"
    No. GPU acceleration requires software built for a supported GPU backend such as CUDA. Many applications are CPU-only, and even GPU-enabled applications may require explicit options or a particular build.

??? question "Are all compute nodes identical?"
    No. NU systems have CPU and GPU node types, different CPU generations, different memory capacities and different partitions. Choose the smallest suitable resource type and check the [Systems](systems.md) page.

??? question "Can I run a long command in the background on the login node?"
    No. `nohup`, `screen`, `tmux` and a trailing `&` do not turn login-node work into a scheduled compute job. Submit heavy or long-running commands through Slurm.

??? question "Can I install my own software?"
    Usually yes, within directories you can write to and without `sudo`. Python virtual environments, Conda environments, user-space builds and approved containers are common approaches. User installations count against storage quotas.

??? question "Can HPC provide guaranteed real-time processing?"
    No. Batch jobs wait in a queue, so their start time cannot be guaranteed. Use a dedicated service or another approved platform for always-on or latency-critical workloads.

## Troubleshooting checklist

When a job does not behave as expected:

1. Read every `.out` and `.err` file.
2. Check the final state and exit code with `sacct`.
3. Inspect the pending reason with `squeue` or `scontrol show job <job-id>`.
4. Confirm the requested partition exists with `sinfo`.
5. Confirm the script, input files and executable are in the expected directory.
6. Compare requested tasks, CPUs, memory and GPUs with the application settings.
7. Record the loaded environment with `module list`.
8. Reproduce the problem with the smallest useful input.

When contacting [hpcadmin@nu.edu.kz](mailto:hpcadmin@nu.edu.kz), include:

- cluster name and Slurm job ID;
- batch script;
- exact module list;
- relevant `sacct` output;
- the smallest useful error excerpt;
- what you expected and what happened instead.

Never send a password, authentication QR code, one-time code, private key or access token.

## Where to go next

<div class="quick-grid" markdown>

<a class="quick-card" href="../systems/">
<strong>Choose resources</strong>
<span>Compare Irgetas, Shabyt and Muon hardware and storage.</span>
</a>

<a class="quick-card" href="../job-submission/">
<strong>Run real workloads</strong>
<span>Use serial, OpenMP, MPI, GPU and array templates.</span>
</a>

<a class="quick-card" href="../software/">
<strong>Prepare software</strong>
<span>Work with modules, Python, Conda, compilers and CUDA.</span>
</a>

<a class="quick-card" href="../policies/">
<strong>Protect the service</strong>
<span>Check time limits, quotas, data responsibilities and fair use.</span>
</a>

</div>

### First-week learning path

1. Complete this page and keep the successful `hello.slurm` example.
2. Read [Systems](systems.md) and identify the partition appropriate for your research workload.
3. Read [Software](software.md) and reproduce the environment your application needs.
4. Adapt the closest template in [Job submission](job-submission.md) using a small input.
5. Review [Policies and limits](policies.md) before transferring large data or launching long runs.
6. Save scripts, environment files and notes in version control so the workflow can be reproduced.

Welcome to NU Research Computing.
