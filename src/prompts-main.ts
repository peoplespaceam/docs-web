import './style.css';
import { config, renderSnippetCards, setText } from './config';
import { promptCards } from './team-data';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'Copy-paste prompts for repeatable workflows');
setText('site-environment', config.siteEnvironment);
renderSnippetCards('prompt-snippets', promptCards);
