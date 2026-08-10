# Git workflow

The documentation is designed to be maintained like a software project: every change is attributable, reviewed, tested and reversible.

## Repository setup

Replace the placeholder repository URL in `mkdocs.yml`, then configure the hosting platform:

| Control | Recommended setting |
|---|---|
| Default branch | `main` |
| Direct pushes to `main` | disabled |
| Pull request reviews | at least 1; require CODEOWNERS for systems/policies |
| Status checks | require the `build` job from `.github/workflows/docs.yml` |
| Stale approvals | dismiss when new commits are pushed |
| Force pushes / deletion | disabled on protected branches |
| Secret scanning | enable when supported |
| Issue templates | add for factual error, software request and access problem |

The included `CODEOWNERS` file contains `CHANGE-ME` placeholders. Replace them with real teams before enabling required-owner review.

## Contributor flow

```bash
git switch main
git pull --ff-only
git switch -c docs/update-shabyt-storage

# edit files under docs/new/
mkdocs build --strict

git status
git diff --check
git add docs/new/
git commit -m "docs: update Shabyt storage guidance"
git push -u origin docs/update-shabyt-storage
```

Open a pull request and explain:

- what a user will do differently;
- which cluster/configuration was checked;
- the evidence for each site-specific value;
- how commands were tested and with what minimal resources;
- whether old/current comparison notes need updating.

## Page-level Git features

Material for MkDocs uses `repo_url` and `edit_uri` to show **view source** and **edit this page** actions. The Git plugins show authors and revision dates when the build runs with full history:

```bash
ENABLE_GIT_PLUGINS=true mkdocs serve
```

The CI checkout uses `fetch-depth: 0`, so deployed pages can calculate metadata from complete history. Local builds leave the plugins disabled by default, allowing a downloaded archive to build before it is committed.

## Continuous integration and deployment

The included GitHub Actions workflow:

1. checks out complete history;
2. installs the tested dependency lock file;
3. runs `mkdocs build --strict` on every pull request;
4. uploads the static site only for `main`;
5. deploys through the protected `github-pages` environment.

For GitLab, translate the same stages into `.gitlab-ci.yml` and publish `site/` as the Pages artifact. Keep review rules and CODEOWNERS equivalent.

Dependabot is configured to propose monthly updates for both Python packages and GitHub Actions. Review and rebuild those pull requests; never auto-merge infrastructure changes solely because a version is newer.

## Original, current and changes

- `docs/old/` is the normalized MediaWiki snapshot. Treat it as immutable evidence.
- `docs/new/` is the maintained edition.
- `docs/assets/diffs/` stores generated unified diffs.
- `docs/compare/` explains material changes and loads the full diff.

When a post-migration edit changes `docs/new/`, Git itself becomes the primary detailed history. Regenerate migration diffs only when correcting the migration baseline or completing an initially deferred rewrite; note that decision in the pull request.

## Versioned releases

`mike` is included for immutable documentation releases when the service needs a version selector:

```bash
mike deploy --push --update-aliases 1.0 latest
mike set-default --push latest
```

Use semantic service-documentation versions or dated releases, document the policy, and never edit a deployed historical version in place. The built-in Original/Current selector serves a different purpose: migration transparency inside one release.

## Review responsibilities

| Change | Minimum reviewer |
|---|---|
| Grammar, navigation, accessibility | documentation maintainer |
| Command or code example | person who tested it in an allocation |
| Module/version guidance | software administrator or application owner |
| Hardware, partitions, quotas, backup | HPC administrator |
| Acceptable-use or eligibility policy | authorized policy owner |

Reviewers should prefer live command output and approved service records over recollection. Do not paste secrets, unpublished user data or full proprietary inputs into issues or pull requests.
