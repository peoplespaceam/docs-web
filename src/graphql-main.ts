import './style.css';
import graphQlSchema from './generated/miniapp-graphql-v1.graphql?raw';
import { config, setText, wireBlobLink } from './config';
import { mountGraphQlExplorer } from './graphql-explorer';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'GraphQL schema, embedded explorer, and integration notes');
setText('site-environment', config.siteEnvironment);
setText('graphql-endpoint', config.graphQlHttpUrl || 'Not configured');

wireBlobLink('graphql-sdl-link', graphQlSchema, 'miniapp-graphql-v1.graphql', 'application/graphql;charset=utf-8');

const el = document.getElementById('sdl');
if (el) el.textContent = graphQlSchema;

mountGraphQlExplorer('graphql-explorer-root', { endpoint: config.graphQlHttpUrl });
