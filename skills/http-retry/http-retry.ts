/**
 * HTTP Retry Utility
 */

export class HttpRetryError extends Error {
  lastStatus: number;
  lastResponse: string;
  
  constructor(message: string, lastStatus: number, lastResponse: string) {
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

      if (opts.retryableStatuses.includes(response.status)) {
        const delay = calculateDelay(attempt, opts);
        console.log(`[HTTP Retry] Status ${response.status}, retrying in ${delay}ms...`);
        await sleep(delay);
        continue;
      }

      return response;
    } catch (error: unknown) {
      lastError = error as Error;

      const isRetryable = 
        (error as any).name === 'AbortError' ||
        opts.retryableErrors.some(e => (error as any).message?.includes(e));

      if (!isRetryable || attempt === opts.maxRetries) {
        throw new HttpRetryError(
          `Fetch failed after ${attempt + 1} attempts: ${(error as any).message}`,
          lastResponse?.status ?? 0,
          await lastResponse?.text().catch(() => null) ?? ''
        );
      }

      const delay = calculateDelay(attempt, opts);
      console.log(`[HTTP Retry] Error: ${(error as any).message}, retrying in ${delay}ms...`);
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

export default fetchWithRetry;
