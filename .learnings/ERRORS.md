# Errors

Command failures and integration errors.

---
## [ERR-20260513-001] vite build

**Logged**: 2026-05-13T00:00:00Z
**Priority**: medium
**Status**: resolved
**Area**: docs

### Summary
Build failed after adding new docs data because multiline verify strings in `src/team-data.ts` were emitted as single-quoted literals.

### Error
```
[vite:esbuild] Transform failed with 1 error:
.../src/team-data.ts:79:32: ERROR: Unterminated string literal
```

### Context
- Operation attempted: `npm run build`
- Trigger: first build after generating MCP / clients / prompts / agents pages
- Relevant output: esbuild pointed to `verify` values that contained raw newlines inside single-quoted strings

### Suggested Fix
Use template literals for multiline snippets and re-run the build before checking dist output.

### Metadata
- Reproducible: yes
- Related Files: src/team-data.ts

### Resolution
- **Resolved**: 2026-05-13T17:05:00Z
- **Commit/PR**: b0df4b7
- **Notes**: Rewrote multiline snippet/verify values in `src/team-data.ts`, then rebuilt successfully and deployed the updated docs site.

---
