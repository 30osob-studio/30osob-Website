const isDev = import.meta.env.DEV;
const prodBase = import.meta.env.VITE_API_BASE_URL ?? "https://api-ix11.onrender.com";
export const API_BASE_URL = isDev ? "/api" : prodBase;

export function buildApiUrl(path: string): string {
    return path.startsWith("/") ? `${API_BASE_URL}${path}` : `${API_BASE_URL}/${path}`;
}