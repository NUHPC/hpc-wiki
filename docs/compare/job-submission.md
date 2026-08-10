# Job Submission changes

## Correctness fixes

- The OpenMP example no longer overflows `int` during multiplication or signed 64-bit storage for the final sum.
- The OpenMP request starts at eight CPUs instead of assuming all 128 hardware threads are useful or configured as Slurm CPUs.
- MPI uses a coherent wrapper/module stack and a small two-node request; `srun` is presented with a site-integration caveat.
- Job IDs are opaque rather than assumed to have four or five digits.
- Early completion and wall-time termination are explained correctly.
- Pending behavior is tied to Slurm reason codes rather than described as universally indefinite.
- `--exclusive` is limited to genuine whole-node cases.
- GPU toolkit and driver capability are distinguished.

## Usability additions

Added a resource-model table, safe shell baseline, job arrays, accounting-driven tuning and a support checklist. Module and partition placeholders avoid freezing a historical software version into a supposedly current template.

## Full diff

<div class="diff-viewer" data-diff="../../assets/diffs/job-submission.diff">Loading diff…</div>
