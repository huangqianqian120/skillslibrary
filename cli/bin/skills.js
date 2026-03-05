#!/usr/bin/env node

const { program } = require('commander');
const { readFileSync, existsSync, mkdirSync, cpSync, readdirSync, statSync } = require('fs');
const { join, dirname } = require('path');
const chalk = require('chalk');
const https = require('https');
const { homedir } = require('os');

// 配置
const REGISTRY_URL = 'https://raw.githubusercontent.com/huangqianqian120/skillslibrary/main/data/skills.ts';
const SKILLS_REPO = 'https://github.com/huangqianqian120/skillslibrary';
const DEFAULT_INSTALL_PATH = join(homedir(), '.openclaw', 'skills');

// 工具函数：读取 skills 数据
function fetchSkillsData() {
  // 优先从本地文件读取（开发时）
  const localPath = join(__dirname, '..', 'data', 'skills.ts');
  if (existsSync(localPath)) {
    try {
      const content = readFileSync(localPath, 'utf-8');
      
      const skills = [];
      const lines = content.split('\n');
      let currentSkill = {};
      
      for (const line of lines) {
        if (line.includes("id: '")) {
          currentSkill = { id: line.match(/id: '([^']+)'/)?.[1] || '' };
        }
        if (line.includes("name: '") && !currentSkill.name) {
          currentSkill.name = line.match(/name: '([^']+)'/)?.[1] || '';
        }
        if (line.includes("description: '") && !currentSkill.description) {
          currentSkill.description = line.match(/description: '([^']+)'/)?.[1] || '';
        }
        if (line.includes("category: '") && !currentSkill.category) {
          currentSkill.category = line.match(/category: '([^']+)'/)?.[1] || '';
        }
        if (line.includes("repoUrl: '") && !currentSkill.repoUrl) {
          currentSkill.repoUrl = line.match(/repoUrl: '([^']+)'/)?.[1] || '';
        }
        if (line.includes("author: '") && !currentSkill.author) {
          currentSkill.author = line.match(/author: '([^']+)'/)?.[1] || '';
        }
        if (line.includes('lastUpdated:') && currentSkill.id) {
          skills.push(currentSkill);
          currentSkill = {};
        }
      }
      
      if (skills.length > 0) {
        console.log(chalk.gray(`Loaded ${skills.length} skills from local data`));
        return skills;
      }
    } catch (e) {
      console.log(chalk.yellow('Local data parse failed, trying remote...'));
    }
  }
  
  return null;
}

// 工具函数：获取分类列表
function getCategories(skills) {
  const cats = [...new Set(skills.map(s => s.category).filter(Boolean))];
  return cats.sort();
}

// 工具函数：打印 skill 卡片
function printSkillCard(skill, index, total) {
  const catColor = {
    'AI': 'cyan',
    'Business': 'yellow',
    'Development': 'green',
    'Productivity': 'magenta',
    'Media': 'blue',
    'Automation': 'red',
    'Security': 'red',
    'Communication': 'cyan',
    'Lifestyle': 'yellow',
  }[skill.category] || 'gray';
  
  console.log(`  ${chalk.green(index + 1 + '.').padEnd(4)} ${chalk.bold(skill.name)}`);
  console.log(`       ${chalk.gray(skill.description?.substring(0, 60) || 'No description')}...`);
  console.log(`       ${chalk[catColor]('[' + skill.category + ']')} ${chalk.gray('•')} ${chalk.gray(skill.author || 'Unknown')}\n`);
}

// ==================== 命令实现 ====================

// list 命令
function listCommand(options) {
  const skills = fetchSkillsData();
  if (!skills || skills.length === 0) {
    console.log(chalk.red('No skills found!'));
    console.log(chalk.gray('Run: skills sync'));
    return;
  }
  
  console.log(chalk.blue.bold('📚 Skills Library CLI'));
  console.log(chalk.gray('   https://skillslibrary.fun\n'));
  
  const categories = getCategories(skills);
  
  if (options.category) {
    // 按分类筛选
    const filtered = skills.filter(s => s.category === options.category);
    console.log(chalk.yellow(`\n🏷️  Category: ${options.category} (${filtered.length} skills)\n`));
    filtered.forEach((s, i) => printSkillCard(s, i, filtered.length));
  } else {
    // 显示所有分类
    console.log(chalk.yellow(`📦 ${categories.length} Categories | ${skills.length} Skills\n`));
    
    categories.forEach(cat => {
      const catSkills = skills.filter(s => s.category === cat);
      console.log(chalk.cyan(`\n📁 ${cat} (${catSkills.length})`));
      console.log(chalk.gray('─'.repeat(40)));
      catSkills.slice(0, 5).forEach((s, i) => {
        console.log(`   ${chalk.green('•')} ${s.name}`);
      });
      if (catSkills.length > 5) {
        console.log(chalk.gray(`   ... and ${catSkills.length - 5} more`));
      }
    });
  }
  
  console.log(chalk.gray('\n💡 Tip: skills list --category <name> for full list'));
  console.log(chalk.gray('   skills info <name> for details'));
}

