import './style.css';
import { config, renderInfoCards, renderSnippetCards, renderStatus, setText } from './config';
import { mcpCards, mcpSnippets } from './team-data';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'MCP endpoint strategy and rollout notes');
setText('site-environment', config.siteEnvironment);
setText('mcp-url', config.mcpServerUrl || 'https://mcp.example.com/mcp');
renderStatus('mcp-page-status', Boolean(config.mcpServerUrl), 'Endpoint configured', 'Pending endpoint launch');
renderInfoCards('mcp-cards', mcpCards);
renderSnippetCards('mcp-snippets', mcpSnippets);
