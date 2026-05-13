# Docs Web Rollout Decisions

_Last updated: 2026-05-13_

This file tracks the remaining product and rollout decisions for `peoplespaceam/docs-web` after the boilerplate cleanup pass.

## Current status

What is already true:
- GraphQL docs now center the embedded GraphiQL explorer.
- Apollo Sandbox handoff copy has been removed from the docs UX.
- MCP copy is env-driven instead of hardcoded as live.
- The site can now safely communicate "not configured yet" without lying.

What is still open:
- MCP auth and token distribution model
- Environment strategy for this docs site
- GraphQL auth onboarding UX
- Scope boundary for this repo/site
- MCP rollout readiness and go-live criteria

## Open decisions

### 1) MCP auth and token issuance

We still need a single operator story for:
- who can mint or provision MCP bearer tokens
- how teammates receive them
- how tokens are rotated or revoked
- whether tokens are human-scoped, environment-scoped, or shared

Why it matters:
- The docs can show `Authorization: Bearer ***`, but the rollout is incomplete until the issuing workflow is real.

### 2) Environment strategy

We need to decide whether this site is:
- single-environment docs with one explicit environment label, or
- a multi-environment docs hub with prod/test/staging switching or separate deployments

Why it matters:
- This changes copy, navigation, deployment shape, and what `VITE_SITE_ENVIRONMENT` really represents.

### 3) GraphQL auth onboarding UX

The current instructions assume the reader can obtain raw `X-Telegram-Init-Data` and paste it manually.

We still need to decide whether to:
- keep that as the default operator path
- add a safer helper flow
- provide a copy-paste example and source-of-truth instructions for obtaining valid auth input

Why it matters:
- The current flow works for insiders, but it is not yet polished onboarding.

### 4) Docs scope boundary

We need to decide whether this repo/site should remain a combined hub for:
- API docs
- MCP rollout docs
- client setup
- prompts / agents / team reuse

Or whether it should be split into:
- a protocol/API docs surface
- a separate operator/team docs surface

Why it matters:
- This affects navigation, audience clarity, and future maintenance cost.

### 5) MCP rollout readiness / live-state criteria

We need an explicit definition for when the MCP section should move from pending to live.

That should include:
- endpoint availability
- auth readiness
- at least one smoke-tested client path
- owner/operator signoff

Why it matters:
- Avoids docs claiming the endpoint is live before the operational path is actually usable.

## Tracking

These decisions should be tracked in GitHub issues so they have ownership and follow-up, not just notes in chat.

Tracked issue set:
- [#2 Define MCP auth and token distribution model for docs-web rollout](https://github.com/peoplespaceam/docs-web/issues/2)
- [#3 Decide docs-web environment strategy (single-env vs multi-env)](https://github.com/peoplespaceam/docs-web/issues/3)
- [#4 Improve GraphQL auth onboarding in docs-web](https://github.com/peoplespaceam/docs-web/issues/4)
- [#5 Decide whether docs-web should split API docs from operator/team docs](https://github.com/peoplespaceam/docs-web/issues/5)
- [#6 Define MCP rollout readiness criteria before marking docs live](https://github.com/peoplespaceam/docs-web/issues/6)

Current labels applied:
- `documentation` on all five issues
- `question` on decision issues: #2, #3, #5, #6
- `enhancement` on implementation-facing issue: #4

## Recommended resolution order

Recommended order of attack:

1. [#3 docs-web environment strategy](https://github.com/peoplespaceam/docs-web/issues/3)
   - This sets the frame for the rest of the site.
   - It determines whether labels, navigation, and deployment assumptions are single-env or multi-env.

2. [#2 MCP auth and token distribution model](https://github.com/peoplespaceam/docs-web/issues/2)
   - This is the main blocker for turning MCP docs from conceptual to operational.
   - Without it, the MCP page can only describe intent, not a real rollout path.

3. [#6 MCP rollout readiness criteria](https://github.com/peoplespaceam/docs-web/issues/6)
   - This should be defined immediately after auth, so "pending" vs "live" is governed by an explicit rule.

4. [#4 GraphQL auth onboarding](https://github.com/peoplespaceam/docs-web/issues/4)
   - Improve the current operator-only flow once the broader environment/auth framing is settled.

5. [#5 docs-web scope split decision](https://github.com/peoplespaceam/docs-web/issues/5)
   - Important, but slightly less blocking than the environment/auth questions.
   - Easier to answer cleanly after the core rollout shape is clearer.

Short version:
- decide **where this site points** first
- decide **how MCP access actually works** second
- decide **when MCP is truly live** third
- polish **GraphQL onboarding** fourth
- revisit **site scope split** fifth

## Project tracking note

These issues should also be added to the appropriate GitHub Project with an initial status such as `Todo` / `Backlog`.

Current blocker:
- the available GitHub token on the authenticated Mac node does **not** have `read:project`, so project discovery/editing is blocked until token scope is refreshed

## Implementation note

Keep machine-consumed state in config/env.
Do **not** move decision tracking into JSON unless the application actually needs to read it.

Use:
- Markdown for durable human context
- GitHub issues/project items for ownership and execution
- env/config for runtime behavior
