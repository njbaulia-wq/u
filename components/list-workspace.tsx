'use client';

import {
  Check,
  ChevronDown,
  Clipboard,
  Copy,
  Download,
  FilePlus2,
  Import,
  Menu,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  WandSparkles,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createBlankList, createFromTemplate, templates } from '@/lib/list-engine/templates';
import { parseWhatsAppList } from '@/lib/list-engine/parser';
import { renderWhatsApp } from '@/lib/list-engine/core';
import { exportList, importList } from '@/lib/list-engine/transfer';
import { LocalListStorage } from '@/lib/storage/local-store';
import type { ListDefinition, ListRow } from '@/lib/list-engine/types';

const storage = new LocalListStorage();

function sampleList(): ListDefinition {
  const list = createFromTemplate(templates[0]);
  const names = ['Mb Halim', 'Mb Saroh Pkl', 'Mb Aminah', 'Mb Hamidah', 'Mb Maimunah', 'Mb Izul', 'Mb Maemanah', 'Mb Farida', 'Mb Isah', 'Mb Munfadhilah'];
  return {
    ...list,
    title: "LIST QUR'ANAN KHUSUS KAGEM ALM BPK KYAI SUTARDI",
    intro: 'Juz       Nama',
    rows: list.rows.map((row, index) => ({ ...row, name: names[index] ?? '', statusId: index === 3 ? 'special' : index === 20 ? 'done' : undefined })),
  };
}

