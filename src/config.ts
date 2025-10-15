export const API_BASE_URL = "/api";

export function buildApiUrl(path: string): string {
    return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
}