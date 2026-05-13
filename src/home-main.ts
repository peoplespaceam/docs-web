import './style.css';
import openApiSpec from './generated/miniapp.yaml?raw';
import { config, renderStatus, setText, wireBlobLink, wireLink } from './config';

setText('site-title', config.siteTitle);
setText('site-subtitle', config.siteSubtitle);
setText('site-environment', config.siteEnvironment);

wireBlobLink('overview-openapi-link', openApiSpec, 'miniapp.yaml', 'application/yaml;charset=utf-8');
wireLink('overview-apollo-link', config.apolloSandboxUrl || config.graphQlExplorerUrl, 'Set VITE_APOLLO_SANDBOX_URL or VITE_GRAPHQL_EXPLORER_URL');
wireLink('overview-grpc-link', config.grpcUiUrl, 'Set VITE_GRPCUI_URL');

renderStatus('rest-status', true, config.restBase ? 'Interactive' : 'Static spec');
renderStatus('graphql-status', Boolean(config.apolloSandboxUrl || config.graphQlExplorerUrl), 'Explorer ready', 'SDL only');
renderStatus('grpc-status', Boolean(config.grpcUiUrl), 'grpcui ready', 'Proto browser only');
