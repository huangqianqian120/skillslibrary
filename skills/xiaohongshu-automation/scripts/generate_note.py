#!/usr/bin/env python3
"""
小红书内容生成器
使用 LLM 生成博物馆/文博/文物相关笔记
"""

import json
import subprocess
import sys

def generate_with_llm(keyword, style='story'):
    """调用 OpenClaw LLM 生成内容"""
    
    prompts = {
        'story': f'''请为小红书写一篇关于"{keyword}"的笔记。

要求：
- 标题吸引人，带2-3个emoji
- 正文200-300字，亲切自然
- 开头抓人眼球，用"姐妹们！"或"救命！"开头
- 中间分享1-2个有趣故事或冷知识
- 结尾引导互动（提问、评论区见）
- 加上5-8个相关话题标签

格式：
# 标题

正文...

#话题1 #话题2 #话题3''',
        
        'guide': f'''请写一篇关于"{keyword}"的攻略型小红书笔记。

要求：
- 标题带数字和emoji（如"3个必去理由"）
- 正文200-300字，实操性强
- 包含具体建议和tips
- 语言轻松活泼
- 结尾引导收藏和关注

格式：
# 标题

正文...

#话题标签'''
    }
    
    prompt = prompts.get(style, prompts['story'])
    
    # 调用 OpenClaw LLM
    result = subprocess.run(
        ['npx', 'openclaw', 'message', '--message', prompt, '--json'],
        capture_output=True, text=True, timeout=60
    )
    
    if result.returncode == 0 and result.stdout.strip():
        try:
            response = json.loads(result.stdout)
            if isinstance(response, dict):
                return response.get('message', response.get('text', str(response)))
            return str(response)
        except:
            return result.stdout.strip()
    else:
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate_note.py <keyword> [style]")
        print("style: story (default) or guide")
        return
    
    keyword = sys.argv[1]
    style = sys.argv[2] if len(sys.argv) > 2 else 'story'
    
    print(f"\n🎨 正在为「{keyword}」生成「{style}」风格笔记...\n")
    
    content = generate_with_llm(keyword, style)
    
    if content:
        print("=" * 60)
        print(content)
        print("=" * 60)
        
        # 保存到文件
        filename = f"{keyword}_{style}.txt"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\n💾 已保存到: {filename}")
    else:
        print("❌ 生成失败")

if __name__ == '__main__':
    main()
