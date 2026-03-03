# HuggingFace 图像生成技能

## 快速配置

### 1. 获取 HuggingFace Token

1. 访问 https://huggingface.co/settings/tokens
2. 点击 "New token"
3. 选择 "Read" 权限
4. 复制 token

### 2. 设置环境变量

```bash
# 临时设置（当前终端）
export HF_TOKEN="hf_xxxxxxxxxxxx"

# 永久设置（添加到 ~/.zshrc 或 ~/.bashrc）
echo 'export HF_TOKEN="hf_xxxxxxxxxxxx"' >> ~/.zshrc
source ~/.zshrc
```

### 3. 测试生成

```bash
cd skills/hf-image-generator/scripts
python generate.py "a cute pixel art character, green color"
```

## 免费额度

- **免费用户**：约 1000 次/月
- **企业用户**：无限
- 生成速度：5-30 秒/张

## 推荐模型

| 模型 | 特点 | 速度 |
|------|------|------|
| `FLUX.1-schnell` | 快速、高质量 | ⚡⚡⚡ |
| `stable-diffusion-xl` | 精细 | ⚡⚡ |
| `SDXL-Lightning` | 超快 | ⚡⚡⚡⚡ |

## 示例

```bash
# 使用 FLUX 模型（默认）
python generate.py "a cute anime girl with green hair, pixel art"

# 使用 SDXL 模型
python generate.py "cyberpunk city" --model stabilityai/stable-diffusion-xl-base-1.0

# 带负面提示词
python generate.py "portrait of a woman" --model FLUX.1-schnell
```

## 输出位置

生成的图像保存在：
```
~/.openclaw/workspace/generated-images/
```

## 常见问题

### Q: 报 401 错误？
A: HF_TOKEN 未正确设置或 token 已过期

### Q: 生成很慢？
A: 免费时段高峰期会慢，建议避开高峰

### Q: 图像模糊？
A: 尝试提高步数或使用 SDXL 模型
