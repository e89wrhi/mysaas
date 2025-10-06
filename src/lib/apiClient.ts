const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Utility to replace path params like ":id"
function buildPath(path: string, params?: Record<string, string | number>) {
  if (!params) return path;
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing param "${key}" for path "${path}"`);
    }
    return encodeURIComponent(String(params[key]));
  });
}

// Utility to build query string from object
function buildQuery(params?: Record<string, string | number | boolean>) {
  if (!params) return '';
  const query = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  }
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

async function apiRequest<TReturn>(
  path: string,
  options?: RequestInit
): Promise<TReturn> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API request failed: ${errorText}`);
  }

  return res.json();
}

export const client = {
  async get<TReturn>(
    path: string,
    pathParams?: Record<string, string | number>,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<TReturn> {
    const fullPath = buildPath(path, pathParams) + buildQuery(queryParams);
    return apiRequest<TReturn>(fullPath);
  },

  async post<TReturn>(
    path: string,
    pathParams?: Record<string, string | number>,
    body?: unknown
  ): Promise<TReturn> {
    const fullPath = buildPath(path, pathParams);
    return apiRequest<TReturn>(fullPath, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  async put<TReturn>(
    path: string,
    pathParams?: Record<string, string | number>,
    body?: unknown
  ): Promise<TReturn> {
    const fullPath = buildPath(path, pathParams);
    return apiRequest<TReturn>(fullPath, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  async delete<TReturn>(
    path: string,
    pathParams?: Record<string, string | number>
  ): Promise<TReturn> {
    const fullPath = buildPath(path, pathParams);
    return apiRequest<TReturn>(fullPath, { method: 'DELETE' });
  },
};
