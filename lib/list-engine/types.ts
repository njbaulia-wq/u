export type Status = {
  id: string;
  label: string;
  emoji: string;
};

export type ListRow = {
  id: string;
  sequence: string;
  name: string;
  statusId?: string;
  note?: string;
};

export type ListDefinition = {
  id: string;
  title: string;
  intro?: string;
  columns: string[];
  rows: ListRow[];
  statuses: Status[];
  footer?: string;
};
