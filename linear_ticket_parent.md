---
id: parent-macrofridge
title: "[Epic] MacroFridge Phase 1: Foundation"
status: Done
priority: High
order: 10
created: 2026-03-08
updated: 2026-03-08
links:
  - url: ./VISION.md
    title: Vision
  - url: ./TODO.md
    title: Roadmap
---

# Description

## Problem to solve
Initialize the core infrastructure for MacroFridge, including the monorepo, mobile/API apps, and infrastructure.

## Solution
Implement a Turborepo-based monorepo containing a React Native/Expo app, a NestJS API, and shared configuration.

## Implementation Details
- Initialize Turborepo.
- Scaffold apps/mobile and apps/api.
- Configure shared ESLint/Prettier/TSConfig.
- Set up Docker for Postgres and PowerSync.
- Implement Auth.
