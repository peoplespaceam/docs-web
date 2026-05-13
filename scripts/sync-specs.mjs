#!/usr/bin/env node
/**
 * Copies canonical OpenAPI + GraphQL SDL from the contracts repo (sibling of docs-web).
 * Run automatically before dev/build via npm pre* scripts.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
// Sibling checkout: ../contracts (local monorepo). CI: set CONTRACTS_ROOT=contracts when contracts is checked out under this repo (see .github/workflows/ci.yml).
const contracts = process.env.CONTRACTS_ROOT
  ? resolve(root, process.env.CONTRACTS_ROOT)
  : join(root, '..', 'contracts');
const outDir = join(root, 'public', 'specs');

const copies = [
  ['openapi/platform-api/v1/miniapp.yaml', 'miniapp.yaml'],
  ['graphql/platform-api/miniapp/v1/schema.graphql', 'miniapp-graphql-v1.graphql'],
];

mkdirSync(outDir, { recursive: true });

if (!existsSync(contracts)) {
  const missing = copies
    .map(([, destName]) => join(outDir, destName))
    .filter((dest) => !existsSync(dest));

  if (missing.length > 0) {
    console.error(
      `sync-specs: contracts not found at ${contracts} and checked-in specs are missing:\n` +
        missing.map((dest) => `  - ${dest}`).join('\n') +
        '\nLocal: clone peoplespaceam/contracts next to peoplespaceam/docs-web, or set CONTRACTS_ROOT.\n' +
        'Example: CONTRACTS_ROOT=contracts npm run sync-specs',
    );
    process.exit(1);
  }

  console.log('sync-specs: contracts checkout not found; using checked-in specs');
  process.exit(0);
}

for (const [rel, destName] of copies) {
  const src = join(contracts, rel);
  const dest = join(outDir, destName);
  if (!existsSync(src)) {
    console.error(`sync-specs: missing source ${src}`);
    process.exit(1);
  }
  copyFileSync(src, dest);
  console.log('sync-specs:', destName);
}
