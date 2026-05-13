import './style.css';
import { config, renderSnippetCards, renderTable, setText } from './config';
import { clientRows, clientSnippets } from './team-data';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'Client install templates and verification steps');
setText('site-environment', config.siteEnvironment);
renderTable('client-matrix', ['Client', 'Where to paste', 'Transport', 'Best fit'], clientRows);
renderSnippetCards('client-snippets', clientSnippets);
