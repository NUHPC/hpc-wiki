# Software

NU HPC software is exposed primarily through Lmod environment modules. Exact versions differ by cluster and change over time, so examples use placeholders and discovery commands instead of treating the 2026 snapshot as a live catalogue.

## Find and load modules

```bash
module purge
module spider python
module spider Python/<version>
module load Python/<version-and-toolchain>
module list
```

In a hierarchical module tree, `module avail` shows modules loadable in the current environment, while `module spider` searches the full known tree and explains prerequisites.

| Command | Purpose |
|---|---|
| `module avail` | show modules loadable now |
| `module spider <name>` | search all known modules and versions |
| `module keyword <term>` | search module names/descriptions |
| `module show <module>` | inspect environment changes without loading |
| `module load <module>` | load a module and its dependencies |
| `module list` | record the active environment |
| `module unload <module>` | unload one module |
| `module purge` | return to a clean module environment |

See the official [Lmod user guide](https://lmod.readthedocs.io/en/latest/010_user.html) and [module spider guide](https://lmod.readthedocs.io/en/latest/135_module_spider.html).

!!! tip "Make jobs reproducible"
    Load explicit versions in production scripts, print `module list`, and keep the compiler/MPI/CUDA module used at runtime consistent with the one used to build the executable.

## Python

### Lightweight virtual environment

Prefer a normal Python module plus `venv` when Conda is unnecessary:

```bash
module purge
module load <python-module>
python -m venv "$HOME/.venvs/myproject"
source "$HOME/.venvs/myproject/bin/activate"
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip freeze > requirements.lock.txt
```

Create environments on a shared filesystem so compute nodes can see them. Avoid installing packages from login-node source builds that consume substantial CPU or memory; use a short compute allocation for heavy compilation.

### Conda environments

```bash
module purge
module load <conda-or-miniforge-module>
eval "$(conda shell.bash hook)"
conda create --name myproject python=3.12
conda activate myproject
conda install --name myproject numpy scipy
conda env export --from-history > environment.yml
```

The old page used `source activate` and `conda --name ... install`; current Conda syntax is `conda activate` and `conda install --name ...`. See the official [environment](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html) and [package](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html) guides.

For reproducibility, prefer one well-defined channel policy and commit `environment.yml`. Do not place secrets for private channels in the repository.

## GCC and GNU Fortran

```bash
module purge
module spider GCC
module load GCC
gcc -O2 -Wall -Wextra hello.c -o hello
gfortran -O2 -Wall -Wextra hello.f90 -o hello-fortran
```

Use `-fopenmp` for OpenMP code. Treat `-ffast-math` as an algorithmic change: it relaxes IEEE behavior and can make numerical results less reproducible. Avoid `-march=native` for binaries that may run on a different CPU generation; build for the oldest target architecture or use per-system builds.

## MPI toolchains

Use wrapper compilers from a single module stack:

```bash
module purge
module spider foss
module load foss
mpicc -O2 program.c -o program
mpifort -O2 program.f90 -o program-fortran
```

Record `mpicc --showme` or the equivalent wrapper output when diagnosing linkage. Launch through the site-supported Slurm/MPI integration described in [Job submission](job-submission.md).

## CUDA

CUDA workloads require three compatible layers: NVIDIA driver, CUDA toolkit/runtime and the application.

```bash
module purge
module spider CUDA
module load CUDA
nvcc --version
```

Only inspect GPUs inside an allocation:

```bash
nvidia-smi -L
nvidia-smi
```

The “CUDA Version” displayed by `nvidia-smi` is the newest CUDA API level supported by the driver, not necessarily the toolkit loaded with Lmod. Use `nvcc --version` and `module list` for the toolkit.

## Gaussian

Gaussian is licensed software; access and available module names depend on NU licensing. Match Gaussian resources to the input file:

```text title="input.com"
%NProcShared=8
%Mem=16GB
%Chk=input.chk
#p HF/6-31G(d) Opt

Water optimization

0 1
O   0.000000   0.000000   0.117790
H   0.000000   0.755453  -0.471161
H   0.000000  -0.755453  -0.471161

```

```bash title="gaussian.slurm"
#!/bin/bash
#SBATCH --job-name=gaussian
#SBATCH --partition=<cpu-partition>
#SBATCH --time=1-00:00:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=16G
#SBATCH --output=logs/%x-%j.out

set -euo pipefail
module purge
module load <gaussian-module>

export GAUSS_SCRDIR="${SLURM_TMPDIR:-${TMPDIR:-$HOME/scratch/$SLURM_JOB_ID}}"
mkdir -p "$GAUSS_SCRDIR"
g16 < input.com > input.log
```

Prefer scheduler-provided node-local scratch when available. If the fallback under `$HOME` is used, monitor quota and remove disposable scratch files only after confirming that results/checkpoints have been copied safely. Do not target an individual idle node; let Slurm place the job. GPU use in Gaussian is method- and build-specific and must not be advertised as a generic partition switch.

## MATLAB

Use non-interactive batch mode for production:

```bash title="matlab.slurm"
#!/bin/bash
#SBATCH --job-name=matlab
#SBATCH --partition=<cpu-partition>
#SBATCH --time=01:00:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --output=logs/%x-%j.out

set -euo pipefail
module purge
module load <matlab-module>
matlab -batch "run('analysis.m')"
```

Toolbox and license availability is site-specific. Do not hard-code the license server in user documentation.

## LAMMPS

The module should provide its compatible compiler, MPI and accelerator dependencies. Loading unrelated GCC/OpenMPI versions afterward can break the environment.

```bash title="lammps.slurm"
#!/bin/bash
#SBATCH --job-name=lammps
#SBATCH --partition=<cpu-partition>
#SBATCH --time=01:00:00
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=8
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=2G
#SBATCH --output=logs/%x-%j.out

set -euo pipefail
module purge
module load <lammps-module>
module list
srun lmp -in input.in
```

The old script omitted `#` from several `#SBATCH` directives, so the shell tried to execute them as commands. It also mixed a LAMMPS toolchain with independently loaded compiler/MPI versions. Both issues are corrected here.

## Containers

If Apptainer is available, it can package complex user-space dependencies without root access:

```bash
module spider Apptainer
module load <apptainer-module>
apptainer exec image.sif ./application
```

Build images on an approved system, pin image digests where practical, and follow licensing/data rules. A container does not replace Slurm resource requests or provide an incompatible host driver.

## Git on the cluster

```bash
git clone <repository-url>
cd <repository>
git switch -c docs/update-example
git status
git add docs/new/example.md
git commit -m "docs: update example"
git push -u origin docs/update-example
```

Use SSH keys or the hosting platform's approved authentication method; never save tokens in scripts or commit private keys. The documentation-specific review process is described in [Git workflow](../contribute/git-workflow.md).

## Requesting shared software

Request a shared installation when the software is licensed for NU, compatible with the operating system, useful to more than one workflow and able to use the cluster meaningfully. Include:

- name, version and authoritative download URL;
- license/access requirements;
- target cluster and CPU/GPU/MPI requirements;
- an installation recipe or EasyBuild easyconfig if available;
- a minimal validation input and expected result;
- research groups expected to use it.

User-space installations remain subject to storage quotas and security policy.
