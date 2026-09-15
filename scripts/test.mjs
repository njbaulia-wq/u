import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';

execFileSync('tsc', ['-p', 'tsconfig.core.json'], { stdio: 'inherit' });
try {
  execFileSync(process.execPath, ['--test', 'tests/domain.test.mjs'], { stdio: 'inherit' });
} finally {
  rmSync('.tmp-test', { recursive: true, force: true });
}
