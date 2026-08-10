# Software changes

## Correctness fixes

- Conda now uses `conda activate` and `conda install --name`, with a batch-safe shell hook.
- The CUDA section distinguishes the driver capability shown by `nvidia-smi` from the loaded toolkit shown by `nvcc`.
- Gaussian resource declarations match its input; scheduler-provided local scratch is preferred, and node targeting is removed.
- Broad `-march=native` and `-ffast-math` recommendations were replaced by portable, reproducible compiler guidance.
- The LAMMPS batch script has valid `#SBATCH` directives and no longer loads conflicting GCC/OpenMPI modules after the application module.

## Structural changes

Long historical `module avail` dumps and fixed module versions were replaced by `module spider` discovery. Added Python `venv`, coherent MPI stacks, MATLAB batch mode, containers, secure Git authentication and a structured software-request checklist.

## Full diff

<div class="diff-viewer" data-diff="../../assets/diffs/software.diff">Loading diff…</div>
