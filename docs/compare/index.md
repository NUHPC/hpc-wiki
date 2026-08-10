# Migration audit

The rewrite changes the wiki from a prose-heavy MediaWiki snapshot into task-oriented, reviewable MkDocs documentation. The complete line diff for each page remains available; green lines are additions and red lines are removals.

## Scope and evidence

| Page | Snapshot saved | MediaWiki oldid in archive | New treatment |
|---|---|---:|---|
| Main Page | 4 Aug 2026 | 1258 | action-oriented landing page |
| Quick Start | 4 Aug 2026 | 1071 | first login/job workflow; access gaps flagged |
| Systems | 4 Aug 2026 | 1252 | comparable inventory tables and local images |
| Job Submission | 4 Aug 2026 | 1262 | corrected, smaller serial/OpenMP/MPI/GPU/array patterns |
| Software | 4 Aug 2026 | 1188 | version-neutral Lmod workflow and repaired application examples |
| Policies | 4 Aug 2026 | 1261 | compact limits, clearer responsibilities and explicit verification status |

Generic guidance was checked against official Slurm, Lmod, Conda and Material for MkDocs documentation. Site-specific facts were compared across the six archived pages. No live cluster shell or administrator-approved configuration export was available, so conflicts are surfaced rather than silently guessed.

## Findings that affect correctness

| Severity | Finding | Resolution in current edition |
|---|---|---|
| <span class="audit-critical">Critical</span> | OpenMP example computes `i*i` as `int` and its final 1…100,000,000 sum cannot fit in signed 64-bit | reduced range, cast before multiplication, result fits `long long` |
| <span class="audit-critical">Critical</span> | LAMMPS script omits `#` on several `SBATCH` lines, so Bash treats them as commands | valid `#SBATCH` directives; one coherent module stack; `srun lmp -in` |
| <span class="audit-critical">Critical</span> | Conda example uses invalid `conda --name ... install` ordering and legacy activation syntax | `conda install --name ...`; `conda activate` after shell hook |
| <span class="audit-review">Needs owner review</span> | Irgetas H100 CPU is EPYC 9654 in Systems but EPYC 9454 in Policies | detailed Systems value retained with visible conflict warning |
| <span class="audit-review">Needs owner review</span> | Storage text says 1 Mbit/s while inventory names 1 Gb/s Ethernet and InfiniBand | unsupported throughput removed; topology/measurement checklist added |
| <span class="audit-review">Needs owner review</span> | Irgetas says “four QoS” but lists five | table lists all five without the wrong count |
| <span class="audit-review">Needs owner review</span> | Public access FQDN, VPN/MFA, fingerprints and account process were absent | placeholders and blocking maintainer checklist added |
| <span class="audit-improved">Improved</span> | Job IDs described as always four or five digits | treated as opaque identifiers |
| <span class="audit-improved">Improved</span> | Impossible Slurm requests described as universally pending forever | explains that behavior depends on scheduler configuration and reason codes |
| <span class="audit-improved">Improved</span> | `nvidia-smi` CUDA field presented like the loaded toolkit | distinguishes driver capability from `nvcc`/module toolkit version |
| <span class="audit-improved">Improved</span> | `-march=native -ffast-math` recommended broadly | portability/reproducibility risks explained; safer baseline flags used |
| <span class="audit-improved">Improved</span> | Gaussian scratch placed in shared home and users told to choose an idle node | scheduler/node-local scratch preferred; Slurm chooses placement |

## Content and design changes

- Current pages start with the task or decision a researcher needs to make.
- Code blocks are copyable, syntax-highlighted and request small resources.
- Light/dark themes, responsive navigation, search, tables, admonitions and local images replace the legacy skin.
- Every article has **Original / Current / Changes** navigation.
- Git edit/source links, authors, revision dates, CODEOWNERS, pull-request templates and strict CI are included.
- Policy and configuration statements distinguish archived evidence, live commands and owner approval.

## Remaining publication blockers

Complete the [maintainer checklist](../contribute/maintainer-checklist.md), especially access endpoints, CPU model, network/storage topology, scheduler caps, module names and backup guarantees. The site is technically publishable, but unresolved values must not be represented as administrator-approved policy.

## Full Main Page diff

Use the controls to hide unchanged context, additions or deletions.

<div class="diff-viewer" data-diff="../assets/diffs/index.diff">Loading diff…</div>
