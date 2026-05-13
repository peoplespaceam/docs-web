export const config = {
  siteTitle: import.meta.env.VITE_SITE_TITLE || 'PeopleSpaceAM Platform Docs',
  siteSubtitle: import.meta.env.VITE_SITE_SUBTITLE || 'Contracts, explorers, and integration references',
  siteEnvironment: import.meta.env.VITE_SITE_ENVIRONMENT || 'Current environment',
  restBase: (import.meta.env.VITE_MINIAPP_API_BASE || import.meta.env.VITE_MINIAPP_API_TEST_BASE || '').replace(/\/$/, ''),
  graphQlHttpUrl: import.meta.env.VITE_GRAPHQL_HTTP_URL || '',
  graphQlExplorerUrl: import.meta.env.VITE_GRAPHQL_EXPLORER_URL || import.meta.env.VITE_GRAPHIQL_TEST_URL || '',
  apolloSandboxUrl: import.meta.env.VITE_APOLLO_SANDBOX_URL || '',
  grpcUiUrl: import.meta.env.VITE_GRPCUI_URL || import.meta.env.VITE_GRPCUI_TEST_URL || '',
};

export function setText(id: string, value: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

export function wireLink(id: string, href: string, missingTitle: string) {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAnchorElement)) return;
  el.href = href || '#';
  if (!href) {
    el.setAttribute('aria-disabled', 'true');
    el.title = missingTitle;
  }
}

export function wireBlobLink(id: string, text: string, filename: string, mime = 'text/plain;charset=utf-8') {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAnchorElement)) return;
  const blob = new Blob([text], { type: mime });
  el.href = URL.createObjectURL(blob);
  el.download = filename;
}

export function renderStatus(id: string, enabled: boolean, enabledText = 'Configured', disabledText = 'Not configured') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = enabled ? enabledText : disabledText;
  el.classList.toggle('status-on', enabled);
  el.classList.toggle('status-off', !enabled);
}
