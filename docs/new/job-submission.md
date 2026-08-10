# Job submission

Slurm allocates resources; it does not make an application parallel. Request only resources the program is configured to use, and launch the program so its process/thread count matches the request.

The examples use `<partition>` and version-neutral module placeholders. Discover the live names with `sinfo` and `module spider` rather than copying a historical version string.

## Resource model

| Workload | Slurm shape | Application setting |
|---|---|---|
| Serial | `--ntasks=1 --cpus-per-task=1` | one process |
| Shared-memory / OpenMP | `--ntasks=1 --cpus-per-task=N` | `OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK` |
| MPI | `--ntasks=N`, optionally multiple nodes | `srun` launches one process per task |
| Hybrid MPI + OpenMP | `--ntasks=N --cpus-per-task=T` | N processes, T threads per process |
| GPU | CPU shape plus `--gpus=N` or site GRES syntax | application must be GPU-enabled |
| Independent parameter sweep | Slurm job array | one input per array index |

Slurm's definition of a CPU can be a core or a hardware thread depending on site configuration. Check `ThreadsPerCore` in `scontrol show node <node>` and benchmark before relying on simultaneous multithreading.

## Core commands

| Command | Purpose |
|---|---|
| `sbatch job.slurm` | submit a batch script |
| `squeue --me` | show your queued and running jobs |
| `scontrol show job <id>` | inspect a request, allocation or pending reason |
| `squeue --start -j <id>` | show an estimated start time when available |
| `scancel <id>` | cancel a job |
| `sinfo` | inspect partitions and node states |
| `sacct -j <id> --format=JobID,State,Elapsed,MaxRSS,ExitCode` | inspect completed-job accounting |
| `seff <id>` | optional site utility for a compact efficiency report |

