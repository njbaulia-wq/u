import assert from 'node:assert/strict';
import test from 'node:test';
import { parseWhatsAppList } from '../.tmp-test/parser.js';
import { renderWhatsApp } from '../.tmp-test/core.js';

test('RED/GREEN: parses numbered WhatsApp rows and statuses', () => {
  const result = parseWhatsAppList('01. Mb Halim\n02. Mb Saroh ✅\n27-28. Mb Zubaidah');
  assert.equal(result.rows.length, 3);
  assert.equal(result.rows[1].name, 'Mb Saroh');
  assert.deepEqual(result.detectedStatuses, ['✅']);
});

test('renderer produces deterministic WhatsApp markup', () => {
  const text = renderWhatsApp({
    id: 'x',
    title: 'LIST TEST',
    columns: ['No', 'Nama'],
    rows: [
      { id: '1', sequence: '01', name: 'Mb Halim' },
      { id: '2', sequence: '02', name: 'Mb Saroh', statusId: 'done' }
    ],
    statuses: [{ id: 'done', label: 'Selesai', emoji: '✅' }],
    footer: 'Selesai',
  });
  assert.match(text, /\*LIST TEST\*/);
  assert.match(text, /02\.\s+Mb Saroh ✅/);
});
