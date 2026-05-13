import './style.css';

void (async () => {
  const specUrl = new URL('specs/miniapp-graphql-v1.graphql', window.location.href).toString();
  const res = await fetch(specUrl);
  const text = await res.text();
  const el = document.getElementById('sdl');
  if (el) {
    el.textContent = text;
  }

  const graphiql = import.meta.env.VITE_GRAPHIQL_TEST_URL ?? '';
  const grpcui = import.meta.env.VITE_GRPCUI_TEST_URL ?? '';

  for (const [id, href] of [
    ['link-graphiql', graphiql],
    ['link-grpcui', grpcui],
  ] as const) {
    const a = document.getElementById(id);
    if (a instanceof HTMLAnchorElement) {
      a.href = href || '#';
      if (!href) {
        a.setAttribute('aria-disabled', 'true');
        a.title = `Set env for ${id}`;
      }
    }
  }
})();