The official [Slurm command overview](https://slurm.schedmd.com/quickstart.html), [`sbatch`](https://slurm.schedmd.com/sbatch.html), [`squeue`](https://slurm.schedmd.com/squeue.html), [`srun`](https://slurm.schedmd.com/srun.html) and [`sacct`](https://slurm.schedmd.com/sacct.html) pages are authoritative for generic syntax. Local limits and plugins remain site-specific.

## A safe batch-script baseline

```bash title="serial.slurm"
#!/bin/bash
#SBATCH --job-name=serial-demo
#SBATCH --partition=<partition>
#SBATCH --time=00:10:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --output=logs/%x-%j.out
#SBATCH --error=logs/%x-%j.err

set -euo pipefail

module purge
module load <python-module>   # omit when using a tested system Python
module list

srun python3 my_script.py
```

Before submission:

```bash
mkdir -p logs
sbatch serial.slurm
```

The batch shell normally starts in the directory from which `sbatch` was called. For clarity, projects may add `cd "$SLURM_SUBMIT_DIR"`. Quote variables and make errors fatal with `set -euo pipefail` unless the workflow intentionally handles a non-zero command.

## Time and memory

Accepted time formats include `minutes`, `hours:minutes:seconds` and `days-hours:minutes:seconds`. For example:

```bash
#SBATCH --time=02:30:00      # 2 hours 30 minutes
#SBATCH --time=2-00:00:00    # 2 days
```

If the script finishes early, the job completes and releases its resources immediately. If it reaches the wall-time limit, Slurm terminates it. Long applications should checkpoint often enough to resume safely.

`--mem` requests memory per node; `--mem-per-cpu` requests memory per allocated CPU. Do not specify both. Analyze `MaxRSS` from `sacct` and leave a modest safety margin rather than reserving the entire node by default.

## Pending jobs

A pending job is not necessarily broken. Inspect the reason:

```bash
squeue -j <job-id> -o "%.18i %.9P %.2t %.10M %.6D %R"
scontrol show job <job-id>
```

Common explanations include priority, unavailable resources, a QoS limit or an invalid request. Depending on Slurm configuration, an impossible request may be rejected immediately or remain pending with a diagnostic reason; “pending indefinitely” is not a universal rule.

## OpenMP example

The original example overflowed both the `i * i` expression and the 64-bit sum. This corrected demonstration uses a range whose result fits in `long long` and casts before multiplication.

```c title="openmp_sum.c" linenums="1"
#include <omp.h>
#include <stdio.h>

int main(void) {
    const int n = 1000000;
    long long sum = 0;

    #pragma omp parallel for reduction(+:sum)
    for (int i = 1; i <= n; ++i) {
        sum += (long long)i * (long long)i;
    }

    printf("threads=%d\n", omp_get_max_threads());
    printf("sum=%lld\n", sum);
    return 0;
}
```

Compile with the same toolchain that will be loaded in the job:

```bash
module spider GCC
module load <gcc-module>
gcc -O3 -fopenmp openmp_sum.c -o openmp_sum
```

```bash title="openmp.slurm"
#!/bin/bash
#SBATCH --job-name=openmp-demo
#SBATCH --partition=<cpu-partition>
#SBATCH --time=00:10:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=2G
#SBATCH --output=logs/%x-%j.out

set -euo pipefail
module purge
module load <gcc-module>
export OMP_NUM_THREADS="$SLURM_CPUS_PER_TASK"
export OMP_PLACES=cores
export OMP_PROC_BIND=close
srun ./openmp_sum
```

Start with a small thread count and measure scaling. More threads can make memory-bound or serial-heavy code slower.

## MPI example

```fortran title="mpi_sum.f90" linenums="1"
program mpi_sum
    use mpi
    implicit none
    integer, parameter :: n = 5555
    integer :: ierr, rank, nprocs, lo, hi, i
    integer :: local_sum, global_sum

    call MPI_Init(ierr)
    call MPI_Comm_rank(MPI_COMM_WORLD, rank, ierr)
    call MPI_Comm_size(MPI_COMM_WORLD, nprocs, ierr)

    lo = rank * n / nprocs + 1
    hi = (rank + 1) * n / nprocs
    local_sum = 0
    do i = lo, hi
        local_sum = local_sum + i
    end do

    call MPI_Reduce(local_sum, global_sum, 1, MPI_INTEGER, MPI_SUM, 0, MPI_COMM_WORLD, ierr)
    if (rank == 0) print *, "processes=", nprocs, " sum=", global_sum
    call MPI_Finalize(ierr)
end program mpi_sum
```

```bash
module spider foss
module load <foss-module>
mpifort -O3 mpi_sum.f90 -o mpi_sum
```

```bash title="mpi.slurm"
#!/bin/bash
#SBATCH --job-name=mpi-demo
#SBATCH --partition=<cpu-partition>
#SBATCH --time=00:10:00
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=4
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=1G
#SBATCH --output=logs/%x-%j.out

set -euo pipefail
module purge
module load <foss-module>
srun ./mpi_sum
```

Use the compiler wrapper and MPI library from one coherent module toolchain. Do not compile with one MPI implementation and run with another. `srun` is the native Slurm launcher, but the site's MPI/PMIx integration must be validated; if administrators require `mpirun`, document that exact module-specific command.

Avoid `--exclusive` unless the application needs essentially all cores, memory or fabric resources on each node. Exclusive nodes count fully against limits even when the application uses less.

## GPU example

GPU allocation does not accelerate CPU-only software. Confirm that the executable was built with the correct GPU backend.

```bash title="gpu.slurm"
#!/bin/bash
#SBATCH --job-name=gpu-demo
#SBATCH --partition=<gpu-partition>
#SBATCH --time=00:10:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --gpus=1
#SBATCH --output=logs/%x-%j.out

set -euo pipefail
module purge
module load <cuda-or-application-module>
srun nvidia-smi -L
srun ./my_gpu_application
```

Some sites configure GPUs through generic resources and require `#SBATCH --gres=gpu:1` or a typed resource. Use the syntax confirmed by `scontrol show partition`, `sinfo -o "%P %G"` and the HPC team. Never infer the loaded CUDA toolkit from the “CUDA Version” line in `nvidia-smi`; that field reports a driver capability.

## Job arrays

For independent inputs, an array is clearer and cheaper for the scheduler than hundreds of separate scripts:

```bash title="array.slurm"
#!/bin/bash
#SBATCH --job-name=sweep
#SBATCH --partition=<cpu-partition>
#SBATCH --array=0-99%10
#SBATCH --time=00:20:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --output=logs/%x-%A_%a.out

set -euo pipefail
input=$(sed -n "$((SLURM_ARRAY_TASK_ID + 1))p" inputs.txt)
srun ./analyze --input "$input"
```

`%10` limits this example to ten simultaneous array elements. `%A` is the parent array ID and `%a` the element index.

## Email notifications

Slurm supports `--mail-type=BEGIN,END,FAIL` and `--mail-user=...`, but notifications work only if the cluster's mail integration is configured. Test it with a short job before relying on it for monitoring.

## Troubleshooting checklist

1. Read the `.err` and `.out` files.
2. Run `sacct -j <id> --format=JobID,State,ExitCode,Elapsed,Timelimit,ReqMem,MaxRSS,AllocCPUS`.
3. Confirm the module set with `module list` captured in the log.
4. Check that requested tasks, threads, GPUs and application arguments agree.
5. Reproduce the failure with the smallest input and shortest allocation.
6. When contacting support, include the cluster, job ID, script and error excerpt.
