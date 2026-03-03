#!/usr/bin/env python3
"""
HuggingFace 图像生成脚本
"""
import os
import sys
import json
import time
import uuid
import requests
from datetime import datetime

# 配置
HF_API_URL = "https://api-inference.huggingface.co/models/{model}"
DEFAULT_MODEL = "black-forest-labs/FLUX.1-schnell"
OUTPUT_DIR = os.path.expanduser("~/.openclaw/workspace/generated-images")

def query_huggingface(prompt: str, model: str = None, **kwargs) -> bytes:
    """调用 HuggingFace API 生成图像"""
    model = model or DEFAULT_MODEL
    api_url = HF_API_URL.format(model=model)
    
    headers = {"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}
    
    payload = {"inputs": prompt}
    
    # 添加可选参数
    if kwargs.get("negative_prompt"):
        payload["negative_prompt"] = kwargs["negative_prompt"]
    if kwargs.get("parameters"):
        payload.update(kwargs["parameters"])
    
    response = requests.post(api_url, headers=headers, json=payload, timeout=120)
    
    if response.status_code != 200:
        raise Exception(f"API 错误: {response.status_code} - {response.text}")
    
    return response.content

def save_image(image_data: bytes) -> str:
    """保存图像到本地"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    filename = f"img_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}.png"
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    with open(filepath, "wb") as f:
        f.write(image_data)
    
    return filepath

def generate(prompt: str, model: str = None, **kwargs) -> dict:
    """主函数：生成图像"""
    print(f"🎨 正在生成...")
    print(f"   提示词：{prompt}")
    print(f"   模型：{model or DEFAULT_MODEL}")
    
    start_time = time.time()
    
    try:
        image_data = query_huggingface(prompt, model, **kwargs)
        filepath = save_image(image_data)
        elapsed = time.time() - start_time
        
        result = {
            "success": True,
            "filepath": filepath,
            "filename": os.path.basename(filepath),
            "elapsed": f"{elapsed:.1f}秒",
            "model": model or DEFAULT_MODEL,
            "prompt": prompt
        }
        
        print(f"\n✅ 生成完成！")
        print(f"   文件：{filepath}")
        print(f"   耗时：{elapsed:.1f}秒")
        
        return result
        
    except Exception as e:
        error = f"生成失败：{str(e)}"
        print(f"❌ {error}")
        return {"success": False, "error": error}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python generate.py '提示词' [--model 模型名]")
        sys.exit(1)
    
    prompt = sys.argv[1]
    model = None
    
    if "--model" in sys.argv:
        idx = sys.argv.index("--model")
        if idx + 1 < len(sys.argv):
            model = sys.argv[idx + 1]
    
    result = generate(prompt, model)
    print("\n" + json.dumps(result, ensure_ascii=False, indent=2))
