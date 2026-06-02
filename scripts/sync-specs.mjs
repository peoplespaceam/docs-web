#!/usr/bin/env node
/**
 * Copies canonical OpenAPI + GraphQL SDL + protobuf contracts from the contracts repo.
 * Run automatically before dev/build via npm pre* scripts.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const contracts = process.env.CONTRACTS_ROOT
  ? resolve(root, process.env.CONTRACTS_ROOT)
  : join(root, '..', 'platform', 'contracts');
const outDir = join(root, 'public', 'specs');
const generatedDir = join(root, 'src', 'generated');
const protoOutDir = join(outDir, 'proto');
const protoGeneratedDir = join(generatedDir, 'proto');

const copies = [
  ['openapi/platform-api/v1/miniapp.yaml', 'miniapp.yaml'],
  ['graphql/platform-api/miniapp/v1/schema.graphql', 'miniapp-graphql-v1.graphql'],
];

function walk(dir) {
  const items = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const stat = statSync(abs);
    if (stat.isDirectory()) {
      items.push(...walk(abs));
    } else {
      items.push(abs);
    }
  }
  return items;
}

mkdirSync(outDir, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

if (!existsSync(contracts)) {
  const expected = [
    ...copies.flatMap(([, destName]) => [join(outDir, destName), join(generatedDir, destName)]),
    join(outDir, 'proto-index.json'),
    join(generatedDir, 'proto-manifest.ts'),
  ];
  const missing = expected.filter((dest) => !existsSync(dest));

  if (missing.length > 0) {
    console.error(
      `sync-specs: contracts not found at ${contracts} and checked-in specs are missing:\n` +
        missing.map((dest) => `  - ${dest}`).join('\n') +
        '\nLocal: clone peoplespaceam/platform next to peoplespaceam/docs-web (contracts live at platform/contracts), or set CONTRACTS_ROOT.\n' +
        'Example: CONTRACTS_ROOT=../platform/contracts npm run sync-specs',
    );
    process.exit(1);
  }

  console.log('sync-specs: contracts checkout not found; using checked-in specs');
  process.exit(0);
}

for (const [rel, destName] of copies) {
  const src = join(contracts, rel);
  const publicDest = join(outDir, destName);
  const generatedDest = join(generatedDir, destName);
  if (!existsSync(src)) {
    console.error(`sync-specs: missing source ${src}`);
    process.exit(1);
  }
  copyFileSync(src, publicDest);
  copyFileSync(src, generatedDest);
  console.log('sync-specs:', destName);
}

const protoRoot = join(contracts, 'proto');
if (!existsSync(protoRoot)) {
  console.error(`sync-specs: missing proto root ${protoRoot}`);
  process.exit(1);
}

rmSync(protoOutDir, { recursive: true, force: true });
rmSync(protoGeneratedDir, { recursive: true, force: true });
mkdirSync(protoOutDir, { recursive: true });
mkdirSync(protoGeneratedDir, { recursive: true });

const protoFiles = walk(protoRoot)
  .filter((file) => file.endsWith('.proto'))
  .sort();

const manifest = [];
const tsEntries = [];
for (const file of protoFiles) {
  const relFromProtoRoot = relative(protoRoot, file);
  const publicDest = join(protoOutDir, relFromProtoRoot);
  const generatedDest = join(protoGeneratedDir, relFromProtoRoot);
  const rel = relative(outDir, publicDest).replace(/\\/g, '/');
  mkdirSync(dirname(publicDest), { recursive: true });
  mkdirSync(dirname(generatedDest), { recursive: true });
  copyFileSync(file, publicDest);
  copyFileSync(file, generatedDest);
  manifest.push(rel);
  const importPath = './proto/' + relFromProtoRoot.replace(/\\/g, '/');
  const varName = 'proto_' + relFromProtoRoot.replace(/[^a-zA-Z0-9]+/g, '_');
  tsEntries.push({ rel, importPath, varName });
  console.log('sync-specs:', rel);
}

writeFileSync(join(outDir, 'proto-index.json'), `${JSON.stringify(manifest, null, 2)}\n`);

const manifestTs = [
  ...tsEntries.map(({ importPath, varName }) => `import ${varName} from '${importPath}?raw';`),
  '',
  'export const protoFiles = [',
  ...tsEntries.map(({ rel, varName }) => `  { path: '${rel}', content: ${varName} },`),
  '] as const;',
  '',
].join('\n');
writeFileSync(join(generatedDir, 'proto-manifest.ts'), manifestTs);
console.log('sync-specs: proto-index.json');
console.log('sync-specs: proto-manifest.ts');
