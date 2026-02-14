#!/bin/bash
# Disk Check - Disk usage analyzer

target="${1:-$HOME}"

echo "💾 Disk Usage: $target"
echo "========================"
echo ""

# Overall usage
echo "📊 Overall:"
df -h "$target" | tail -1 | awk '{print "   Used: " $3 " / " $2 " (" $5 ")"}'
echo ""

# Top 10 largest directories
echo "📁 Largest directories:"
du -h "$target"/* 2>/dev/null | sort -hr | head -10 | nl
echo ""

# Top 10 largest files (recursive)
echo "📄 Largest files:"
find "$target" -type f -exec du -h {} \; 2>/dev/null | sort -hr | head -10 | nl
