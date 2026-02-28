# Skills Library CLI

Command line interface for browsing and managing AI Agent skills.

## Installation

```bash
# Clone the repository
git clone https://github.com/huangqianqian120/skillslibrary.git
cd skillslibrary/cli

# Install dependencies
npm install

# Run directly
node bin/skills.js <command>

# Or link globally (requires permissions)
npm link
skills <command>
```

## Commands

### List All Skills

```bash
node bin/skills.js list
```

Output:
```
📚 Skills Library CLI
Browse at: https://www.skillslibrary.fun

📦 Categories: marketing, development, research, product, automation

📁 marketing (4)
   • Copywriting
   • SEO Audit
   • ...

📁 development (4)
   • Web Development
   • Frontend
   • ...
```

### List by Category

```bash
node bin/skills.js list --category automation
```

### Search Skills

```bash
node bin/skills.js search copywriting
```

Output:
```
🔍 Searching for: "copywriting"

Found 1 skill(s):
  Copywriting [marketing]
    Marketing copy for any page

💡 Full details: https://www.skillslibrary.fun
```

### Show Skill Details

```bash
node bin/skills.js cat workflow-miner
```

Output:
```
📄 Workflow Miner
Description: Mine workflows and generate skills
Category: automation
ID: workflow-miner

🔗 Full details: https://www.skillslibrary.fun/skill/workflow-miner
```

### Show CLI Info

```bash
node bin/skills.js info
```

## Examples

```bash
# List all automation skills
skills list --category automation

# Find SEO related skills
skills search seo

# Get details about a skill
skills cat growth
```

## Also Available

- **Website**: https://www.skillslibrary.fun
- **GitHub**: https://github.com/huangqianqian120/skillslibrary
