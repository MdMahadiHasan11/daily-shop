import { getNewAccessToken } from "@/services/auth/auth.service";
import { deleteCookie, getCookie } from "@/services/auth/token-handlers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

interface FetchOptions extends RequestInit {
  isPublic?: boolean;
}

const serverFetchHelper = async (
  endpoint: string,
  options: FetchOptions = {},
): Promise<Response> => {
  const { headers, isPublic = false, ...restOptions } = options;

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (isPublic) {
    return fetch(`${BACKEND_API_URL}${endpoint}`, {
      headers: baseHeaders,
      ...restOptions,
    });
  }

  const accessToken = await getCookie("accessToken");
  if (accessToken) {
    baseHeaders["Cookie"] = `accessToken=${accessToken}`;
  }

  let response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: baseHeaders,
    ...restOptions,
  });

  if (
    response.status === 401 &&
    endpoint !== "/auth/refresh-token" &&
    endpoint !== "/auth/login"
  ) {
    try {
      const newToken = await getNewAccessToken();

      if (newToken) {
        baseHeaders["Cookie"] = `accessToken=${newToken}`;
        response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
          headers: baseHeaders,
          ...restOptions,
        });
      } else {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
      }
    } catch {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
    }
  }

  return response;
};

export const serverFetch = {
  get: (endpoint: string, options?: FetchOptions) =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, options?: FetchOptions) =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: (endpoint: string, options?: FetchOptions) =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: (endpoint: string, options?: FetchOptions) =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: (endpoint: string, options?: FetchOptions) =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
