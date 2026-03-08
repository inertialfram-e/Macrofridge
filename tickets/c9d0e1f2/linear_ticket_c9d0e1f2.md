---
id: c9d0e1f2
title: Mobile Inventory CRUD UI
status: Todo
priority: Medium
order: 40
created: 2026-03-08
updated: 2026-03-08
links:
  - url: ../linear_ticket_parent_phase2.md
    title: Parent Ticket
---

# Description

## Problem to solve
Users need a way to view, add, edit, and delete items in their "fridge" (inventory) from the mobile app.

## Solution
Build a React Native UI for inventory management that reads from and writes to the local PowerSync SQLite database.

## Implementation Details
- Create an Inventory List screen displaying current items.
- Create an Add/Edit Item form screen or modal.
- Hook up UI actions to execute SQL mutations via the PowerSync client.
- Implement basic inventory search/filter UI elements.