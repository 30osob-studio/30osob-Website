export const API_BASE_URL = "/api";

export function buildApiUrl(path: string): string {
    if (!path.startsWith("/")) {
        return `${API_BASE_URL}/${path}`;
    }
    return `${API_BASE_URL}${path}`;
}