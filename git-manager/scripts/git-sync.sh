#!/bin/bash
# Git Sync - Fetch, show status, and optionally pull

cd "${1:-.}"

echo "🔄 Fetching remote..."
git fetch

echo ""
echo "📊 Status after fetch:"
git status

echo ""
echo "📝 Recent commits:"
git log --oneline -5

# Check for divergence
ahead=$(git rev-list --count @{u}..HEAD 2>/dev/null || echo "0")
behind=$(git rev-list --count HEAD..@{u} 2>/dev/null || echo "0")

if [ "$ahead" != "0" ] || [ "$behind" != "0" ]; then
  echo ""
  if [ "$ahead" != "0" ]; then
    echo "⬆️  Ahead by $ahead commit(s)"
  fi
  if [ "$behind" != "0" ]; then
    echo "⬇️  Behind by $behind commit(s)"
  fi
fi
