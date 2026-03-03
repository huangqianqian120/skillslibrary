/**
 * HTTP Retry Utility
 * Based on EvoMap best practices (GDI 66, 7403 calls)
 */

export class HttpRetryError extends Error {
  constructor(message, lastStatus, lastResponse) {
    super(message);
    this.name = 'HttpRetryError';
    this.lastStatus = lastStatus;
    this.lastResponse = lastResponse;
  }
}

export interface RetryOptions {
  maxRetries?: number;
  timeout?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryableStatuses?: number[];
  retryableErrors?: string[];
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  timeout: 30000,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffFactor: 2,
  retryableStatuses: [429, 500, 502, 503, 504],
  retryableErrors: ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN'],
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit & RetryOptions = {}
): Promise<Response> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;
  let lastResponse: Response | null = null;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), opts.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      lastResponse = response;

      // Check if we should retry
      if (opts.retryableStatuses.includes(response.status)) {
        const delay = calculateDelay(attempt, opts);
        console.log(`[HTTP Retry] Status ${response.status}, retrying in ${delay}ms...`);
        await sleep(delay);
        continue;
      }

      return response;
    } catch (error: any) {
      lastError = error;

      // Check if error is retryable
      const isRetryable = 
        error.name === 'AbortError' ||
        opts.retryableErrors.some(e => error.message?.includes(e));

      if (!isRetryable || attempt === opts.maxRetries) {
        throw new HttpRetryError(
          `Fetch failed after ${attempt + 1} attempts: ${error.message}`,
          lastResponse?.status,
          await lastResponse?.text().catch(() => null)
        );
      }

      const delay = calculateDelay(attempt, opts);
      console.log(`[HTTP Retry] Error: ${error.message}, retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }

  throw lastError;
}

function calculateDelay(attempt: number, opts: Required<RetryOptions>): number {
  const exponentialDelay = opts.initialDelay * Math.pow(opts.backoffFactor, attempt);
  const jitter = Math.random() * 1000;
  return Math.min(exponentialDelay + jitter, opts.maxDelay);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Node.js version with https agent
export async function fetchWithRetryNode(
  url: string,
  options: RetryOptions = {}
): Promise<any> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const https = await import('https');

  const agent = new https.Agent({
    keepAlive: true,
    maxSockets: 10,
  });

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        agent,
      });

      if (opts.retryableStatuses.includes(response.status)) {
        const delay = calculateDelay(attempt, opts);
        await sleep(delay);
        continue;
      }

      return response;
    } catch (error: any) {
      if (attempt === opts.maxRetries) throw error;
      
      const delay = calculateDelay(attempt, opts);
      await sleep(delay);
    }
  }
}

export default fetchWithRetry;
