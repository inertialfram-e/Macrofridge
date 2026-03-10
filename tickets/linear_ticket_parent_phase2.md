---
id: parent-macrofridge-phase2
title: "[Epic] MacroFridge Phase 2: Offline-First Inventory"
status: Done
priority: High
order: 20
created: 2026-03-08
updated: 2026-03-08
links:
  - url: ./linear_ticket_parent.md
    title: Phase 1 Parent Ticket
  - url: ../TODO.md
    title: Roadmap
---

# Description

## Problem to solve
Implement the synchronization layer and core inventory management features to enable multiple household members to track groceries offline and sync when online.

## Solution
Implement a robust Postgres schema, PowerSync sync rules, and a React Native inventory UI with SQLite persistence.

## Implementation Details
- Postgres Schema (Users, Households, Inventory).
- PowerSync Sync Rules & Client Integration.
- Inventory CRUD UI.
- Household membership logic.
