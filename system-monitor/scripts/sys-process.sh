#!/bin/bash
# Process Check - Find and show processes

query="${1:-.}"

echo "🔍 Processes matching: $query"
echo "========================"
echo ""

# Header
printf "%-8s %-6s %-8s %s\n" "PID" "CPU%" "MEM%" "COMMAND"
echo ""

# Show matching processes
ps aux | grep -i "$query" | grep -v grep | head -20 | \
  awk '{printf "%-8s %-6s %-8s %s\n", $2, $3, $4, $11}' | head -15
