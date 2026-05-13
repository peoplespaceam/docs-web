import '@scalar/api-reference/style.css';
import { createApiReference } from '@scalar/api-reference';
import './style.css';

const specUrl = new URL('specs/miniapp.yaml', window.location.href).toString();
const baseServer = import.meta.env.VITE_MINIAPP_API_TEST_BASE?.replace(/\/$/, '') ?? '';

createApiReference('#scalar-rest', {
  url: specUrl,
  title: 'Telegram Mini App (REST)',
  ...(baseServer ? { baseServerURL: baseServer } : {}),
  hideClientButton: false,
});

const graphiql = import.meta.env.VITE_GRAPHIQL_TEST_URL ?? '';
const grpcui = import.meta.env.VITE_GRPCUI_TEST_URL ?? '';

const g = document.getElementById('link-graphiql');
const r = document.getElementById('link-grpcui');
if (g instanceof HTMLAnchorElement) {
  g.href = graphiql || '#';
  if (!graphiql) {
    g.setAttribute('aria-disabled', 'true');
    g.title = 'Set VITE_GRAPHIQL_TEST_URL';
  }
}
if (r instanceof HTMLAnchorElement) {
  r.href = grpcui || '#';
  if (!grpcui) {
    r.setAttribute('aria-disabled', 'true');
    r.title = 'Set VITE_GRPCUI_TEST_URL';
  }
}
