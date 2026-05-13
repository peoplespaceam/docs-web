import './style.css';
import { config, renderChecklist, renderInfoCards, renderSnippetCards, setText } from './config';
import { agentCards, registrySnippets, teamChecklist } from './team-data';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'Shared skills, agents, and teammate rollout');
setText('site-environment', config.siteEnvironment);
renderInfoCards('agent-cards', agentCards);
renderSnippetCards('registry-snippets', registrySnippets);
renderChecklist('team-checklist', teamChecklist, true);
