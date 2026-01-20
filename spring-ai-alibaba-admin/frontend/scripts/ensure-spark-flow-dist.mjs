import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(new URL('.', import.meta.url).pathname, '..');
const distDir = join(repoRoot, 'packages', 'spark-flow', 'dist');
const distEntry = join(distDir, 'index.js');

if (existsSync(distEntry)) {
  process.exit(0);
}

console.log('[ensure] spark-flow dist not found; building @spark-ai/flow...');

const pnpmResult = spawnSync('pnpm', ['--filter', '@spark-ai/flow', 'build'], {
  cwd: repoRoot,
  stdio: 'inherit',
});

if (pnpmResult.status === 0 && existsSync(distEntry)) {
  process.exit(0);
}

// Fallback: try npm if pnpm is not available.
if (pnpmResult.error) {
  console.log('[ensure] pnpm not available; falling back to npm...');
  const npmResult = spawnSync('npm', ['run', 'build'], {
    cwd: join(repoRoot, 'packages', 'spark-flow'),
    stdio: 'inherit',
  });
  if (npmResult.status === 0 && existsSync(distEntry)) {
    process.exit(0);
  }
}

console.error('[ensure] Failed to build spark-flow dist.');
console.error(`Expected: ${distEntry}`);
process.exit(1);
