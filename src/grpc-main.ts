import './style.css';
import { protoFiles } from './generated/proto-manifest';
import { config, setText, wireLink } from './config';

setText('site-title', config.siteTitle);
setText('site-subtitle', 'gRPC contracts and live grpcui handoff');
setText('site-environment', config.siteEnvironment);
wireLink('grpcui-link', config.grpcUiUrl, 'Set VITE_GRPCUI_URL');

const root = document.getElementById('proto-list');
if (root) {
  if (!protoFiles.length) {
    root.innerHTML = '<p class="muted">No proto files were synced into this build.</p>';
  } else {
    const ul = document.createElement('ul');
    ul.className = 'proto-items';

    for (const file of protoFiles) {
      const li = document.createElement('li');
      li.className = 'proto-item';
      const code = document.createElement('code');
      code.textContent = file.path;
      const a = document.createElement('a');
      a.className = 'button';
      a.href = URL.createObjectURL(new Blob([file.content], { type: 'text/plain;charset=utf-8' }));
      a.download = file.path.split('/').pop() || 'contract.proto';
      a.textContent = 'Download proto';
      li.append(code, a);
      ul.append(li);
    }

    root.append(ul);
  }
}
