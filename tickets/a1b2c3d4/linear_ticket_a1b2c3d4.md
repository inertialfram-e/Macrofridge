---
id: a1b2c3d4
title: Setup PowerSync Mobile Client
status: Done
priority: High
order: 20
created: 2026-03-08
updated: 2026-03-08
links:
  - url: ../linear_ticket_parent_phase2.md
    title: Parent Ticket
  - url: ./research_2026-03-08.md
    title: Research Document
  - url: ./research_review.md
    title: Research Review
  - url: ./plan_2026-03-08.md
    title: Implementation Plan
---

# Description

## Problem to solve
The mobile app needs to be able to synchronize data with the backend and store it locally for an offline-first experience.

## Solution
Configure SQLite for local mobile storage and implement the PowerSync bi-directional sync logic in the Expo app.

## Implementation Details
- Install `@powersync/react-native` and SQLite dependencies in `apps/mobile`.
- Configure the PowerSync SDK.
- Connect the PowerSync client to the backend sync service (running on `localhost:8080` for now).
- Establish the local SQLite schema mirroring the required parts of the Postgres schema.