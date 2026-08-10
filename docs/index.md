---
hide:
  - toc
---

<div class="hero" markdown>

# NU Research Computing

Practical, reviewed guidance for running research workloads on the Irgetas, Shabyt and Muon clusters.

[Start a first job](new/quick-start.md){ .md-button .md-button--primary }
[Choose a system](new/systems.md){ .md-button }

</div>

<div class="quick-grid" markdown>

<a class="quick-card" href="new/quick-start/">
<strong>New to HPC?</strong>
<span>Connect, transfer files and submit a small Slurm job.</span>
</a>

<a class="quick-card" href="new/job-submission/">
<strong>Run a workload</strong>
<span>Use tested serial, OpenMP, MPI, array and GPU patterns.</span>
</a>

<a class="quick-card" href="new/software/">
<strong>Find software</strong>
<span>Work with Lmod, Conda, compilers, CUDA and applications.</span>
</a>

<a class="quick-card" href="new/policies/">
<strong>Check limits</strong>
<span>Review partitions, quotas, wall times and data responsibilities.</span>
</a>

</div>

## Transparent migration

The former MediaWiki snapshot is available beside the rewritten documentation. Every article has an **Original / Current / Changes** selector, and the Changes view provides a full color diff. The [audit summary](compare/index.md) lists factual conflicts, broken examples and values that still require administrator confirmation.

!!! info "Configuration changes over time"
    Treat live Slurm and Lmod output as authoritative. Before a large run, check `sinfo`, `scontrol show partition`, `module spider`, and the policy page.