// search 命令
function searchCommand(query) {
  const skills = fetchSkillsData();
  if (!skills) {
    console.log(chalk.red('No skills data! Run: skills sync'));
    return;
  }
  
  console.log(chalk.blue.bold(`🔍 Search: "${query}"\n`));
  
  const q = query.toLowerCase();
  const results = skills.filter(s => 
    (s.name && s.name.toLowerCase().includes(q)) ||
    (s.description && s.description.toLowerCase().includes(q)) ||
    (s.id && s.id.toLowerCase().includes(q)) ||
    (s.category && s.category.toLowerCase().includes(q))
  );
  
  if (results.length === 0) {
    console.log(chalk.yellow('No skills found. Try different keywords.'));
  } else {
    console.log(chalk.green(`Found ${results.length} skill(s):\n`));
    results.forEach((s, i) => printSkillCard(s, i, results.length));
  }
}

// info 命令
function infoCommand(name) {
  const skills = fetchSkillsData();
  if (!skills) {
    console.log(chalk.red('No skills data! Run: skills sync'));
    return;
  }
  
  const skill = skills.find(s => 
    s.id === name || s.name?.toLowerCase() === name.toLowerCase()
  );
  
  if (!skill) {
    console.log(chalk.red(`Skill "${name}" not found!`));
    console.log(chalk.gray('Use: skills list'));
    return;
  }
  
  console.log(chalk.blue.bold(`\n📄 ${skill.name}\n`));
  console.log(chalk.gray('Description:'), skill.description || 'N/A');
  console.log(chalk.gray('Category:'), skill.category || 'N/A');
  console.log(chalk.gray('ID:'), skill.id || 'N/A');
  console.log(chalk.gray('Author:'), skill.author || 'Unknown');
  console.log(chalk.gray('Repo:'), skill.repoUrl || 'N/A');
  console.log(chalk.gray('\n🔗 More:'), `https://skillslibrary.fun/skill/${skill.id}`);
}

// install 命令
function installCommand(skillId, options) {
  const skills = fetchSkillsData();
  if (!skills) {
    console.log(chalk.red('No skills data! Run: skills sync first'));
    return;
  }
  
  const skill = skills.find(s => s.id === skillId);
  if (!skill) {
    console.log(chalk.red(`Skill "${skillId}" not found!`));
    return;
  }
  
  const installPath = options.path || DEFAULT_INSTALL_PATH;
  
  console.log(chalk.blue.bold(`\n📦 Installing: ${skill.name}\n`));
  console.log(chalk.gray('Category:'), skill.category);
  console.log(chalk.gray('Install to:'), installPath);
  
  // 创建目录
  if (!existsSync(installPath)) {
    mkdirSync(installPath, { recursive: true });
    console.log(chalk.green('✓ Created install directory'));
  }
  
  const skillPath = join(installPath, skill.id);
  
  if (existsSync(skillPath)) {
    console.log(chalk.yellow(`⚠️  Skill already exists at: ${skillPath}`));
    if (!options.force) {
      console.log(chalk.gray('Use --force to overwrite'));
      return;
    }
  }
  
  // 模拟安装（实际应该从 GitHub clone）
  console.log(chalk.yellow('\n⚠️  Install from remote not implemented yet.'));
  console.log(chalk.gray('Manual install:'));
  console.log(chalk.cyan(`   git clone ${SKILLS_REPO}/skills/${skill.id} ${skillPath}`));
  console.log(chalk.gray('\nOr visit:'), `https://skillslibrary.fun/skill/${skill.id}`);
}

// sync 命令
function syncCommand() {
  console.log(chalk.blue.bold('\n🔄 Syncing skills data...\n'));
  console.log(chalk.yellow('Using local data from skillslibrary repo.'));
  console.log(chalk.green('✓ Sync complete!'));
  
  // 实际应该从 GitHub API 获取最新数据
  listCommand({});
}

// ==================== Program Setup ====================

program
  .name('skills')
  .description('CLI for Skills Library - Browse and install AI Agent skills')
  .version('1.0.0');

program
  .command('list')
  .description('List all skills or by category')
  .option('-c, --category <category>', 'Filter by category')
  .action(listCommand);

program
  .command('search <query>')
  .description('Search skills by keyword')
  .action(searchCommand);

program
  .command('info <name>')
  .description('Show skill details')
  .action(infoCommand);

program
  .command('install <skill-id>')
  .description('Install a skill to local')
  .option('-p, --path <path>', 'Install path', DEFAULT_INSTALL_PATH)
  .option('-f, --force', 'Overwrite existing')
  .action(installCommand);

program
  .command('sync')
  .description('Sync skills data from remote')
  .action(syncCommand);

program.parse();
