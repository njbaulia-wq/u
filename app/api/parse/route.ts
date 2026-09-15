import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { parseWhatsAppList } from '@/lib/list-engine/parser';
import { log } from '@/lib/logger';
import { AppError, toErrorResponse } from '@/lib/validation/errors';
import { parseRequestSchema } from '@/lib/validation/schemas';

export async function POST(request: Request) {
  const requestId = request.headers.get('x-request-id') || randomUUID();
  try {
    const body: unknown = await request.json();
    const input = parseRequestSchema.safeParse(body);
    if (!input.success) throw new AppError('INVALID_INPUT', 'Teks Smart Paste tidak valid.', 400, input.error.flatten());
    const result = parseWhatsAppList(input.data.text);
    log('info', 'api.parse', requestId, 'smart paste parsed', { rows: result.rows.length });
    return NextResponse.json({ ...result, requestId }, { headers: { 'x-request-id': requestId } });
  } catch (error) {
    log('error', 'api.parse', requestId, 'smart paste failed', { error: error instanceof Error ? error.message : String(error) });
    const response = toErrorResponse(error, requestId);
    return NextResponse.json(response, { status: response.status, headers: { 'x-request-id': requestId } });
  }
}
