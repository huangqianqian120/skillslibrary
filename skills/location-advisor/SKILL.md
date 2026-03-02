---
name: location-advisor
description: 选址顾问系统。基于McKinsey方法论，通过MECE因素拆解、数据驱动评分和假设验证，帮助完成零售门店/餐饮/仓库/工厂/办公室等选址决策。支持API集成和本地fallback。
license: MIT
metadata:
  author: Qianqian
  version: "1.0"
  last_updated: "2026-03-02"
  architecture: "Progressive Disclosure + API Integration"
---

# 选址顾问 V1.0

**架构**: Progressive Disclosure (渐进式披露) + API Integration (数据驱动)
**核心**: 融合McKinsey方法论 + 选址领域知识 + API数据采集

---

# ⚠️ CRITICAL BEHAVIOR RULES

**优先级最高，必须严格遵守:**

## 1. 首次使用响应规则
当用户说"我刚添加了location-advisor skill"或"帮我选址"时:
- ✅ **必须使用下面"首次使用引导"中的精确话术**
- ✅ **只输出4行文字，不做扩展**
- ❌ **禁止列举示例问题**
- ❌ **禁止详细询问行业/范围等**
- ❌ **禁止超过4行回复**
- ✅ **只问一个二选一的问题，等待用户回应**

## 2. 问题澄清规则
- ✅ 只问当下最关键的1-2个问题
- ❌ 不要一次性列出5个以上的问题
- ❌ 不要把澄清变成"需求调研问卷"

## 3. 流程启动规则
- ✅ 只有用户明确说"开始"或提供了足够信息后，才进入STEP 1
- ❌ 不要在用户只是询问时就自动开始

---

## 🌟 首次使用引导

**检测触发**:
- 用户说"我刚添加了location-advisor skill"
- 用户说"帮我选址"
- 用户询问但不熟悉本skill

**⚠️ 必须使用以下话术:**
```
我看到你添加了location-advisor skill!
这是一个选址顾问工具，基于McKinsey方法论。

需要我介绍工作方法吗?
还是直接告诉我你的选址需求?
```

**禁止事项:**
- ❌ 不要列举示例(如"门店选址?"、"仓库选址?"等)
- ❌ 不要详细询问类型/预算/城市
- ❌ 不要使用emoji或过度格式化
- ❌ 不要超过4行文字
- ✅ 只问这一个二选一问题，等待回应

**如果需要介绍** → 加载 references/quick-guide.md

---

## 📋 7步工作流总览

```
Phase 1: 问题定义 (10分钟)
  STEP 1: 定义选址边界
    → API: initialize

Phase 2: 因素拆解 (15分钟)
  STEP 2: MECE因素拆解
    → API: factors
  STEP 3: 确定权重 + 假设
    → API: weight_template

Phase 3: 数据收集 (20分钟)
  STEP 4: 候选区域初筛
    → API: filter (硬性条件)
    → API: data_batch (人口/租金/交通)

Phase 4: 分析评估 (25分钟)
  STEP 5: 评分对比
    → API: score (计算加权)
    → API: ranking (排名)
  STEP 6: 深度分析
    → API: competitor_analysis (竞品)
    → API: foot_traffic (客流)

Phase 5: 输出 (10分钟)
  STEP 7: 决策建议
    → API: report (PPT/PDF导出)
```

**⏱️ 总耗时**: 约80分钟 | **vs传统**: 节省70%+

---

## 🚀 启动方式

### 方式1: 新项目
```
"帮我选址一个咖啡门店"
"用location-advisor分析上海浦东的零售门店"
```
→ 从STEP 1开始

### 方式2: 继续之前项目
```
[上传 项目名_Dummy_日期.md]
"请从第X步继续"
```
→ 读取Dummy，继续

---

## 📖 分步执行指南

### STEP 1: 定义选址边界

**目标**: 明确"是什么/不是什么"

**关键问题**:
1. 什么类型的选址？
   - 零售门店 / 餐饮 / 仓库 / 工厂 / 办公室 / 产业园
2. 核心目标优先级？
   - 流量优先 / 成本优先 / 品牌调性 / 长期发展
3. 地理范围？
   - 城市 / 区域 / 具体商圈
4. 预算范围？
   - 租金/售价预算
   - 面积需求

**API调用**:
```python
# 用户确定后
POST /api/location/initialize
{
  "type": "retail_store",      # 门店/餐饮/仓库/工厂/办公室
  "priority": "traffic",       # 流量/成本/品牌/长期
  "city": "上海",
  "district": "浦东新区",
  "budget_range": "5000-10000",  # 元/月
  "area_range": "50-100㎡"
}
→ 返回: session_id, 建议权重模板
```

