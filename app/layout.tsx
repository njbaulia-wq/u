import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ListWA — Buat list rapi untuk WhatsApp',
  description: 'Buat, rapikan, dan salin daftar siap kirim ke WhatsApp.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
