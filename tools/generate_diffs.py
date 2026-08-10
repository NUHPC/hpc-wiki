#!/usr/bin/env python3
"""Regenerate unified migration diffs from docs/old and docs/new."""

from __future__ import annotations

import difflib
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OLD = ROOT / "docs" / "old"
NEW = ROOT / "docs" / "new"
DEST = ROOT / "docs" / "assets" / "diffs"
PAGES = ("index", "quick-start", "systems", "job-submission", "software", "policies")


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    for page in PAGES:
        old = (OLD / f"{page}.md").read_text(encoding="utf-8").splitlines(keepends=True)
        new = (NEW / f"{page}.md").read_text(encoding="utf-8").splitlines(keepends=True)
        diff = difflib.unified_diff(
            old,
            new,
            fromfile=f"old/{page}.md",
            tofile=f"new/{page}.md",
            n=3,
        )
        (DEST / f"{page}.diff").write_text("".join(diff), encoding="utf-8")


if __name__ == "__main__":
    main()