**输出**:
```markdown
## 选址问题定义

### 是 ✅
- 类型: 零售门店（咖啡）
- 目标: 流量优先
- 城市: 上海浦东
- 预算: 5000-10000元/月
- 面积: 50-100㎡

### 不是 ❌
- 不考虑郊区和工业园区
- 不考虑加盟特定品牌
```

---

### STEP 2: MECE因素拆解

**目标**: 构建完整的选址因素树

**API调用**:
```python
# 获取标准因素库
GET /api/location/factors?type=retail_store
→ 返回:
{
  "factors": [
    {
      "category": "交通便利性",
      "weight_default": 0.25,
      "sub_factors": [
        {"name": "地铁距离", "weight": 0.10, "data_source": "高德API"},
        {"name": "公交线路", "weight": 0.05, "data_source": "公交API"},
        {"name": "停车位", "weight": 0.05, "data_source": "现场调研"},
        {"name": "物流配送", "weight": 0.05, "data_source": "物流API"}
      ]
    },
    {
      "category": "成本效益",
      "weight_default": 0.25,
      "sub_factors": [...]
    },
    {
      "category": "市场潜力",
      "weight_default": 0.25,
      "sub_factors": [...]
    },
    {
      "category": "竞争环境",
      "weight_default": 0.15,
      "sub_factors": [...]
    },
    {
      "category": "政策风险",
      "weight_default": 0.10,
      "sub_factors": [...]
    }
  ]
}
```

**输出**:
```markdown
## Issue Tree - 选址因素拆解

### 1. 交通便利性 (25%)
├── 地铁站距离 (10%) - 高德API
├── 公交线路数 (5%) - 公交API
├── 停车位数量 (5%) - 现场调研
└── 物流配送距离 (5%) - 物流API

### 2. 成本效益 (25%)
├── 租金 (10%) - 贝壳API
├── 装修成本 (5%) - 估算
├── 人力成本 (5%) - 招聘平台
└── 运营成本 (5%) - 历史数据

### 3. 市场潜力 (25%)
├── 3km人口密度 (10%) - 统计局
├── 人均消费能力 (5%) - 统计局
├── 日均客流量 (5%) - 大众点评/现场
└── 区域增长趋势 (5%) - 城市规划

### 4. 竞争环境 (15%)
├── 竞争对手数量 (5%) - 大众点评
├── 竞争对手距离 (5%) - 高德API
├── 市场集中度 (3%) - 大众点评
└── 差异化空间 (2%) - 分析

### 5. 政策风险 (10%)
├── zoning规划 (4%) - 规划局
├── 证照难度 (3%) - 工商经验
├── 拆迁风险 (2%) - 城市规划
└── 政策补贴 (1%) - 园区政策
```

---

### STEP 3: 确定权重 + 假设

**目标**: 明确核心假设，确定因素权重

**权重确定方式**:
```python
# 方式1: 使用默认值
GET /api/location/weight_template?type=retail_store&priority=traffic

# 方式2: AHP计算
POST /api/location/weight_ahp
{
  "pairwise_comparisons": [
    {"factor_a": "交通便利性", "factor_b": "成本效益", "ratio": 1.5},
    ...
  ]
}

# 方式3: 专家打分
POST /api/location/weight_expert
{
  "scores": {"交通便利性": 9, "成本效益": 7, ...}
}
```

**假设驱动示例**:
```markdown
## Hypotheses

### H1: 交通便利性是核心驱动
- 假设: 地铁500米内门店业绩比500米外高30%
- 验证: 收集竞品数据对比

### H2: 人口密度与销售额正相关
- 假设: 3km内人口每增1万，销售额增10%
- 验证: 回归分析历史门店数据

### H3: 竞争有阈值效应
- 假设: 同类门店超过5家后，边际效益锐减
- 验证: 竞品分布分析
```

---

### STEP 4: 候选区域初筛

**目标**: 收集候选区域，进行硬性条件过滤

**API调用**:
```python
# 1. 获取候选区域基础数据
POST /api/location/data_batch
{
  "areas": ["陆家嘴", "张江", "花木", "金桥"],
  "data_types": ["population", "rent", "traffic", "competitor"]
}
→ 返回: 各区域原始数据

# 2. 硬性条件过滤
POST /api/location/filter
{
  "candidate_areas": ["陆家嘴", "张江", "花木", "金桥"],
  "hard_constraints": {
    "max_rent": 10000,
    "min_population": 50000,
    "zoning": ["商业", "综合用地"],
    "min_foot_traffic": 1000
  }
}
→ 返回:
{
  "passed": ["陆家嘴", "花木"],
  "rejected": [
    {"area": "张江", "reason": "租金超预算15000"},
    {"area": "金桥", "reason": "人口不足3万"}
  ]
}
```

