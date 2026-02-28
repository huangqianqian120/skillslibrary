# 访问日志

## 日志文件

访问日志保存在 `logs/visits.jsonl`

## 查看命令

```bash
# 查看所有记录
cat logs/visits.jsonl

# 统计访问量
wc -l logs/visits.jsonl

# 实时查看
tail -f logs/visits.jsonl

# 按页面统计
cat logs/visits.jsonl | jq -r '.page' | sort | uniq -c | sort -rn
```
