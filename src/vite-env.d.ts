/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string;
  readonly VITE_SITE_TITLE: string;
  readonly VITE_SITE_SUBTITLE: string;
  readonly VITE_SITE_ENVIRONMENT: string;
  readonly VITE_MINIAPP_API_BASE: string;
  readonly VITE_GRAPHQL_HTTP_URL: string;
  readonly VITE_GRAPHQL_EXPLORER_URL: string;
  readonly VITE_APOLLO_SANDBOX_URL: string;
  readonly VITE_GRPCUI_URL: string;

  // Backwards compatibility
  readonly VITE_MINIAPP_API_TEST_BASE: string;
  readonly VITE_GRAPHIQL_TEST_URL: string;
  readonly VITE_GRPCUI_TEST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
