#!/bin/bash
# Git Create PR - Open pull request in browser

cd "${1:-.}"

remote_url=$(git remote get-url origin 2>/dev/null)
if [ -z "$remote_url" ]; then
  echo "❌ No remote origin found"
  exit 1
fi

# Convert SSH URL to HTTPS if needed
if [[ "$remote_url" == git@* ]]; then
  remote_url=$(echo "$remote_url" | sed 's|git@|https://|' | sed 's|:|/|')
fi

# Get current branch
branch=$(git branch --show-current)
if [ -z "$branch" ]; then
  echo "❌ Could not determine current branch"
  exit 1
fi

# Guess PR URL format
if [[ "$remote_url" == *github.com* ]]; then
  pr_url="${remote_url%.git}/compare/${branch}?expand=1"
elif [[ "$remote_url" == *gitlab.com* ]]; then
  pr_url="${remote_url%.git}/-/merge_requests/new?merge_request[source_branch]=$branch"
else
  pr_url="${remote_url%.git}/compare/$branch"
fi

echo "🌐 Opening PR creation page..."
echo "$pr_url"
