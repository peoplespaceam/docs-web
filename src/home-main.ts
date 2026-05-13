import './style.css';
import openApiSpec from './generated/miniapp.yaml?raw';
import { config, renderStatus, setText, wireBlobLink, wireLink } from './config';

setText('site-title', config.siteTitle);
setText('site-subtitle', config.siteSubtitle);
setText('site-environment', config.siteEnvironment);

wireBlobLink('overview-openapi-link', openApiSpec, 'miniapp.yaml', 'application/yaml;charset=utf-8');
wireLink('overview-apollo-link', config.apolloSandboxUrl || config.graphQlExplorerUrl, 'Set VITE_APOLLO_SANDBOX_URL or VITE_GRAPHQL_EXPLORER_URL');
wireLink('overview-grpc-link', config.grpcUiUrl, 'Set VITE_GRPCUI_URL');
wireLink('overview-mcp-link', config.mcpServerUrl, 'Set VITE_MCP_SERVER_URL when the remote MCP endpoint is live');

renderStatus('rest-status', true, config.restBase ? 'Live reference' : 'Static spec');
renderStatus('graphql-status', Boolean(config.apolloSandboxUrl || config.graphQlExplorerUrl), 'Live explorer', 'Schema only');
renderStatus('grpc-status', Boolean(config.grpcUiUrl), 'Live grpcui', 'Contracts only');
renderStatus('mcp-status', Boolean(config.mcpServerUrl), 'Ready to wire', 'Pending endpoint');
renderStatus('clients-status', true, 'Copy-ready', 'Planned');
renderStatus('prompts-status', true, 'Ready to reuse', 'Planned');
renderStatus('agents-status', true, 'Team rollout', 'Planned');
