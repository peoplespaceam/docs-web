import { config } from './config';

const mcpUrl = config.mcpServerUrl || 'https://test.ps.avanesyan.am/mcp';
const tokenPlaceholder = 'MCP_BEARER_TOKEN';

export const mcpCards = [
  {
    eyebrow: 'Transport',
    title: 'Remote HTTP endpoint',
    description: 'Expose a single stable /mcp endpoint and keep the server behind auth from day one.',
    bullets: [
      `Canonical URL: ${mcpUrl}`,
      'Prefer HTTP transport over SSE for new client setups.',
      'Use bearer auth or gateway-managed headers instead of anonymous access.',
    ],
  },
  {
    eyebrow: 'Capabilities',
    title: 'One server, multiple surfaces',
    description: 'Use the same MCP server to expose tools, prompts, and reusable resources to every client.',
    bullets: [
      'Tools for live actions and diagnostics',
      'Prompts for guided workflows and repeatable tasks',
      'Resources for contracts, docs, runbooks, and onboarding context',
    ],
  },
  {
    eyebrow: 'Team policy',
    title: 'Keep rollout boring',
    description: 'Standardize one URL, one auth story, and one smoke test so teammates do not need bespoke setup notes.',
    bullets: [
      'Publish one environment bundle for all clients',
      'Document required scopes and headers once',
      'Gate rollout with a shared smoke prompt before wider adoption',
    ],
  },
];

export const mcpSnippets = [
  {
    eyebrow: 'Team handoff',
    title: 'Shared environment bundle',
    meta: '.env / password manager note',
    description: 'The minimum values teammates need before pasting any client-specific config. Use the live shared endpoint and pair it with a bearer token.',
    code: `MCP_SERVER_URL=${mcpUrl}
MCP_BEARER_TOKEN=<paste-token-here>`,
    verify: `curl -i -X POST "$MCP_SERVER_URL" -H "content-type: application/json" -H "accept: application/json, text/event-stream" --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"curl","version":"0"}}}'`,
    note: 'Live endpoint: https://test.ps.avanesyan.am/mcp. Keep the token alongside the URL so the shared smoke test stays identical for every client.',
  },
  {
    eyebrow: 'Server contract',
    title: 'Expose the same shape everywhere',
    meta: 'Remote MCP expectations',
    description: 'This is the behavior contract the docs assume every client can rely on.',
    code: `Transport: HTTP
Path: /mcp
Auth: Authorization: Bearer $${tokenPlaceholder}
Capabilities: tools, prompts, resources
Smoke test: list tools -> open one prompt -> read one resource`,
  },
];

export const clientRows = [
  ['Claude Code', 'CLI command', 'HTTP', 'Best direct remote setup'],
  ['Codex CLI', '~/.codex/config.toml', 'HTTP', 'Good for repo work + MCP'],
  ['Cursor', '~/.cursor/mcp.json', 'HTTP / SSE / stdio', 'Editor-first onboarding'],
  ['Gemini CLI', '~/.gemini/settings.json', 'HTTP / SSE / stdio', 'CLI setup with trust controls'],
  ['OpenCode', '~/.config/opencode/opencode.json', 'Remote MCP via JSON config', 'Strong team-default story'],
];

export const clientSnippets = [
  {
    eyebrow: 'Claude',
    title: 'Claude Code',
    meta: 'Install via CLI',
    description: 'Fastest direct remote HTTP setup.',
    code: `claude mcp add --transport http peoplespaceam ${mcpUrl} \\
  --header "Authorization: Bearer $${tokenPlaceholder}"`,
    verify: `claude mcp list
# then inside Claude Code
/mcp`,
    note: 'If you prefer desktop-managed connectors, mirror the same remote URL and auth there.',
  },
  {
    eyebrow: 'Codex',
    title: 'Codex CLI',
    meta: '~/.codex/config.toml',
    description: 'Remote MCP wired directly in the user config.',
    code: `#:schema https://developers.openai.com/codex/config-schema.json

[mcp_servers.peoplespaceam]
url = "${mcpUrl}"
bearer_token_env_var = "${tokenPlaceholder}"
enabled = true`,
    verify: 'codex mcp list',
  },
  {
    eyebrow: 'Cursor',
    title: 'Cursor',
    meta: '~/.cursor/mcp.json',
    description: 'Remote MCP config with explicit auth header.',
    code: `{
  "mcpServers": {
    "peoplespaceam": {
      "url": "${mcpUrl}",
      "headers": {
        "Authorization": "Bearer \${env:${tokenPlaceholder}}"
      }
    }
  }
}`,
    verify: 'Open Cursor settings → MCP → reload config',
  },
  {
    eyebrow: 'Gemini',
    title: 'Gemini CLI',
    meta: '~/.gemini/settings.json',
    description: 'HTTP transport with explicit trust and headers.',
    code: `{
  "mcpServers": {
    "peoplespaceam": {
      "httpUrl": "${mcpUrl}",
      "headers": {
        "Authorization": "Bearer $${tokenPlaceholder}"
      },
      "trust": false
    }
  }
}`,
    verify: `gemini
/mcp`,
  },
  {
    eyebrow: 'OpenCode',
    title: 'OpenCode',
    meta: '~/.config/opencode/opencode.json',
    description: 'Good fit when you want org defaults plus project overrides.',
    code: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "peoplespaceam": {
      "type": "remote",
      "url": "${mcpUrl}",
      "enabled": true
    }
  }
}`,
    verify: 'opencode debug config',
    note: 'Use remote org config or managed config later if you want team-wide defaults without manual edits.',
  },
];

export const promptCards = [
  {
    eyebrow: 'Onboarding',
    title: 'Repo first-pass audit',
    description: 'Use this when a teammate lands in the repo for the first time.',
    code: `Read this repository like a new teammate.

