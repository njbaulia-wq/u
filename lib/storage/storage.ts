import type { ListDefinition } from '../list-engine/types';

export interface ListStorage {
  list(): Promise<ListDefinition[]>;
  get(id: string): Promise<ListDefinition | null>;
  save(list: ListDefinition): Promise<void>;
  remove(id: string): Promise<void>;
}
