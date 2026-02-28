#!/bin/bash
# System Overview - Quick system status

echo "🍎 macOS System Overview"
echo "========================"
echo ""

# Uptime
echo "⏰ Uptime:"
uptime | sed 's/^/   /'
echo ""

# CPU
echo "🖥️  CPU:"
cpu_model=$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo "Unknown")
echo "   $cpu_model"
load=$(uptime | sed 's/.*load averages: //')
echo "   Load: $load"
echo ""

# Memory
echo "🧠 Memory:"
vm_stat | head -10
echo ""

# Disk
echo "💾 Disk:"
df -h / | tail -1 | awk '{print "   Used: " $3 " / " $2 " (" $5 ")"}'
echo ""

# Battery (if on laptop)
if pmset -g batt 2>/dev/null | grep -q "Internal"; then
  echo "🔋 Battery:"
  pmset -g batt | grep -E "(Percent|remaining)" | sed 's/^/   /'
  echo ""
fi
