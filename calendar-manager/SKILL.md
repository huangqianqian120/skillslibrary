---
name: calendar-manager
description: |
  Calendar management for Apple Calendar and Google Calendar. Use when:
  - Viewing today's or week's events
  - Adding new calendar events
  - Checking upcoming schedule
  - Setting up reminders
  - Syncing calendars
  - Managing calendar availability
---

# Calendar Manager

## Apple Calendar (macOS)

### View Events
```bash
# Today's events
cal | grep -A 6 "$(date +%e)" | tail -6

# Using osascript (Apple Script)
ostell application "Calendarascript -e '" to get events of today'
```

### Quick Add Event
```bash
# Create simple event
osascript -e 'tell application "Calendar"
  tell calendar "Home"
    make new event with properties {summary:"Meeting", start date:current date, end date:(current date + 3600)}
  end tell
end tell'
```

## Google Calendar

Requires `gcalcli` or Google Calendar API setup.

### Commands (with gcalcli)
```bash
gcalcli agenda          # Today's agenda
gcalcli calw 1          # Week view
gcalcli quick "Dinner at 7pm"  # Quick add
```

## Natural Language Parsing

For natural language event creation, consider using:
- `parsed` CLI tool
- Node.js `nlp.js` package
- Apple Shortcuts integration

## Time Formatting

ISO 8601 format for dates:
- `2026-02-13` (date only)
- `2026-02-13T10:00:00` (with time)
- `2026-02-13T10:00:00+08:00` (with timezone)

## Common Patterns

| Task | Approach |
|------|----------|
| Today's schedule | `cal` + `osascript` |
| Weekly view | Calendar app or `gcalcli` |
| Quick meeting | osascript or Shortcuts |
| Recurring events | Use event recurrence rules |
