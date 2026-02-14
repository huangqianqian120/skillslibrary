---
name: system-monitor
description: |
  System monitoring and resource management for macOS. Use when checking:
  - CPU usage and load
  - Memory (RAM) usage
  - Disk usage and space
  - Battery status
  - Running processes
  - Network connections
  - Temperature and fan speed
---

# System Monitor

## Quick Checks

### CPU
```bash
# Load average
uptime

# CPU usage
top -l 1 | head -5

# All cores
sysctl -n hw.ncpu
```

### Memory
```bash
# Memory usage
vm_stat

# Quick overview
top -l 1 | grep -E "^Phys" 

# Swap usage
sysctl vm.swapusage
```

### Disk
```bash
# Disk usage
df -h

# Home directory size
du -sh ~

# Largest directories
du -h ~/* | sort -hr | head -10
```

### Battery
```bash
# Battery status
pmset -g batt

# Detailed
system_profiler SPPowerDataType
```

## Process Management

| Task | Command |
|------|---------|
| List processes | `top -o cpu` |
| Find process | `ps aux \| grep <name>` |
| Kill process | `kill <PID>` |
| Force kill | `kill -9 <PID>` |

## Network

```bash
# Open ports
netstat -an | grep LISTEN

# Connections
lsof -i

# Ping check
ping -c 3 <host>
```
