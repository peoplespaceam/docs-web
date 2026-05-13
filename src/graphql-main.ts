import './style.css';
import graphQlSchema from './generated/miniapp-graphql-v1.graphql?raw';
import { config, setText, wireBlobLink, wireLink } from './config';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'GraphQL schema and explorer handoff');
setText('site-environment', config.siteEnvironment);
setText('graphql-endpoint', config.graphQlHttpUrl || 'Not configured');

wireLink('graphql-apollo-link', config.apolloSandboxUrl, 'Set VITE_APOLLO_SANDBOX_URL');
wireLink('graphql-explorer-link', config.graphQlExplorerUrl, 'Set VITE_GRAPHQL_EXPLORER_URL');
wireBlobLink('graphql-sdl-link', graphQlSchema, 'miniapp-graphql-v1.graphql', 'application/graphql;charset=utf-8');

const el = document.getElementById('sdl');
if (el) el.textContent = graphQlSchema;
