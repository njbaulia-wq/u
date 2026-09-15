import type { ListDefinition, ListRow, Status } from './types';

export function createId(prefix = 'id'): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}

export function normalizeRows(rows: ListRow[]): ListRow[] {
  return rows.map((row, index) => ({
    ...row,
    sequence: row.sequence || String(index + 1).padStart(2, '0'),
    name: row.name.trim(),
  }));
}

export function withStatus(row: ListRow, statusId?: string): ListRow {
  return { ...row, statusId: statusId || undefined };
}

export function renderWhatsApp(list: ListDefinition): string {
  const lines: string[] = [];
  if (list.title.trim()) lines.push(`*${list.title.trim()}*`);
  if (list.intro?.trim()) lines.push(list.intro.trim());
  if (list.title.trim() || list.intro?.trim()) lines.push('');
  if (list.columns.length) lines.push(`*${list.columns.join('       ')}*`);

  for (const row of normalizeRows(list.rows)) {
    const status = list.statuses.find((item) => item.id === row.statusId);
    const suffix = status ? ` ${status.emoji}` : '';
    const note = row.note?.trim() ? ` — ${row.note.trim()}` : '';
    const label = row.name || '—';
    lines.push(`${row.sequence}.       ${label}${note}${suffix}`);
  }

  if (list.footer?.trim()) {
    lines.push('');
    lines.push(`*${list.footer.trim()}*`);
  }

  return lines.join('\n');
}
