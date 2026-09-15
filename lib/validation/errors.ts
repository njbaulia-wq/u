export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number = 500,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function toErrorResponse(error: unknown, requestId: string) {
  if (error instanceof AppError) {
    return {
      error: { code: error.code, message: error.message, details: error.details ?? null },
      requestId,
      status: error.status,
    };
  }
  return {
    error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan internal.' },
    requestId,
    status: 500,
  };
}
