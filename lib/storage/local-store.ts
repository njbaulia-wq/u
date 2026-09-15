import type { ListDefinition } from '../list-engine/types';
import { listDefinitionSchema } from '../validation/schemas';
import type { ListStorage } from './storage';

const KEY = 'listwa:v1:lists';

export class LocalListStorage implements ListStorage {
  private read(): ListDefinition[] {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.flatMap((value) => {
        const result = listDefinitionSchema.safeParse(value);
        return result.success ? [result.data] : [];
      });
    } catch {
      return [];
    }
  }

  private write(lists: ListDefinition[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(KEY, JSON.stringify(lists));
  }

  async list() { return this.read(); }

  async get(id: string) { return this.read().find((item) => item.id === id) ?? null; }

  async save(list: ListDefinition) {
    const parsed = listDefinitionSchema.parse(list);
    const lists = this.read().filter((item) => item.id !== parsed.id);
    this.write([parsed, ...lists].slice(0, 100));
  }

  async remove(id: string) {
    this.write(this.read().filter((item) => item.id !== id));
  }
}
