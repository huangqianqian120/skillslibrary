#!/bin/bash
# Calendar Today - Show today's events using Apple Calendar

echo "📅 Today's Schedule"
echo "=================="
echo ""

# Today's date
echo "📆 $(date '+%A, %B %d, %Y')"
echo ""

# Using Apple Calendar via osascript
osascript -e '
tell application "Calendar"
  tell calendar "Home"
    set todayEvents to (every event whose start date ≥ (current date) and start date < ((current date) + 1 * days))
    if (count of todayEvents) = 0 then
      return "No events today."
    end if
    set output to ""
    repeat with anEvent in todayEvents
      set startTime to (start date of anEvent)
      set endTime to (end date of anEvent)
      set summary to summary of anEvent
      set timeStr to (time string of startTime) & " - " & (time string of endTime)
      set output to output & "🕐 " & timeStr & "\\n   " & summary & "\\n\\n"
    end repeat
    return output
  end tell
end tell
' 2>/dev/null | sed 's/\\n/\n/g'

echo ""
echo "-------------------"
