import { createId } from './core';
import type { ListDefinition } from './types';

export type Template = Omit<ListDefinition, 'id' | 'rows'> & { key: string; description: string };

export const templates: Template[] = [
  {
    key: 'quranan',
    title: 'List Qur\'anan',
    description: '30 juz, status selesai, dan footer khataman.',
    columns: ['Juz', 'Nama'],
    statuses: [
      { id: 'done', label: 'Selesai', emoji: '✅' },
      { id: 'special', label: 'Khusus', emoji: '🕋' },
    ],
    footer: 'insyaAllah d khotami Jumat sonten njih🙏',
  },
  {
    key: 'iuran',
    title: 'List Iuran',
    description: 'Daftar orang, nominal, dan status pembayaran.',
    columns: ['No', 'Nama', 'Nominal'],
    statuses: [
      { id: 'paid', label: 'Sudah', emoji: '✅' },
      { id: 'pending', label: 'Belum', emoji: '⏳' },
    ],
  },
  {
    key: 'piket',
    title: 'Jadwal Piket',
    description: 'Jadwal sederhana per hari atau urutan.',
    columns: ['No', 'Nama'],
    statuses: [
      { id: 'ready', label: 'Siap', emoji: '✅' },
      { id: 'pending', label: 'Belum', emoji: '⏳' },
    ],
  },
  {
    key: 'peserta',
    title: 'Daftar Peserta',
    description: 'Nama peserta dengan status kehadiran.',
    columns: ['No', 'Nama'],
    statuses: [
      { id: 'yes', label: 'Hadir', emoji: '✅' },
      { id: 'wait', label: 'Menunggu', emoji: '⏳' },
      { id: 'no', label: 'Tidak', emoji: '❌' },
    ],
  },
];

export function createFromTemplate(template: Template): ListDefinition {
  const count = template.key === 'quranan' ? 30 : 0;
  const rows = Array.from({ length: count }, (_, index) => ({
    id: createId('row'),
    sequence: String(index + 1).padStart(2, '0'),
    name: '',
  }));
  return {
    id: createId('list'),
    title: template.title,
    columns: [...template.columns],
    rows,
    statuses: template.statuses.map((status) => ({ ...status })),
    footer: template.footer,
  };
}

export function createBlankList(): ListDefinition {
  return {
    id: createId('list'),
    title: 'Daftar Baru',
    columns: ['No', 'Nama'],
    rows: [],
    statuses: [
      { id: 'done', label: 'Selesai', emoji: '✅' },
      { id: 'pending', label: 'Menunggu', emoji: '⏳' },
    ],
  };
}
