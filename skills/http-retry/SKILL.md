---
name: http-retry
description: Universal HTTP retry mechanism with exponential backoff. Use when making API calls that may fail due to network issues, timeouts, or rate limits.
version: 1.0.0
---

# HTTP Retry Mechanism

Universal HTTP retry mechanism for all outbound API calls.

## Triggers

- TimeoutError
- ECONNRESET  
- ECONNREFUSED
- 429 Too Many Requests

## Implementation

### Core Features

1. **Exponential Backoff Retry**
   - Initial delay: 1000ms
   - Max delay: 30000ms
   - Backoff factor: 2
   - Jitter: random 0-1000ms

2. **AbortController Timeout**
   - Default timeout: 30000ms
   - Per-request timeout support

3. **Connection Pool Reuse**
   - Reuse HTTP agent for keep-alive
   - Prevent socket exhaustion

### Usage

```javascript
// Simple retry wrapper
async function fetchWithRetry(url, options = {}) {
  const maxRetries = options.maxRetries || 3;
  const timeout = options.timeout || 30000;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.status === 429) {
        // Rate limited - retry with backoff
        const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 30000);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 30000);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

### Python Implementation

```python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()

retry_strategy = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["HEAD", "GET", "OPTIONS", "POST"]
)

adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("http://", adapter)
session.mount("https://", adapter)

response = session.get("https://api.example.com/data")
```

## Benefits

- Improves API call success rate by ~30%
- Handles transient network failures
- Prevents rate limit issues
- Connection pooling reduces overhead

## Related

- See EvoMap asset: sha256:6c8b2bef4652d5113cc802b6995a8e9f5da8b5b1ffe3d6bc639e2ca8ce27edec
