# Safe Start MVP PRD v0.2

## 1. Product Overview

**Product name:** Safe Start（可承受實驗啟動器）  
**Mission:** Prevent irreversible decisions made in anxious states by guiding users into low-risk, stoppable experiments.  
**Positioning:** Psychological-safety-first decision support SaaS (not productivity, not monetization).

### Problem Statement
Users in transitions (career/business/life) often act under stress and urgency, over-commit time/money, and continue too long due to sunk-cost bias.

### MVP Goal
Validate that users can:
1. Complete a State Check before action.
2. Run only one active experiment at a time.
3. Commit to immutable stop conditions and stop earlier with less guilt.
4. Receive gentle rhythm reminders without progress pressure.
5. End with a reflective review and one clear next path.

### Explicit Non-Goals
- Revenue tracking
- Leaderboards
- Social comparison
- Streak check-ins
- Gamified unlock tasks

---

## 2. Target User & JTBD

### Primary User
People in uncertain transitions (approx. 25–45), motivated but mentally overloaded, trying to move forward safely.

### JTBD
When I feel uncertain and urgent, I want to test a small, affordable path with clear stop boundaries, so I avoid irreversible decisions that damage my life rhythm.

---

## 3. Product Principles

1. Safety over speed
2. One active experiment only
3. Pre-commit stopping rules
4. Gentle rhythm, no performance pressure
5. Choice without sales push
6. Calm visual design (high readability, low stress cues)

---

## 4. MVP Features, User Stories, Acceptance Criteria

## Feature A — State Check Questionnaire (Saved History)

### Inputs
- Stress level: low / medium / high
- Weekly available time (hours)
- Affordable budget (currency amount)
- Urgency motive: yes / no
- **Urgency motive source (required if yes):** financial / family / career

### User Stories
- As a user, I want to log my current state before starting, so I make safer decisions.
- As a user, I want to review past state checks, so I can see if I make risky decisions in high-stress periods.

### Acceptance Criteria
- Submission is persisted as a new record each time.
- History view shows all past entries sorted by created time.
- Validation requires all fields.
- If urgency motive = yes, urgency source is mandatory and limited to financial/family/career.

---

## Feature B — Single Active Experiment

### Experiment Fields
- Name
- Type: exploration / test / validation
- Cycle: 7 / 14 / 30 days
- Max investment: time + money
- Status: draft / active / completed / stopped / archived
- Start/end timestamps

### User Stories
- As a user, I want only one active experiment, so I avoid fragmented focus.
- As a user, I want a hard investment cap, so I prevent emotional over-commitment.

### Acceptance Criteria
- System blocks creating/activating another experiment when one is active.
- Cycle only accepts 7/14/30.
- Max time and max money are required positive values.
- New active experiment allowed only after current active becomes completed/stopped/archived.

---

## Feature C — Stop Condition Lock (Immutable Core)

### Required at creation
- Stop Condition
- “Not worth continuing when...” criteria

### Lock Rule
- Core stop fields cannot be edited or deleted after creation.
- Only append-only notes allowed (timestamped).

### User Stories
- As a user, I want to pre-define stopping boundaries, so I don't rationalize escalation later.
- As a user, I want to add observations without rewriting original commitments.

### Acceptance Criteria
- Creation fails if either stop field is empty.
- API forbids update/delete of core stop fields after creation.
- Note entries can be added, never overwritten.
- UI clearly marks locked section with a read-only lock state.

---

## Feature D — Rhythm Lock (Reminder Guardrail)

### Rules
- Max 2 reminder emails per user per calendar week.
- Reminder content only prompts a state check; no progress pressure language.
- If no login for 7 days, dashboard displays: **「你不需要為停止感到內疚」**.
- User can pause all reminders (account-level opt-out).

### User Stories
- As a user, I want gentle reminders, not pressure to “do more.”
- As a user, I want the option to pause reminders entirely.

### Acceptance Criteria
- Weekly reminder count never exceeds 2 per user.
- Email template lint/check blocks banned pressure terms.
- Dashboard shows guilt-relief message when last login > 7 days.
- User setting `reminders_paused=true` suppresses all reminder sends.
- Send attempts are logged with success/failure.

---

## Feature E — Review & Choice (End-of-Experiment Routing)

### End Review Questions
1. Did this experiment harm your life rhythm?
2. Are you clearer about what does **not** fit you?
3. What do you need next: more structure / more space / better judgment?

### Routing (Fixed Logic)
- Need structure → show Brand Course intro + link (informational only)
- Need space (安放) → show Healing intro + link (informational only)
- Need judgment → show consultant contact information (no push)

### User Stories
- As a user, I want a reflective closeout instead of scorekeeping.
- As a user, I want one appropriate next step without sales pressure.

### Acceptance Criteria
- Review prompt appears when experiment enters completed/stopped.
- Routing uses fixed business logic (not admin-configurable).
- Result page has content + links only; no countdown/popup/forced CTA.
- Review responses and route result are stored.

---

## 5. Content Management Scope

### CMS-Editable Content
Admin/CMS can edit:
- Brand Course title/description/link
- Healing title/description/link
- Consultant contact copy + channel links
- Optional localized wording blocks for recommendation pages

### Fixed (Not CMS-Editable)
- Review routing logic
- Safety policy constraints (single active experiment, stop lock, reminder cap)

---

## 6. UX/UI Direction (Enhanced Visual Experience)

### Visual Design Goals
- Calm, soft contrast, breathable spacing
- Strong typography hierarchy for emotional clarity
- Reduced cognitive load (single primary action per screen)

### UX Patterns
- One-step-per-screen forms
- Neutral microcopy (“你可以稍後再決定”)
- Positive stop action label (“停止並保留學習”)
- Lock card pattern for immutable stop conditions

### Accessibility Baseline
- WCAG AA contrast
- Full keyboard flow for primary tasks
- Clear inline errors with plain language

---

## 7. Functional Requirements (MVP)

- Basic auth (email/password)
- State Check create/list/read
- Experiment create/read/status transitions with one-active constraint
- Stop condition immutable lock + append-only notes
- Scheduler-based reminders with weekly cap + pause option
- End review submission + fixed route generation
- CMS-backed recommendation content
- Dashboard with state summary + inactivity support message

---

## 8. Success Metrics

- % users completing State Check within 48h of signup
- % users creating first active experiment
- % experiments with end review completed
- % experiments stopped near pre-set stop conditions
- 7-day return rate (observational only, not gamified)

---

## 9. Final Decisions (Confirmed)

1. Urgency motive is segmented by source (financial/family/career).
2. Review routing uses fixed logic.
3. Users can pause all reminder emails.
4. Brand Course / Healing / Consultant info is CMS editable.
