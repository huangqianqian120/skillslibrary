---
name: git-manager
description: |
  Comprehensive Git operations for repository management. Use when working with Git repositories for:
  - Committing changes (git commit with conventional commits format)
  - Creating branches (feature, bugfix, hotfix branches)
  - Stashing changes
  - Viewing history, diffs, and status
  - Merging and rebasing
  - Creating pull requests (GitHub, GitLab)
  - Undoing commits and changes
  - Syncing with remote (push, pull, fetch)
---

# Git Manager

## Quick Commands

### Status & Info
```bash
git status              # Show working tree status
git status -s          # Short format
git log --oneline      # Compact commit history
git log --graph       # Visual graph
git diff              # Show unstaged changes
git diff --cached     # Show staged changes
```

### Committing
```bash
git add <files>       # Stage specific files
git add .             # Stage all changes
git commit -m "feat: add new feature"
git commit -m "fix: resolve login bug"
git commit -m "docs: update README"
git commit --amend    # Amend last commit
```

### Branching
```bash
git branch -a                    # List all branches
git checkout -b feature/name    # Create and switch
git checkout main               # Switch branch
git branch -d feature/name      # Delete branch
```

### Sync
```bash
git fetch              # Fetch remote changes
git pull               # Pull remote changes
git push               # Push local commits
git push -u origin branch  # Push and track
```

### Stashing
```bash
git stash              # Stash changes
git stash list         # List stashes
git stash pop          # Apply and drop
```

## Conventional Commits

Follow these prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, no code change
- `refactor:` - Code restructure
- `test:` - Adding tests
- `chore:` - Maintenance

## Pull Request Workflow

1. Create branch: `feature/short-description`
2. Make changes and commit
3. Push: `git push -u origin feature/short-description`
4. Create PR from remote URL

## Undo Operations

| Action | Command |
|--------|---------|
| Unstage file | `git reset HEAD <file>` |
| Undo commit (keep changes) | `git reset --soft HEAD~1` |
| Undo commit (discard changes) | `git reset --hard HEAD~1` |
| Revert commit | `git revert <commit-hash>` |
