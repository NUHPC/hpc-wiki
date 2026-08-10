# NU HPC documentation

This repository contains a Material for MkDocs replacement for the former NU HPC MediaWiki. It keeps the imported snapshot, a rewritten current edition, and a page-by-page color diff in one static site.

The migration findings and unresolved site-specific checks are summarized in `MIGRATION_REPORT_RU.md`.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.lock.txt
mkdocs serve
```

After the files are committed to Git, enable authors and revision dates:

```bash
ENABLE_GIT_PLUGINS=true mkdocs serve
```

Open <http://127.0.0.1:8000>. Use the **Original / Current / Changes** selector at the top of an article.

## Before publishing

1. Replace `CHANGE-ME` in `mkdocs.yml` and `.github/CODEOWNERS`.
2. Confirm every item in `docs/contribute/maintainer-checklist.md` against the live clusters.
3. Create the repository, protect `main`, require pull-request review and the `build` status check.
4. If using GitHub Pages, select **GitHub Actions** as the Pages source. The included workflow builds pull requests and deploys `main`.

`requirements.lock.txt` is the tested reproducible environment. `requirements.txt` records the supported direct dependency ranges for planned upgrades.

The imported old pages are intentionally preserved for traceability. Edit `docs/new/` for current content; do not silently rewrite `docs/old/`.
