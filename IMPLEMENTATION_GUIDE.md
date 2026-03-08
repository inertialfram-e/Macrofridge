# MacroFridge: Implementation Guide

## Getting Started
### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (for workspace management)
- [Docker Desktop](https://www.docker.com/) (for Postgres and PowerSync)
- [Expo Go](https://expo.dev/expo-go) (for local mobile testing)

### 2. Monorepo Structure
We use [Turborepo](https://turbo.build/) to manage our apps and packages.
- `apps/mobile`: React Native / Expo application.
- `apps/api`: NestJS backend.
- `packages/shared`: Shared TypeScript interfaces and types.
- `packages/config`: Common ESLint, Prettier, and TSConfig.

### 3. Database Schema Migration
All schema changes must be:
1.  **Backward Compatible:** Mobile clients may not sync instantly.
2.  **Add-Only when possible:** Avoid dropping columns or renaming them without a phased approach.
3.  **Local Sync Compatible:** Ensure the `id` is a UUID (to prevent collisions during offline creation).

## Core Workflows
### OCR Parsing Strategy
1.  **Capture:** User uploads image to S3/Cloudinary.
2.  **Analyze:** API sends URL to Veryfi OCR.
3.  **Map:** Use fuzzy matching (Levenshtein distance) to map OCR text (e.g., "ORNG JCE 1L") to a standardized product from Open Food Facts.
4.  **Confirm:** Present the mapped items to the user for final confirmation before updating inventory.

### Offline-First Conflict Resolution
We use **Last-Write-Wins (LWW)** logic on individual columns.
- Each row in SQLite tracks a `modified_at` timestamp.
- PowerSync handles the diffing. If two users update the same item, the one with the latest timestamp persists.
- For quantity adjustments (e.g., "consumed 1 apple"), we use relative increments/decrements where possible to avoid overwriting current state.

### Heuristic AI Prompt Architecture
The system builds a "Macro Context" prompt:
1.  **Inventory:** List all items + "Use Soon" status.
2.  **Profile:** Current macro targets (P: 150g, C: 200g, F: 60g).
3.  **Constraint:** *"Prioritize Use Soon items even if it means deviating from targets by up to 10%."*
4.  **Output:** JSON schema including: `name`, `ingredients`, `steps`, `macroImpact`.
