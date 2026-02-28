#!/bin/bash
# Git Status - Enhanced status display

cd "${1:-.}"

echo "📂 $(pwd)"
echo ""

# Branch info
branch=$(git branch --show-current 2>/dev/null || echo "detached")
echo "🌿 Branch: $branch"

# Remote tracking
remote=$(git remote get-url origin 2>/dev/null || echo "No remote")
if [ -n "$remote" ]; then
  remote_name=$(git rev-parse --abbrev-ref @{u} 2>/dev/null | sed 's|/.*||' || echo "origin")
  echo "🔗 Remote: $remote_name → $remote"
fi

# Stash count
stash_count=$(git stash list 2>/dev/null | wc -l | tr -d ' ')
if [ "$stash_count" -gt 0 ]; then
  echo "📦 Stashed: $stash_count"
fi

echo ""
echo "Changes:"
git status --porcelain
