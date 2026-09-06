/* eslint-disable @typescript-eslint/no-explicit-any */

export type TPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TMeta = {
  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number; // Updated to match your API response (totalPages instead of totalPage)
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  hasMore?: boolean;
  nextCursor?: string | null;
  timestamp?: string; // Added to capture metadata timestamps
};

export type TErrorDetails = {
  method?: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
};

export type TErrorContext = {
  resource?: string;
  identifier?: string;
};

export type TError = {
  success: boolean;
  message: string;
  code?: string;
  timestamp?: string;
  path?: string;
  details?: TErrorDetails;
  stack?: string;
  context?: TErrorContext;
  // Fallback for wrapped errors
  data?: {
    message: string;
    success?: boolean;
    error?: unknown;
  };
  status?: number;
};

export type TResponse<T> = {
  success: boolean;
  statusCode?: number;
  type?: string;
  message: string;
  data?: T;
  error?: TError;
  metadata?: TMeta;
  meta?: TMeta;
};

export type TArgsParam = Record<string, any>;
