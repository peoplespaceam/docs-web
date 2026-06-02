# docs-web

PeopleSpaceAM platform docs site.

## What it serves

- **REST:** embedded **Scalar** reference from the canonical OpenAPI contract.
- **GraphQL:** a polished SDL page plus an embedded **GraphiQL** explorer for live requests.
- **gRPC:** synced `.proto` browser plus optional handoff to **grpcui**.

This repo is intentionally self-contained at deploy time: checked-in specs are committed under `public/specs/`, and `scripts/sync-specs.mjs` refreshes them from the `platform/contracts` checkout when that checkout is available (sibling `../platform/contracts`, or set `CONTRACTS_ROOT`).

## Synced contract inputs

- `openapi/platform-api/v1/miniapp.yaml` → `public/specs/miniapp.yaml`
- `graphql/platform-api/miniapp/v1/schema.graphql` → `public/specs/miniapp-graphql-v1.graphql`
- `proto/**/*.proto` → `public/specs/proto/**`
- generated manifest → `public/specs/proto-index.json`

## Environment variables

- `VITE_SITE_TITLE`
- `VITE_SITE_SUBTITLE`
- `VITE_SITE_ENVIRONMENT`
- `VITE_MINIAPP_API_BASE` (preferred) or `VITE_MINIAPP_API_TEST_BASE`
- `VITE_GRAPHQL_HTTP_URL`
- `VITE_GRPCUI_URL` (preferred) or `VITE_GRPCUI_TEST_URL`
- `VITE_MCP_SERVER_URL`
- `VITE_BASE_PATH`

## Recommendation

Use this stack:

- **Scalar** for REST
- embedded **GraphiQL** for interactive GraphQL
- **grpcui** for live gRPC exploration
- this site itself as the protocol hub and static contract host

I do **not** recommend adding SpectaQL immediately unless you specifically want a second generated GraphQL reference alongside the SDL + explorer flow.
