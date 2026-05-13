import './style.css';
import { config, renderInfoCards, renderSnippetCards, renderStatus, setText } from './config';
import { mcpCards, mcpSnippets } from './team-data';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'MCP endpoint strategy and rollout notes');
setText('site-environment', config.siteEnvironment);
setText('mcp-url', config.mcpServerUrl || 'https://test.ps.avanesyan.am/mcp');
renderStatus('mcp-page-status', Boolean(config.mcpServerUrl), 'Live endpoint configured', 'Endpoint configuration required');
renderInfoCards('mcp-cards', mcpCards);
renderSnippetCards('mcp-snippets', mcpSnippets);
