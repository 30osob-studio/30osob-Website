const CACHE_PREFIX = "app_cache_";
const CACHE_EXPIRY_PREFIX = "app_cache_expiry_";
const CACHE_TTL = 24 * 60 * 60 * 1000;

export function getCachedData<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    const expiry = localStorage.getItem(`${CACHE_EXPIRY_PREFIX}${key}`);

    if (!cached || !expiry) return null;

    const expiryTime = parseInt(expiry, 10);
    if (Date.now() > expiryTime) {
      clearCache(key);
      return null;
    }

    return JSON.parse(cached) as T;
  } catch {
    return null;
  }
}

export function setCachedData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
    localStorage.setItem(
      `${CACHE_EXPIRY_PREFIX}${key}`,
      String(Date.now() + CACHE_TTL)
    );
  } catch {
  }
}

export function clearCache(key: string): void {
  try {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    localStorage.removeItem(`${CACHE_EXPIRY_PREFIX}${key}`);
  } catch {
  }
}