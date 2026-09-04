import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { analyze } from '../src/analyzer.js';
import { toMarkdown } from '../src/reporter.js';

describe('automation audit', () => {
  test('prioritizes reliability findings and calculates a score', async () => {
    const target = await mkdtemp(join(tmpdir(), 'qa-audit-'));
    await writeFile(
      join(target, 'checkout.spec.ts'),
      "test.only('checkout', async ({ page }) => { await page.waitForTimeout(3000); });"
    );

    const result = await analyze(target);

    expect(result.filesScanned).toBe(1);
    expect(result.summary.high).toBe(2);
    expect(result.score).toBe(70);
    expect(toMarkdown(result)).toContain('checkout.spec.ts:1');
  });

  test('returns a perfect score for a clean sample', async () => {
    const target = await mkdtemp(join(tmpdir(), 'qa-audit-'));
    await writeFile(
      join(target, 'login.spec.ts'),
      "await page.getByRole('button', { name: 'Login' }).click();"
    );
    expect((await analyze(target)).score).toBe(100);
  });
});
