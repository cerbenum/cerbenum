/**
 * Builds the static export and publishes it to the `gh-pages` branch.
 *
 * `main` holds the source; `gh-pages` holds only the rendered site. The export
 * is committed from a throwaway repository inside `out/`, so the working tree
 * and its history are never touched.
 *
 * Run: npm run deploy
 */
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');
const BRANCH = 'gh-pages';

const capture = (cwd, ...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim();

const inherit = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: 'inherit' });

const npm = (...args) =>
  execFileSync('npm', args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });

const remote = capture(root, 'remote', 'get-url', 'origin');
const name = capture(root, 'config', 'user.name');
const email = capture(root, 'config', 'user.email');

npm('run', 'assets');
npm('run', 'build');

if (!existsSync(join(out, 'index.html'))) {
  console.error('export missing: out/index.html was not produced');
  process.exit(1);
}

// Jekyll would drop the _next directory; this file turns it off.
writeFileSync(join(out, '.nojekyll'), '');

rmSync(join(out, '.git'), { recursive: true, force: true });

inherit(out, 'init', '-q', '-b', BRANCH);
inherit(out, 'config', 'user.name', name);
inherit(out, 'config', 'user.email', email);
// The throwaway repo needs the same credential helper as the source repo.
try {
  inherit(out, 'config', 'credential.helper', capture(root, 'config', 'credential.helper'));
} catch {
  /* source repo relies on the global helper */
}
inherit(out, 'add', '-A');
inherit(out, 'commit', '-q', '-m', `Publish site (${new Date().toISOString().replace(/\.\d+Z$/, 'Z')})`);
inherit(out, 'push', '--force', remote, `${BRANCH}:${BRANCH}`);

rmSync(join(out, '.git'), { recursive: true, force: true });

console.log(`published ${BRANCH} -> ${remote}`);
