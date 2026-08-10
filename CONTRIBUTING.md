# Contributing

Documentation changes use the same review discipline as code:

1. Create a short branch from `main`, for example `docs/update-irgetas-limits`.
2. Edit the current page in `docs/new/` and update its corresponding entry in `docs/compare/` when the migration audit changes.
3. Run `mkdocs build --strict` locally.
4. Open a pull request. Include the source of every changed partition, quota, hostname, software version or policy limit.
5. Obtain review from an HPC administrator and, for policy changes, the responsible policy owner.

Do not add credentials, unpublished personal data or proprietary license files. Examples must request the smallest practical resources and must not run substantial work on login nodes.
