# MacroFridge: Roadmap & Task List

## Phase 1: Foundation (Month 1)
- [ ] Initialize Turborepo (monorepo).
- [ ] Scaffold Expo mobile application (`apps/mobile`).
- [ ] Scaffold NestJS API (`apps/api`).
- [ ] Configure ESLint/Prettier/TypeScript across workspace.
- [ ] Set up Docker for Postgres and PowerSync service.
- [ ] Implement core Auth (Clerk or Supabase Auth).

## Phase 2: Offline-First Inventory (Month 2)
- [ ] Configure SQLite for local mobile storage.
- [ ] Implement PowerSync bi-directional sync logic.
- [ ] Build Inventory CRUD (Add, Edit, Delete).
- [ ] Household creation and member invitation flows.
- [ ] Implement basic inventory search/filter.

## Phase 3: Data Ingestion (Month 3)
- [ ] Camera integration for barcode scanning.
- [ ] Integrate Open Food Facts API for barcode nutritional lookup.
- [ ] Implement receipt photo capture UI.
- [ ] Connect Veryfi OCR to parse receipt line items.
- [ ] Logic for mapping OCR strings to nutritional products.

## Phase 4: Intelligence Engine (Month 4)
- [ ] Expiry date heuristic (auto-flagging "Use Soon" items).
- [ ] Build Heuristic Recipe Engine (OpenAI prompt construction).
- [ ] Macro-balancing logic (prioritizing waste reduction).
- [ ] Recipe detail view with automated inventory deduction.

## Phase 5: Health & Ecosystem (Month 5)
- [ ] Apple HealthKit integration (Energy/TDEE).
- [ ] Google Fit / Health Connect integration.
- [ ] Dynamic macro budget adjustments based on activity.
- [ ] Beta release (TestFlight / Google Play Internal).

## Phase 6: Polish & Launch (Month 6)
- [ ] Performance audit (cold starts, sync latency).
- [ ] Security audit (API protection, data privacy).
- [ ] Final UI/UX polish (micro-interactions).
- [ ] Production launch on App Store and Google Play.
