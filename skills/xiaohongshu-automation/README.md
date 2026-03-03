# 🏛️ 小红书自动化助手

小红书内容自动化 — 监控关键词、生成文案、自动发布。

## 📋 功能

### 1️⃣ 关键词搜索
搜索博物馆、文博、文物相关内容

### 2️⃣ AI 内容生成
使用 LLM 生成小红书风格笔记

### 3️⃣ 自动发布（需要配置）
浏览器自动化登录和发布

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install playwright
npx playwright install chromium
```

### 2. 运行搜索
```bash
cd scripts
python xhs_automation.py search 博物馆
python xhs_automation.py trends 博物馆 文博 文物
```

### 3. 生成内容
```bash
python xhs_automation.py generate 博物馆 story
python xhs_automation.py generate 博物馆 guide
```

## 📝 使用示例

### 日常监控
```
"搜索博物馆相关内容"
"看看文博有什么热门"
"文物相关的笔记有哪些"
```

### 生成文案
```
"帮我写一篇博物馆笔记"
"生成一个关于文物的文案"
"写个小红书风格的帖子"
```

## 🔐 登录配置（重要）

### 首次登录
```bash
node scripts/xhs_publish.js
```

首次运行会：
1. 打开浏览器
2. 请扫码登录小红书
3. 自动保存 cookies

### Cookies 有效期
- Cookies 会保存在 `data/xiaohongshu_cookies.json`
- 通常有效期几周到几个月
- 失效后需要重新登录

## ⚠️ 注意事项

1. **遵守平台规则**
   - 不要发布违规内容
   - 控制发布频率（每天1-2篇为宜）
   - 避免短时间内大量操作

2. **风险提示**
   - 自动化可能违反小红书 TOS
   - 账号可能被封禁
   - 请谨慎使用

3. **维护成本**
   - 小红书可能更新界面
   - 需要定期维护脚本

## 📁 文件结构

```
xiaohongshu-automation/
├── SKILL.md              # 技能定义
├── README.md             # 本文档
└── scripts/
    ├── xhs_automation.py    # 搜索和生成
    ├── xhs_publish.js        # 发布脚本
    └── xhs_config.js        # 配置文件
```

## 🎯 下一步

- [ ] 安装 Playwright
- [ ] 运行首次登录
- [ ] 配置定时任务
- [ ] 测试完整流程

---

*让AI帮你运营小红书！📱*
