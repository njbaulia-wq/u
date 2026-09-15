export type LogLevel = 'info' | 'warn' | 'error';

export function log(level: LogLevel, module: string, requestId: string, message: string, context: Record<string, unknown> = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    module,
    requestId,
    message,
    ...context,
  };
  const sink = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info;
  sink(JSON.stringify(entry));
}
