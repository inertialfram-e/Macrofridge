# 🎫 MacroFridge Ticket System Rules

To prevent workspace clutter and maintain a hyper-intelligent development loop, all tickets MUST adhere to these rules.

## 1. Directory Structure
- All ticket-related data lives in the `/tickets` directory.
- **Epics (Parent Tickets):** Stored as `tickets/linear_ticket_parent_phase[N].md`.
- **Atomic Tasks (Child Tickets):** Stored in `tickets/[ticket_hash]/linear_ticket_[ticket_hash].md`.
- **Artifacts:** Research, plans, and reviews for a specific task MUST live inside that task's hash folder.

## 2. Naming Conventions
- Ticket IDs: 8-character hex strings (e.g., `a1b2c3d4`).
- Filenames: `linear_ticket_[id].md`, `research_[date].md`, `plan_[date].md`, `plan_review.md`.

## 3. Atomic Lifecycle
Every implementation ticket must follow the **Pickle Rick Lifecycle**:
1. **Research:** Map reality. No solutioning.
2. **Plan:** Design the specific fix. No magic.
3. **Review:** Architectural and safety approval.
4. **Implement:** Execute the plan.
5. **Refactor:** Delete the slop.

## 4. Linkage
- Every child ticket MUST link back to its parent epic.
- Relative paths should be used: `url: ../linear_ticket_parent_phase[N].md`.

## 5. State Management
- `state.json` tracks the `current_ticket` and the active `step`.
- Do NOT advance the state until the current phase is fully documented and approved.
