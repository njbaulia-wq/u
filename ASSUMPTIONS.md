# Assumptions

1. **The intended README is not available as an attached/library file.** I use the product requirements established in the conversation as the source of truth and keep this assumption explicit rather than inventing an unseen PRD.
2. **MVP is local-first.** This makes the first-use experience zero-setup and usable by non-technical users. Cloud persistence is isolated behind an adapter for a later Supabase switch.
3. **WhatsApp output is copy-first, not auto-send.** This avoids WhatsApp API credentials, policy dependencies, and accidental messaging side effects.
4. **Smart Paste is deterministic.** It handles the common numbered-list shapes from the stated use case; AI parsing is deferred to avoid nondeterministic behavior and operating cost.
5. **Templates are configuration, not separate feature tables.** This keeps the list engine generic for Qur'anan, iuran, piket, peserta, donation, inventory, etc.
6. **No irreversible database migration is needed in this MVP.** Therefore the irreversible gate is not reached.
7. **Production build verification is environment-limited.** npm registry installation timed out in the execution environment, so source-level checks and static review are performed, but a final `next build` cannot honestly be claimed as executed here.
