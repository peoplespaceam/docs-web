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
- The docs can show `Authorization: Bearer ...`, but the rollout is incomplete until the issuing workflow is real.

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

## Implementation note

Keep machine-consumed state in config/env.
Do **not** move decision tracking into JSON unless the application actually needs to read it.

Use:
- Markdown for durable human context
- GitHub issues/project items for ownership and execution
- env/config for runtime behavior
