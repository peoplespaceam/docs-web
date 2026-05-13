import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_PATH || '/';

  return {
    base,
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          rest: resolve(__dirname, 'rest.html'),
          graphql: resolve(__dirname, 'graphql.html'),
          grpc: resolve(__dirname, 'grpc.html'),
        },
      },
    },
  };
});