Deliver:
1. a short architecture map
2. the real build/test commands
3. the main runtime surfaces
4. the top 3 likely breakpoints
5. the first safe task I should take`,
  },
  {
    eyebrow: 'Execution',
    title: 'Issue triage + fix plan',
    description: 'Turns an issue into a constrained execution plan before coding starts.',
    code: `Triage this issue before touching code.

I want:
- root-cause hypothesis
- affected files and services
- missing facts to verify
- smallest safe fix
- verification plan
- rollback risk`,
  },
  {
    eyebrow: 'Deploy',
    title: 'Smoke-test the live surface',
    description: 'Use after deploys or routing changes.',
    code: `Check the live surface end to end.

Verify:
- routing is correct
- auth failures are expected and not masked
- docs links point to real endpoints
- status codes and key UI pages match the intended environment

Return only: passed checks, failed checks, and the next fix if needed.`,
  },
  {
    eyebrow: 'Docs',
    title: 'Docs sync pass',
    description: 'Keeps contracts, live links, and onboarding text aligned.',
    code: `Audit docs drift between checked-in contracts and the live environment.

Update:
- misleading labels
- dead links
- stale env var names
- onboarding gaps for new teammates

Then build the docs and tell me exactly what changed.`,
  },
  {
    eyebrow: 'MCP',
    title: 'MCP rollout review',
    description: 'Use before asking teammates to adopt a shared MCP endpoint.',
    code: `Review this MCP rollout plan like an operator.

I need:
- auth gaps
- client compatibility risks
- missing smoke tests
- what should be documented once instead of per teammate
- the minimum launch checklist`,
  },
  {
    eyebrow: 'Reuse',
    title: 'Promote to shared asset',
    description: 'For turning one-off good work into team-reusable assets.',
    code: `Take this successful workflow and turn it into a reusable team asset.

Decide whether it should become:
- a prompt
- a skill
- an agent
- a registry package

Then produce the minimal shippable version and a short install/update note.`,
  },
];

export const agentCards = [
  {
    eyebrow: 'Layer 1',
    title: 'Skills registry',
    description: 'Put reusable tool workflows in versioned skills so teammates install them instead of pasting giant prompts forever.',
    bullets: [
      'Use ClawHub for install / update / publish flows',
      'Version skills when behavior changes matter',
      'Keep secrets and org-private defaults outside the published artifact',
    ],
  },
  {
    eyebrow: 'Layer 2',
    title: 'Agent catalog',
    description: 'Define named role bundles like operator, debugger, docs maintainer, or release shepherd with clear scope and expected outputs.',
    bullets: [
      'Give each agent one job and one tone',
      'Attach the prompts and skills it should reach for first',
      'Document what it owns vs what still needs a human decision',
    ],
  },
  {
    eyebrow: 'Layer 3',
    title: 'Prompt packs',
    description: 'Keep high-value prompts small and copyable. Promote the ones that recur into skills or agents later.',
    bullets: [
      'One prompt per workflow',
      'Add expected output shape',
      'Pair prompts with one smoke test so teammates can self-check quickly',
    ],
  },
];

export const registrySnippets = [
  {
    eyebrow: 'ClawHub',
    title: 'Install a shared skill',
    meta: 'Teammate setup',
    description: 'Use versioned installs when you want stable behavior across the team.',
    code: `npm i -g clawhub
clawhub install platform-operator
clawhub install platform-operator --version 1.0.0`,
    verify: 'clawhub list',
  },
  {
    eyebrow: 'ClawHub',
    title: 'Update installed skills',
    meta: 'Ongoing maintenance',
    description: 'Hash-aware update flow for local copies.',
    code: `clawhub update platform-operator
clawhub update --all`,
    verify: 'clawhub list',
  },
  {
    eyebrow: 'ClawHub',
    title: 'Publish a shared skill',
    meta: 'Maintainer flow',
    description: 'Use this once a prompt or workflow proves it deserves team-wide reuse.',
    code: `clawhub login
clawhub whoami
clawhub publish ./skills/platform-operator \\
  --slug platform-operator \\
  --name "Platform Operator" \\
  --version 1.0.0 \\
  --changelog "Initial team release"`,
    verify: 'clawhub search "platform operator"',
  },
];

export const teamChecklist = [
  'Expose one stable MCP URL before documenting per-client setup.',
  'Publish one smoke-test prompt and require every teammate to run it once.',
  'Promote repeatable workflows into versioned skills instead of endlessly copying prompts.',
  'Create named agents only after the underlying prompts and skills are already stable.',
  'Keep the docs hub as the canonical source for install snippets, env names, and verification steps.',
];
