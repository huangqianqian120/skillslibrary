#!/usr/bin/env node

const { program } = require('commander');
const { readdirSync, readFileSync, existsSync } = require('fs');
const { join, dirname } = require('path');
const chalk = require('chalk');

// Simple skills data (embedded for demo)
const skillsData = [
  { id: 'copywriting', name: 'Copywriting', description: 'Marketing copy for any page', category: 'marketing' },
  { id: 'seo-audit', name: 'SEO Audit', description: 'Technical SEO analysis', category: 'marketing' },
  { id: 'marketing-ideas', name: 'Marketing Ideas', description: '139 proven growth tactics', category: 'marketing' },
  { id: 'marketing-psychology', name: 'Marketing Psychology', description: '70+ mental models', category: 'marketing' },
  { id: 'web', name: 'Web Development', description: 'Build websites with HTML/CSS/JS', category: 'development' },
  { id: 'frontend', name: 'Frontend', description: 'Modern frontend development', category: 'development' },
  { id: 'html', name: 'HTML', description: 'HTML skills', category: 'development' },
  { id: 'http-retry', name: 'HTTP Retry', description: 'Universal HTTP retry mechanism', category: 'development' },
  { id: 'ai-news-aggregator', name: 'AI News Aggregator', description: 'Daily AI news briefing', category: 'research' },
  { id: 'competitor-tracker', name: 'Competitor Tracker', description: 'Monitor competitor activities', category: 'research' },
  { id: 'document-summarizer', name: 'Document Summarizer', description: 'Summarize long documents', category: 'research' },
  { id: 'tavily', name: 'Tavily', description: 'AI-powered web search', category: 'research' },
  { id: 'product-strategy', name: 'Product Strategy', description: 'Product strategy frameworks', category: 'product' },
  { id: 'growth', name: 'Growth', description: 'Product growth and PMF', category: 'product' },
  { id: 'user-research', name: 'User Research', description: 'User research methods', category: 'product' },
  { id: 'workflow-builder', name: 'Workflow Builder', description: 'Build and optimize workflows', category: 'automation' },
  { id: 'workflow-miner', name: 'Workflow Miner', description: 'Mine workflows and generate skills', category: 'automation' },
  { id: 'skills-cli', name: 'Skills CLI', description: 'CLI tool for Skills Library', category: 'automation' },
];

const categories = [...new Set(skillsData.map(s => s.category))];

program
  .name('skills')
  .description('CLI for Skills Library - Browse AI Agent skills')
  .version('1.0.0');

program
  .command('list')
  .description('List all skills or by category')
  .option('-c, --category <category>', 'Filter by category')
  .action((options) => {
    console.log(chalk.blue.bold('📚 Skills Library CLI'));
    console.log(chalk.gray('Browse at: https://www.skillslibrary.fun\n'));
    
    if (options.category) {
      const filtered = skillsData.filter(s => s.category === options.category);
      console.log(chalk.yellow(`\n🏷️  Category: ${options.category} (${filtered.length} skills)\n`));
      filtered.forEach(skill => {
        console.log(`  ${chalk.green('•')} ${chalk.bold(skill.name)} - ${skill.description}`);
      });
    } else {
      console.log(chalk.yellow('\n📦 Categories:'), categories.join(', '));
      console.log(chalk.gray('\nUse: skills list --category <name>\n'));
      
      categories.forEach(cat => {
        const catSkills = skillsData.filter(s => s.category === cat);
        console.log(chalk.cyan(`\n📁 ${cat} (${catSkills.length})`));
        catSkills.forEach(skill => {
          console.log(`   • ${skill.name}`);
        });
      });
    }
    
    console.log(chalk.gray('\n💡 Tip: Visit https://www.skillslibrary.fun for full details'));
  });

program
  .command('search <query>')
  .description('Search skills by name or keyword')
  .action((query) => {
    console.log(chalk.blue.bold(`🔍 Searching for: "${query}"\n`));
    
    const results = skillsData.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
      console.log(chalk.yellow('No skills found. Try a different keyword.'));
    } else {
      console.log(chalk.green(`Found ${results.length} skill(s):\n`));
      results.forEach(skill => {
        console.log(`  ${chalk.bold(skill.name)} [${skill.category}]`);
        console.log(`    ${chalk.gray(skill.description)}\n`);
      });
    }
    
    console.log(chalk.gray('💡 Full details: https://www.skillslibrary.fun'));
  });

program
  .command('cat <name>')
  .description('Show skill details')
  .action((name) => {
    const skill = skillsData.find(s => 
      s.id === name || s.name.toLowerCase() === name.toLowerCase()
    );
    
    if (!skill) {
      console.log(chalk.red('Skill not found!'));
      console.log(chalk.gray('Use: skills list'));
      return;
    }
    
    console.log(chalk.blue.bold(`\n📄 ${skill.name}\n`));
    console.log(chalk.gray('Description:'), skill.description);
    console.log(chalk.gray('Category:'), skill.category);
    console.log(chalk.gray('ID:'), skill.id);
    console.log(chalk.gray('\n🔗 Full details:'), `https://www.skillslibrary.fun/skill/${skill.id}`);
  });

program
  .command('info')
  .description('Show CLI info')
  .action(() => {
    console.log(chalk.blue.bold('\n💻 Skills CLI'));
    console.log(chalk.gray('Version: 1.0.0'));
    console.log(chalk.gray('Website: https://www.skillslibrary.fun'));
    console.log(chalk.gray('GitHub: https://github.com/huangqianqian120/skillslibrary\n'));
  });

program.parse();
