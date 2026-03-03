# HuggingFace 图像生成

使用 HuggingFace 免费 API 生成 AI 图像。

## 功能

- 🎨 **多种模型** - FLUX、Stable Diffusion、SDXL 等
- 🆓 **免费额度** - 每月约 1000 次调用
- ⚡ **快速生成** - 一般 5-30 秒
- 🎭 **风格多样** - 写实、动漫、像素、艺术

## 支持的模型

| 模型 | 特点 | 推荐场景 |
|------|------|----------|
| **FLUX.1-schnell** | 快速生成 | 日常头像 |
| **stable-diffusion-xl** | 高质量 | 精细作品 |
| **SDXL-Lightning** | 超快 | 快速原型 |
| **damo-vilab/text-to-image** | 基础款 | 简单需求 |

## 使用方法

### 基本生成

```
生成图像
提示词：[描述画面]
模型：[模型名，可选]
```

### 示例

```
生成图像
提示词：a cute pixel art character, green color, mascot style, white background
模型：FLUX.1-schnell
```

### 高级参数

```
生成图像
提示词：...
负面提示词：[避免的元素]
尺寸：[512x512 / 768x768 / 1024x1024]
步数：[20-100]
引导系数：[1-20]
```

## 输出

生成的图像会：
1. 保存到 `workspace/generated-images/`
2. 显示链接
3. 可直接发送/展示

## 配置

```yaml
hf_image_generator:
  api_url: "https://api-inference.huggingface.co/models/{model}"
  default_model: "black-forest-labs/FLUX.1-schnell"
  max_size: 1024
  formats: ["png", "jpeg"]
```

## 使用限制

- 免费用户：~1000次/月
- 生成时间：5-30秒/张
- 尺寸限制：最大 1024x1024

## 示例输出

```
用户：生成图像
提示词：a cute anime girl with green hair, pixel art style, smiling

AI：🎨 正在生成...
   模型：FLUX.1-schnell
   尺寸：1024x1024

✅ 完成！
📁 保存到：generated-images/img_xxx.png
```

## 与其他技能配合

- **像素头像生成** - 固定风格生成小Q头像
- **内容配图** - 为文章生成封面
- **创意素材** - 生成设计灵感
