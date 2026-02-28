#!/bin/bash
# Git Clean Branch - Delete merged local branches

cd "${1:-.}"

main_branch="${2:-main}"

echo "🧹 Cleaning merged branches (excluding $main_branch)..."
echo ""

# List branches that would be deleted
branches=$(git branch --merged "$main_branch" | grep -v "$main_branch" | grep -v "*" | tr -d ' ')

if [ -z "$branches" ]; then
  echo "✅ No merged branches to delete"
  exit 0
fi

echo "Would delete:"
echo "$branches"
echo ""

read -p "Delete these branches? (y/N): " confirm
if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
  echo "$branches" | xargs -r git branch -d
  echo "✅ Done!"
else
  echo "Cancelled."
fi
