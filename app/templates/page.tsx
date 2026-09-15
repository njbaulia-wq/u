'use client';

import { useRouter } from 'next/navigation';
import { templates } from '@/lib/list-engine/templates';

export default function TemplatesPage() {
  const router = useRouter();
  return (
    <main style={{ minHeight: '100vh', padding: 32, maxWidth: 960, margin: '0 auto' }}>
      <button className="ghost-button" onClick={() => router.push('/')}>← Kembali</button>
      <h1 style={{ fontSize: 32, margin: '28px 0 8px' }}>Template List</h1>
      <p style={{ color: '#6b7280', marginBottom: 24 }}>Template siap edit untuk kebutuhan yang berulang.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {templates.map((template) => (
          <button key={template.key} className="template-item" onClick={() => router.push(`/?template=${template.key}`)}>
            <div><strong>{template.title}</strong><span>{template.description}</span></div>
          </button>
        ))}
      </div>
    </main>
  );
}
