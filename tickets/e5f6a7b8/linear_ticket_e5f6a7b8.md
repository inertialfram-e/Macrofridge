---
id: e5f6a7b8
title: PowerSync Backend Sync Rules
status: Todo
priority: High
order: 30
created: 2026-03-08
updated: 2026-03-08
links:
  - url: ../linear_ticket_parent_phase2.md
    title: Parent Ticket
---

# Description

## Problem to solve
The PowerSync service needs to know which data each user is allowed to sync to their device to maintain privacy and reduce payload sizes.

## Solution
Define the specific sync rules in the `powersync.yaml` configuration to filter data by `household_id` and `user_id`.

## Implementation Details
- Update the `powersync.yaml` file.
- Define rules for `households`, `users`, `products`, `inventory_items`, and `transactions` to ensure users only sync data belonging to their household.
- Validate that the sync rules correctly parse the authentication tokens.