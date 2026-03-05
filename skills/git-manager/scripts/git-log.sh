#!/bin/bash
# Git Log - Pretty commit history

cd "${1:-.}"

# Show last 10 commits with nice formatting
git log --oneline -10 --graph --decorate \
  --format='%C(red)%h%C(reset) %C(green)%ai%C(reset) %C(blue)%s%C(reset) %C(yellow)%an%C(reset)'
