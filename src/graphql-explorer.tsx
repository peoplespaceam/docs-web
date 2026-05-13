import React from 'react';
import { createRoot } from 'react-dom/client';
import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import 'graphiql/style.css';

type MountOptions = {
  endpoint: string;
};

const DEFAULT_QUERY = `# Paste X-Telegram-Init-Data in Headers, then explore the live schema.
# Try introspection first, or replace this with a real operation.

query IntrospectionSmoke {
  __schema {
    queryType {
      name
    }
  }
}`;

const DEFAULT_HEADERS = JSON.stringify({
  'X-Telegram-Init-Data': '',
}, null, 2);

export function mountGraphQlExplorer(rootId: string, options: MountOptions) {
  const root = document.getElementById(rootId);
  if (!root) return;

  if (!options.endpoint) {
    root.innerHTML = `
      <div class="graphql-explorer-fallback">
        <div class="mini-heading">Explorer unavailable</div>
        <p class="muted">Set <code>VITE_GRAPHQL_HTTP_URL</code> to enable the embedded GraphQL console.</p>
      </div>
    `;
    return;
  }

  const fetcher = createGraphiQLFetcher({ url: options.endpoint });

  createRoot(root).render(
    <React.StrictMode>
      <div className="graphql-explorer-frame">
        <GraphiQL
          fetcher={fetcher}
          defaultEditorToolsVisibility="headers"
          isHeadersEditorEnabled
          shouldPersistHeaders={false}
          showPersistHeadersSettings
          defaultQuery={DEFAULT_QUERY}
          defaultHeaders={DEFAULT_HEADERS}
        >
          <GraphiQL.Logo>
            <div>
              <strong>PeopleSpaceAM GraphQL Explorer</strong>
              <div className="muted">Live endpoint: {options.endpoint}</div>
            </div>
          </GraphiQL.Logo>
          <GraphiQL.Footer>
            <div className="meta">
              <strong>Auth required:</strong> paste a valid <code>X-Telegram-Init-Data</code> value in the Headers editor. SDL snapshot on this page remains sourced from the contracts repo.
            </div>
          </GraphiQL.Footer>
        </GraphiQL>
      </div>
    </React.StrictMode>,
  );
}
