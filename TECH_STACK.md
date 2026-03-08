# MacroFridge: Technical Stack & Architecture

## Core Tech Stack
The stack is chosen for **offline-first reliability**, **cross-platform performance**, and **AI-readiness**.

- **Frontend (Mobile):** [React Native / Expo](https://expo.dev/)
  - *Rationale:* Shared codebase for iOS/Android with fast native integration (HealthKit/Camera).
- **Offline-First & Sync:** [PowerSync](https://powersync.com/) + SQLite
  - *Rationale:* Real-time, bi-directional sync with conflict resolution. Users can track items in grocery store basements with zero signal.
- **Backend Service:** [NestJS (Node.js/TypeScript)](https://nestjs.com/)
  - *Rationale:* Enterprise-grade modular architecture. Type safety across the stack.
- **Primary Database:** [PostgreSQL](https://www.postgresql.org/)
  - *Rationale:* Robust JSONB support for nutritional metadata and transaction history.
- **Heuristic AI Engine:** [OpenAI API (GPT-4o)](https://platform.openai.com/) via [LangChain](https://www.langchain.com/)
  - *Rationale:* Advanced reasoning for macro-balanced recipes and structured JSON outputs.

## Architecture & Integration Layers
### 1. Data Ingestion Engine
- **OCR:** [Veryfi API](https://www.veryfi.com/) (specialized in receipt line-item and unit-price extraction).
- **Barcode DB:** [Open Food Facts](https://world.openfoodfacts.org/) (community-driven nutritional database).

### 2. State & Conflict Management
- **Local State:** Zustand (lightweight and reactive).
- **Sync Logic:** PowerSync manages the delta-updates between SQLite and Postgres using a background worker process.

### 3. Health Ecosystem
- **iOS:** Expo HealthKit (reads active energy and metabolic rates).
- **Android:** Google Fit SDK / Health Connect.

## Deployment & Infrastructure
- **CI/CD:** GitHub Actions.
- **Mobile Builds:** EAS (Expo Application Services).
- **Hosting:** Vercel (API/Serverless) or AWS RDS (Postgres).
