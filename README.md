# docs-web

Static **public API documentation** for **PeopleSpaceAM**, intended to deploy at e.g. **`docs.ps.avanesyan.am`**.

- **REST:** [Scalar](https://scalar.com/) API reference from the canonical OpenAPI file in `contracts`.
- **GraphQL:** SDL viewer (syntax-highlighted copy of the canonical schema) plus **link-out** placeholders for a **test** GraphiQL deployment (no third-party embed on this origin by default).
- **gRPC:** Scalar does not replace **grpcui**. This site **links** to a **test** grpcui URL (typically VPN / SSO gated).

## Repo layout

This package lives **next to** `contracts` in the monorepo:

```text
peoplespaceam/
  contracts/
  docs-web/          ← you are here
  platform-api/
  platform-ops/
```

`npm run sync-specs` copies:

| Source (`contracts/…`) | Bundled as (`public/specs/…`) |
|------------------------|--------------------------------|
| `openapi/platform-api/v1/miniapp.yaml` | `miniapp.yaml` |
| `graphql/platform-api/miniapp/v1/schema.graphql` | `miniapp-graphql-v1.graphql` |

## Commands

```bash
npm install
cp .env.example .env   # then edit test URLs
npm run dev            # http://localhost:5173 (or next free port)
npm run build          # output in dist/
npm run preview        # local preview of dist/
```

If `contracts` is not a sibling folder (e.g. nested clone), set **`CONTRACTS_ROOT`** for one-off sync/build:

```bash
CONTRACTS_ROOT=../path/to/contracts npm run build
```

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_BASE_PATH` | Set to `/` or a subpath if the site is not served at domain root. |
| `VITE_MINIAPP_API_TEST_BASE` | Scalar “try it” default host for the Mini App REST API (test gateway / edge URL, **no** trailing slash). |
| `VITE_GRAPHIQL_TEST_URL` | Full URL to **self-hosted** GraphiQL (or similar) pointed at test `POST …/miniapp/graphql/v1`. |
| `VITE_GRPCUI_TEST_URL` | Full URL to **grpcui** for test gRPC (protect this endpoint). |

## Deploying to `docs.ps.avanesyan.am`

1. **CI:** GitHub Actions (`.github/workflows/ci.yml`) checks out **`peoplespaceam/contracts`** into `./contracts`, sets `CONTRACTS_ROOT=contracts`, runs `npm ci && npm run build`, and uploads the **`dist/`** artifact as `docs-web-dist`. Because **`contracts` is private**, you must add a repository secret **`CONTRACTS_REPO_TOKEN`**: a PAT with read access to `peoplespaceam/contracts` (same secret pattern as `platform-api`). The default **`GITHUB_TOKEN` cannot clone sibling private repos** (GitHub returns 404). Create a fine-grained PAT (Contents: Read on `peoplespaceam/contracts`) or a classic PAT with `repo` scope, then: **Settings → Secrets and variables → Actions → New repository secret**, or `printf '%s' "$PAT" | gh secret set CONTRACTS_REPO_TOKEN -R peoplespaceam/docs-web --body -`.
2. **Hosting:** download the artifact (or build locally) and upload **`dist/`** to object storage + CDN, or serve via **Caddy/nginx** `file_server` with SPA fallbacks **disabled** (this site uses fixed `index.html` + `graphql.html` only).

> **Note:** GitHub only runs workflows from the **repository root** `.github/workflows/`. This file is valid when **`docs-web` is its own GitHub repository**. If you keep `docs-web` only as a folder inside a larger monorepo, copy or symlink this workflow to that repo’s root and adjust paths / checkout steps.
3. **CORS:** “Try it” from the browser hits your **test** API origin; that origin must allow browser CORS from `https://docs.ps.avanesyan.am` if you enable client requests from Scalar.

## Node version

`@scalar/api-reference` declares **Node ≥ 22**. Use Node 22+ for dev and CI.

## Relationship to other repos

| Concern | Owner |
|---------|--------|
| Canonical OpenAPI + GraphQL SDL | `contracts` |
| Implementing BFF routes | `platform-api` |
| Edge routing to API + static docs | `platform-ops` |
| Mini app product UI | `tg-miniapp` (separate policy) |

## License

UNLICENSED (match monorepo policy).