**输出**:
```markdown
## 候选区域初筛

### 硬性条件过滤结果

| 区域 | 租金 | 人口 | 客流 | zoning | 结果 |
|------|------|------|------|--------|------|
| 陆家嘴 | 120 | 15万 | 5000 | 商业 | ✅ 通过 |
| 花木 | 80 | 8万 | 2000 | 商业 | ✅ 通过 |
| 张江 | 150 | 6万 | 1500 | 工业 | ❌ 超出预算 |
| 金桥 | 60 | 2万 | 800 | 综合 | ❌ 人口不足 |

### 候选清单
1. 陆家嘴 - 核心商圈，流量最高
2. 花木 - 社区成熟，性价比高
```

---

### STEP 5: 评分对比

**目标**: 多维度评分，计算加权总分

**API调用**:
```python
POST /api/location/score
{
  "session_id": "xxx",
  "areas": ["陆家嘴", "花木"],
  "weights": {
    "交通便利性": 0.25,
    "成本效益": 0.25,
    "市场潜力": 0.25,
    "竞争环境": 0.15,
    "政策风险": 0.10
  },
  "factor_scores": {
    "陆家嘴": {
      "地铁距离": 95,
      "租金": 60,
      "人口密度": 95,
      "竞争数量": 40,
      "zoning": 90
    },
    "花木": {
      "地铁距离": 80,
      "租金": 85,
      "人口密度": 75,
      "竞争数量": 70,
      "zoning": 85
    }
  }
}
→ 返回:
{
  "rankings": [
    {"area": "陆家嘴", "score": 78.5, "rank": 1},
    {"area": "花木", "score": 79.0, "rank": 2}
  ],
  "radar_chart": "base64或URL",
  "comparison_table": [...],
  "score_breakdown": {
    "陆家嘴": {"交通便利性": 23.75, "成本效益": 15.0, ...},
    "花木": {"交通便利性": 20.0, "成本效益": 21.25, ...}
  }
}
```

**输出**:
```markdown
## 评分对比

### 综合得分

| 排名 | 区域 | 综合得分 |
|------|------|----------|
| 🥇 | 花木 | 79.0 |
| 🥈 | 陆家嘴 | 78.5 |

### 维度得分

| 因素 | 权重 | 陆家嘴 | 花木 |
|------|------|--------|------|
| 交通便利性 | 25% | 23.75 (95) | 20.00 (80) |
| 成本效益 | 25% | 15.00 (60) | 21.25 (85) |
| 市场潜力 | 25% | 23.75 (95) | 18.75 (75) |
| 竞争环境 | 15% | 6.00 (40) | 10.50 (70) |
| 政策风险 | 15% | 9.00 (90) | 8.50 (85) |

### 雷达图
[API返回的雷达图]
```

---

### STEP 6: 深度分析

**目标**: 竞品分析、客流实测、风险评估

**API调用**:
```python
# 1. 竞品分析
POST /api/location/competitor_analysis
{
  "area": "陆家嘴",
  "category": "咖啡",
  "radius_km": 1
}
→ 返回:
{
  "competitors": [
    {"name": "星巴克", "distance": 200, "rating": 4.5, "reviews": 500, "avg_price": 35},
    {"name": "瑞幸", "distance": 300, "rating": 4.2, "reviews": 300, "avg_price": 15},
    {"name": "Manner", "distance": 150, "rating": 4.6, "reviews": 800, "avg_price": 25}
  ],
  "market_density": "高",
  "gap_opportunity": "中档价位空间"
}

# 2. 客流分析
POST /api/location/foot_traffic
{
  "area": "陆家嘴",
  "address": "东方路999号"
}
→ 返回:
{
  "weekday_avg": 3500,
  "weekend_avg": 2800,
  "peak_hours": [
    {"time": "8:00-9:00", "count": 450},
    {"time": "12:00-13:00", "count": 600},
    {"time": "18:00-19:00", "count": 500}
  ],
  "crowd_profile": "白领为主"
}
```

**输出**:
```markdown
## 深度分析 - 陆家嘴

### 竞品格局
- 星巴克(200米): 4.5星, 500+评论, 均价35元
- 瑞幸(300米): 4.2星, 300+评论, 均价15元
- Manner(150米): 4.6星, 800+评论, 均价25元

### 机会分析
- ✅ 空白: 20-30元中档精品咖啡
- ✅ 差异化: 场景+产品组合

### 客流分析
- 工作日: 3500人次/日
- 周末: 2800人次/日
- 峰值: 早8-9点、午12-1点、晚6-7点
- 人群: 白领为主

### 风险提示
- ⚠️ 竞争激烈，差异化难度大
- ⚠️ 租金高，盈亏平衡点高
```

---

### STEP 7: 决策建议

