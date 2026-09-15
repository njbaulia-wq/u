import { listDefinitionSchema } from '../validation/schemas';
import type { ListDefinition } from './types';

export function exportList(list: ListDefinition): string {
  return JSON.stringify({ version: 1, list }, null, 2);
}

export function importList(text: string): ListDefinition {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== 'object' || parsed === null || !('list' in parsed)) {
    throw new Error('Format file tidak valid.');
  }
  const result = listDefinitionSchema.safeParse(parsed.list);
  if (!result.success) throw new Error('Data list tidak valid.');
  return result.data;
}
