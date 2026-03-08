# 🥒 MacroFridge

**MacroFridge** is a mobile-first, offline-ready application for shared household inventory and nutritional optimization. It uses a heuristic AI engine to prioritize ingredients nearing expiration and aligns them with user macro profiles to reduce food waste.

## 🚀 Phase 1: Foundation (COMPLETED)
The core infrastructure is live:
- **Monorepo:** Managed via Turborepo and pnpm.
- **Mobile:** Expo (React Native) app scaffolded with Supabase Auth.
- **API:** NestJS backend with JWT verification and protected routes.
- **Infrastructure:** Docker Compose setup for PostgreSQL and PowerSync.
- **Shared Config:** Centralized ESLint, Prettier, and TypeScript presets.

## 🏗️ Architecture
- **Frontend:** React Native / Expo
- **Backend:** NestJS (Node.js)
- **Database:** PostgreSQL (Remote) + SQLite (Local via PowerSync)
- **Sync Layer:** PowerSync for bi-directional, offline-first synchronization.
- **Auth:** Supabase Auth (JWT-based).
- **AI Engine:** OpenAI GPT-4o for heuristic recipe generation (Phase 4).

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker Desktop](https://www.docker.com/)
- [Expo Go](https://expo.dev/expo-go) (for mobile testing)

### Setup
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Macrofridge
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment:**
   Copy `.env.example` to `.env` and fill in your Supabase and Database credentials.

4. **Start Infrastructure:**
   ```bash
   docker compose up -d
   ```

5. **Run Development Mode:**
   ```bash
   pnpm dev
   ```

## 🗺️ Roadmap
Detailed progress can be tracked in [TODO.md](./TODO.md).
- **Phase 2:** Offline-First Inventory & Shared State.
- **Phase 3:** Data Ingestion (Barcode/OCR).
- **Phase 4:** Heuristic AI Recipe Engine.
- **Phase 5:** Health Ecosystem Integration (Apple Health / Google Fit).
- **Phase 6:** Polish & Launch.

## 📄 Documentation
- [VISION.md](./VISION.md) - Product Strategy & North Star.
- [TECH_STACK.md](./TECH_STACK.md) - Detailed Architecture.
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Developer Workflow.
