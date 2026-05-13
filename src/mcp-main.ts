import './style.css';
import { config, renderInfoCards, renderSnippetCards, renderStatus, setText } from './config';
import { mcpCards, mcpSnippets } from './team-data';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'MCP endpoint, auth contract, and rollout notes');
setText('site-environment', config.siteEnvironment);
setText('mcp-url', config.mcpServerUrl || 'Not configured');
setText('mcp-rollout-state', config.mcpServerUrl ? 'Live endpoint configured' : 'Endpoint not configured yet');
setText('mcp-auth-mode', config.mcpServerUrl ? 'Authorization: Bearer <token>' : 'Define auth before rollout');
renderStatus('mcp-page-status', Boolean(config.mcpServerUrl), 'Live endpoint configured', 'Rollout configuration required');
renderInfoCards('mcp-cards', mcpCards);
renderSnippetCards('mcp-snippets', mcpSnippets);
