export const config = {
  siteTitle: import.meta.env.VITE_SITE_TITLE || 'PeopleSpaceAM Platform Docs',
  siteSubtitle: import.meta.env.VITE_SITE_SUBTITLE || 'Contracts, explorers, and integration references',
  siteEnvironment: import.meta.env.VITE_SITE_ENVIRONMENT || 'Environment not set',
  restBase: (import.meta.env.VITE_MINIAPP_API_BASE || import.meta.env.VITE_MINIAPP_API_TEST_BASE || '').replace(/\/$/, ''),
  graphQlHttpUrl: import.meta.env.VITE_GRAPHQL_HTTP_URL || '',
  grpcUiUrl: import.meta.env.VITE_GRPCUI_URL || import.meta.env.VITE_GRPCUI_TEST_URL || '',
  mcpServerUrl: import.meta.env.VITE_MCP_SERVER_URL || '',
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
    return;
  }
  el.removeAttribute('aria-disabled');
  el.removeAttribute('title');
}

export function wireBlobLink(id: string, text: string, filename: string, mime = 'text/plain;charset=utf-8') {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAnchorElement)) return;
  const blob = new Blob([text], { type: mime });
  el.href = URL.createObjectURL(blob);
  el.download = filename;
  el.removeAttribute('aria-disabled');
  el.removeAttribute('title');
}

export function renderStatus(id: string, enabled: boolean, enabledText = 'Configured', disabledText = 'Not configured') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = enabled ? enabledText : disabledText;
  el.classList.toggle('status-on', enabled);
  el.classList.toggle('status-off', !enabled);
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export type SnippetCard = {
  title: string;
  eyebrow?: string;
  meta?: string;
  description?: string;
  code?: string;
  verify?: string;
  note?: string;
};

export type InfoCard = {
  title: string;
  eyebrow?: string;
  description: string;
  bullets?: string[];
};

export function renderSnippetCards(id: string, cards: SnippetCard[]) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = cards.map((card) => `
    <article class="card snippet-card">
      ${card.eyebrow ? `<p class="eyebrow">${escapeHtml(card.eyebrow)}</p>` : ''}
      <div class="snippet-head">
        <div>
          <h2>${escapeHtml(card.title)}</h2>
          ${card.description ? `<p class="muted">${escapeHtml(card.description)}</p>` : ''}
        </div>
        ${card.meta ? `<span class="pill">${escapeHtml(card.meta)}</span>` : ''}
      </div>
      ${card.code ? `
        <div class="snippet-block">
          <pre><code>${escapeHtml(card.code)}</code></pre>
          <button class="button copy-button" type="button" data-copy="${escapeHtml(card.code)}">Copy</button>
        </div>
      ` : ''}
      ${card.verify ? `
        <div class="snippet-block snippet-block-secondary">
          <div class="mini-heading">Verify</div>
          <pre><code>${escapeHtml(card.verify)}</code></pre>
          <button class="button copy-button" type="button" data-copy="${escapeHtml(card.verify)}">Copy</button>
        </div>
      ` : ''}
      ${card.note ? `<p class="meta">${escapeHtml(card.note)}</p>` : ''}
    </article>
  `).join('');
  initCopyButtons(root);
}

export function renderInfoCards(id: string, cards: InfoCard[]) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = cards.map((card) => `
    <article class="card info-card">
      ${card.eyebrow ? `<p class="eyebrow">${escapeHtml(card.eyebrow)}</p>` : ''}
      <h2>${escapeHtml(card.title)}</h2>
      <p class="muted">${escapeHtml(card.description)}</p>
      ${card.bullets?.length ? `<ul class="stack-list compact-list">${card.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
    </article>
  `).join('');
}

export function renderChecklist(id: string, items: string[], ordered = false) {
  const root = document.getElementById(id);
  if (!root) return;
  const tag = ordered ? 'ol' : 'ul';
  root.innerHTML = `<${tag} class="stack-list ${ordered ? 'steps-list' : 'compact-list'}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</${tag}>`;
}

export function renderTable(id: string, headers: string[], rows: string[][]) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = `
    <div class="table-wrap">
      <table class="matrix-table">
        <thead>
          <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function initCopyButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-copy]').forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', async () => {
      const text = button.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
        const previous = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => {
          button.textContent = previous || 'Copy';
        }, 1200);
      } catch {
        button.textContent = 'Copy failed';
        window.setTimeout(() => {
          button.textContent = 'Copy';
        }, 1200);
      }
    });
  });
}