export function ListWorkspace({ initialTemplateKey }: { initialTemplateKey?: string } = {}) {
  const initialTemplate = initialTemplateKey ? templates.find((item) => item.key === initialTemplateKey) : undefined;
  const [list, setList] = useState<ListDefinition>(() => initialTemplate ? createFromTemplate(initialTemplate) : sampleList());
  const [saved, setSaved] = useState(true);
  const [smartPasteOpen, setSmartPasteOpen] = useState(false);
  const [pasteValue, setPasteValue] = useState('');
  const [templateOpen, setTemplateOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [mobilePreview, setMobilePreview] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    storage.get(list.id).then((existing) => {
      if (active && existing) setList(existing);
    });
    return () => { active = false; };
  }, [list.id]);

  useEffect(() => {
    if (!list.id) return;
    setSaved(false);
    const timer = window.setTimeout(() => {
      storage.save(list).then(() => setSaved(true));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [list]);

  const rendered = useMemo(() => renderWhatsApp(list), [list]);
  const filled = list.rows.filter((row) => row.name.trim()).length;

  function patchRow(id: string, patch: Partial<ListRow>) {
    setList((current) => ({ ...current, rows: current.rows.map((row) => row.id === id ? { ...row, ...patch } : row) }));
  }

  function addRow() {
    setList((current) => ({
      ...current,
      rows: [...current.rows, { id: crypto.randomUUID(), sequence: String(current.rows.length + 1).padStart(2, '0'), name: '' }],
    }));
  }

  function deleteRow(id: string) {
    setList((current) => ({ ...current, rows: current.rows.filter((row) => row.id !== id) }));
  }

  function applyPaste() {
    const parsed = parseWhatsAppList(pasteValue);
    if (!parsed.rows.length) {
      setToast('Tidak menemukan baris bernomor. Coba format 01. Nama.');
      return;
    }
    setList((current) => ({
      ...current,
      rows: parsed.rows.map((row) => ({
        ...row,
        statusId: current.statuses.find((status) => status.emoji === parsed.detectedStatuses[0])?.id,
      })),
    }));
    setSmartPasteOpen(false);
    setPasteValue('');
    setToast(`${parsed.rows.length} baris berhasil diimpor.`);
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(rendered);
    setToast('Format WhatsApp tersalin.');
  }

  function newList(templateKey?: string) {
    const next = templateKey ? createFromTemplate(templates.find((item) => item.key === templateKey) ?? templates[0]) : createBlankList();
    setList(next);
    setTemplateOpen(false);
  }

  function handleImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = importList(String(reader.result));
        setList(imported);
        setToast('List berhasil diimpor.');
      } catch {
        setToast('File JSON tidak valid.');
      }
    };
    reader.readAsText(file);
  }

  function downloadJSON() {
    const blob = new Blob([exportList(list)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${list.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'list'}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark">L</div><div><strong>ListWA</strong><span>list builder</span></div></div>
        <div className="top-actions">
          <button className="ghost-button hide-mobile" onClick={() => setTemplateOpen((v) => !v)}><FilePlus2 size={16} /> Template</button>
          <button className="ghost-button" onClick={() => setSmartPasteOpen(true)}><WandSparkles size={16} /> Smart Paste</button>
          <button className="primary-button" onClick={copyOutput}><Copy size={16} /> Salin WhatsApp</button>
        </div>
      </header>

      <section className="workbar">
        <div className="breadcrumbs"><span>My Lists</span><ChevronDown size={14} /><strong>{list.title}</strong></div>
        <div className="workbar-actions"><span className="save-state"><span className={`save-dot ${saved ? 'ok' : ''}`} />{saved ? 'Tersimpan' : 'Menyimpan…'}</span><button className="icon-button"><MoreHorizontal size={18} /></button></div>
      </section>

      <section className="mobile-tabs">
        <button className={!mobilePreview ? 'active' : ''} onClick={() => setMobilePreview(false)}>Editor</button>
        <button className={mobilePreview ? 'active' : ''} onClick={() => setMobilePreview(true)}>Preview</button>
      </section>

      <div className="workspace">
        {!mobilePreview && <section className="editor-panel">
          <div className="section-head">
            <div><div className="eyebrow">LIST</div><h1>Editor</h1></div>
            <div className="head-actions"><button className="icon-button" title="Import JSON" onClick={() => fileRef.current?.click()}><Import size={16} /></button><button className="icon-button" title="Export JSON" onClick={downloadJSON}><Download size={16} /></button></div>
          </div>

          <div className="title-block">
            <input className="title-input" value={list.title} onChange={(e) => setList({ ...list, title: e.target.value })} placeholder="Judul list" />
            <textarea className="subtitle-input" value={list.intro ?? ''} onChange={(e) => setList({ ...list, intro: e.target.value })} placeholder="Kalimat pembuka (opsional)" rows={2} />
          </div>

          <div className="list-toolbar">
            <div><span className="count-chip">{filled}/{list.rows.length} terisi</span><span className="muted">• edit langsung di tabel</span></div>
            <button className="secondary-button" onClick={addRow}><Plus size={16} /> Tambah</button>
          </div>

          <div className="table-wrap">
            <table><thead><tr><th className="seq-col">No.</th><th>Nama</th><th>Status</th><th className="action-col" /></tr></thead>
              <tbody>
                {list.rows.map((row) => (
                  <tr key={row.id}>
                    <td><input className="cell-input sequence" value={row.sequence} onChange={(e) => patchRow(row.id, { sequence: e.target.value })} /></td>
                    <td><input className="cell-input name" value={row.name} onChange={(e) => patchRow(row.id, { name: e.target.value })} placeholder="Nama peserta" /></td>
                    <td>
                      <select className="status-select" value={row.statusId ?? ''} onChange={(e) => patchRow(row.id, { statusId: e.target.value || undefined })}>
                        <option value="">—</option>{list.statuses.map((status) => <option key={status.id} value={status.id}>{status.emoji} {status.label}</option>)}
                      </select>
                    </td>
                    <td><button className="row-delete" aria-label="Hapus baris" onClick={() => deleteRow(row.id)}><Trash2 size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!list.rows.length && <div className="empty-table"><Clipboard size={22} /><strong>Belum ada item</strong><span>Tambahkan baris atau gunakan Smart Paste.</span><button className="secondary-button" onClick={addRow}><Plus size={16} /> Tambah baris</button></div>}
          </div>

          <div className="footer-editor"><label>Footer</label><textarea value={list.footer ?? ''} onChange={(e) => setList({ ...list, footer: e.target.value })} placeholder="Catatan penutup atau informasi tambahan…" rows={2} /></div>

          <div className="status-editor">
            <div className="footer-row"><div><label>Status</label><span className="muted">Gunakan status untuk menandai progres tanpa mengetik emoji manual.</span></div><button className="secondary-button" onClick={() => setList({ ...list, statuses: [...list.statuses, { id: crypto.randomUUID(), label: 'Status baru', emoji: '•' }] })}><Plus size={16} /> Status</button></div>
            <div className="status-list">{list.statuses.map((status) => <div className="status-item" key={status.id}><input value={status.emoji} onChange={(e) => setList({ ...list, statuses: list.statuses.map((item) => item.id === status.id ? { ...item, emoji: e.target.value } : item) })} /><input value={status.label} onChange={(e) => setList({ ...list, statuses: list.statuses.map((item) => item.id === status.id ? { ...item, label: e.target.value } : item) })} /></div>)}</div>
          </div>
        </section>}

        {mobilePreview && <PreviewPane rendered={rendered} onCopy={copyOutput} />}

        {!mobilePreview && <PreviewPane rendered={rendered} onCopy={copyOutput} />}
      </div>

      <footer className="footer-bar"><span>Local-first • data tersimpan di browser ini</span><button className="footer-link" onClick={() => setList(createBlankList())}><RotateCcw size={13} /> Reset</button><button className="footer-link" onClick={() => setMobilePreview(true)}>Preview mobile</button></footer>

      {templateOpen && <div className="popover"><div className="popover-head"><strong>Pilih template</strong><button className="icon-button" onClick={() => setTemplateOpen(false)}><X size={15} /></button></div>{templates.map((template) => <button className="template-item" key={template.key} onClick={() => newList(template.key)}><div><strong>{template.title}</strong><span>{template.description}</span></div><ChevronDown size={15} className="rotate" /></button>)}</div>}

      {smartPasteOpen && <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><div className="eyebrow">SMART PASTE</div><h2>Tempel list lama</h2><p>Tempel isi WhatsApp, lalu ListWA akan memecah nomor, nama, rentang, dan emoji status.</p></div><button className="icon-button" onClick={() => setSmartPasteOpen(false)}><X size={18} /></button></div><textarea className="paste-area" autoFocus value={pasteValue} onChange={(e) => setPasteValue(e.target.value)} placeholder={'01. Mb Halim\n02. Mb Saroh ✅\n03. Mb Aminah'} /><div className="modal-actions"><button className="ghost-button" onClick={() => setPasteValue('')}>Kosongkan</button><button className="primary-button" onClick={applyPaste}>Import ke editor</button></div></div></div>}

      <input ref={fileRef} hidden type="file" accept="application/json" onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
      {toast && <button className="toast" onClick={() => setToast('')}><Check size={15} /> {toast}</button>}
    </main>
  );
}

function PreviewPane({ rendered, onCopy }: { rendered: string; onCopy: () => void }) {
  return <aside className="preview-panel"><div className="section-head"><div><div className="eyebrow">LIVE PREVIEW</div><h2>WhatsApp</h2></div><button className="secondary-button" onClick={onCopy}><Copy size={15} /> Salin</button></div><div className="phone-frame"><div className="phone-header"><span className="avatar">W</span><div><strong>WhatsApp</strong><small>siap ditempel</small></div></div><pre className="whatsapp-copy">{rendered || 'Mulai isi list di sebelah kiri…'}</pre></div><div className="preview-tip"><span>Tip</span><p>Format *bold* akan tetap terbaca saat ditempel ke WhatsApp.</p></div></aside>;
}
