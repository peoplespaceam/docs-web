/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string;
  readonly VITE_MINIAPP_API_TEST_BASE: string;
  readonly VITE_GRAPHIQL_TEST_URL: string;
  readonly VITE_GRPCUI_TEST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
