#!/bin/bash
# Calendar Quick Add - Quick add event to Apple Calendar

# Usage: ./cal-quick-add.sh "Event Name" [hours_from_now]

event_name="${1:-New Event}"
hours="${2:-1}"

osascript -e "
tell application \"Calendar\"
  tell calendar \"Home\"
    make new event with properties {summary:\"$event_name\", start date:(current date), end date:(current date + $hours * hours)}
  end tell
end tell
"

echo "✅ Added: $event_name"
