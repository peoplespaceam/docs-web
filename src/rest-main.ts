import '@scalar/api-reference/style.css';
import { createApiReference } from '@scalar/api-reference';
import './style.css';
import openApiSpec from './generated/miniapp.yaml?raw';
import { config, setText, wireBlobLink } from './config';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'REST reference');
setText('site-environment', config.siteEnvironment);
wireBlobLink('rest-openapi-link', openApiSpec, 'miniapp.yaml', 'application/yaml;charset=utf-8');

createApiReference('#scalar-rest', {
  content: openApiSpec,
  title: 'Telegram Mini App (REST)',
  ...(config.restBase ? { baseServerURL: config.restBase } : {}),
  hideClientButton: false,
  searchHotKey: 'k',
  theme: 'purple',
});