**目标**: 输出最终建议和报告

**API调用**:
```python
POST /api/location/report
{
  "session_id": "xxx",
  "format": "pptx",  # pptx / pdf / markdown
  "template": "mckinsey",
  "sections": [
    "executive_summary",
    "problem_definition",
    "factor_analysis",
    "scoring_comparison",
    "competitor_analysis",
    "risk_assessment",
    "recommendation"
  ],
  "data": {
    "rankings": [...],
    "competitor_analysis": {...},
    "foot_traffic": {...},
    "risk_analysis": {...}
  }
}
→ 返回: 文件下载链接
```

**输出**:
```markdown
## 决策建议

### 最终推荐: 花木 🏆

| 维度 | 评分 | 说明 |
|------|------|------|
| 综合得分 | 79.0 | 最高 |
| 成本效益 | 85 | 性价比最优 |
| 竞争环境 | 70 | 相对蓝海 |
| 风险可控 | 85 | 政策稳定 |

### 备选: 陆家嘴

| 维度 | 评分 | 说明 |
|------|------|------|
| 综合得分 | 78.5 | 次优 |
| 流量 | 95 | 顶级商圈 |
| 风险 | 60 | 竞争激烈 |

### 下一步行动
1. ✅ 实地踩点花木（重点）
2. ✅ 调研陆家嘴备选
3. ✅ 对接物业获取实际房源
4. ✅ 谈判租金条款

### 风险提示
- 花木: 暂无明显风险
- 陆家嘴: 需关注租约稳定性
```

---

## 🎯 API集成说明

### 数据流向图

```
用户需求
    ↓
STEP 1 → API: initialize
    ↓
STEP 2 → API: factors
    ↓
STEP 3 → API: weight_template / weight_ahp
    ↓
STEP 4 → API: filter + data_batch
    ↓
STEP 5 → API: score + ranking
    ↓
STEP 6 → API: competitor_analysis + foot_traffic
    ↓
STEP 7 → API: report
```

### API Fallback设计

```python
async def call_api(endpoint, data):
    """API调用wrapper，带fallback"""
    try:
        # 尝试调用真实API
        result = await http.post(f"/api/location/{endpoint}", data)
        return result
    except Exception as e:
        # Fallback: 本地模拟计算
        logger.warning(f"API调用失败，使用fallback: {e}")
        return fallback_handlers[endpoint](data)
```

### Fallback场景

| 场景 | Fallback方案 |
|------|--------------|
| API不可用 | 使用默认权重，本地计算评分 |
| 部分数据缺失 | 使用行业平均值填充 |
| 外部API失败 | 提示用户手动输入或跳过 |
| 报告生成失败 | 输出Markdown格式 |

---

## 📚 Reference文件索引

| 文件 | 用途 | 何时加载 |
|------|------|----------|
| quick-guide.md | 快速入门 | 首次询问 |
| factors.md | 因素库详情 | STEP 2 |
| methodology.md | MECE方法论 | STEP 2-3 |
| data-sources.md | 数据源清单 | STEP 4 |
| scoring.md | 评分模型 | STEP 5 |
| layouts.md | 报告布局 | STEP 7 |
| examples.md | 完整案例 | 需要时 |

**按需加载原则**: 只加载当前STEP需要的文件!

---

## 🎓 版本与作者

**版本**: V1.0
**作者**: Qianqian
**基于**: McKinsey Consultant V3.1 方法论
**更新**: 2026-03-02

---

## ⚠️ Claude执行检查清单

- [ ] 首次使用: 是否严格使用4行话术?
- [ ] 问题澄清: 是否只问1-2个关键问题?
- [ ] 流程启动: 是否等待用户明确指示?
- [ ] 按需加载: 是否只加载当前STEP的reference?
- [ ] API调用: 是否优先调用API获取数据?
- [ ] Fallback: API失败时是否使用本地计算?
- [ ] 逐阶段确认: 是否每步都等待用户确认再推进?

---

## 🔄 Fallback: 用户手动输入模式

当API不可用时，引导用户使用数据输入模板：

### 触发条件
- API调用失败
- 用户选择手动输入
- 演示/测试场景

### 执行流程
```
1. 加载 user-input-template.md
2. 引导用户按模板填写
3. 用户提交数据
4. 解析数据 → 进入STEP 5评分
5. 继续后续步骤
```

### 用户话术
```
目前API服务暂不可用，需要您手动提供一些数据来继续分析。

请查看附件模板（references/user-input-template.md），填写您了解的信息。

不想填也可以，只填部分信息我们也可以先做初步分析。
```

### 数据解析
```python
# 用户提交后，解析为标准化格式
user_data = parse_user_input(raw_text)
# 转换为评分矩阵，继续STEP 5
```
