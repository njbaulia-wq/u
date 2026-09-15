import { createId } from './core';
import type { ListRow } from './types';

const STATUS_EMOJIS = ['✅', '❌', '⏳', '🕋', '☑️', '❗'];

function extractStatus(text: string): { clean: string; emoji?: string } {
  let clean = text.trim();
  const emoji = STATUS_EMOJIS.find((item) => clean.endsWith(item));
  if (emoji) clean = clean.slice(0, -emoji.length).trim();
  return { clean, emoji };
}

function parseSequence(raw: string, fallback: number): string {
  const normalized = raw.trim().replace(/\s+/g, '');
  return normalized || String(fallback).padStart(2, '0');
}

export type ParsedPaste = {
  rows: ListRow[];
  detectedStatuses: string[];
};

export function parseWhatsAppList(input: string): ParsedPaste {
  const rows: ListRow[] = [];
  const detectedStatuses: string[] = [];
  const lines = input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  for (const line of lines) {
    const match = line.match(/^(?:[•*-]\s*)?([0-9]{1,3}(?:\s*[-–]\s*[0-9]{1,3})?)\s*[.)-]?\s+(.+)$/);
    if (!match) continue;
    const sequence = parseSequence(match[1], rows.length + 1);
    const { clean, emoji } = extractStatus(match[2]);
    if (!clean) continue;
    if (emoji && !detectedStatuses.includes(emoji)) detectedStatuses.push(emoji);
    rows.push({ id: createId('row'), sequence, name: clean, statusId: emoji });
  }

  return { rows, detectedStatuses };
}
