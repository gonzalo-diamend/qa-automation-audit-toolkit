import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { rules } from './rules.js';
import type { AuditFinding, AuditResult, Severity } from './types.js';

const supportedExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const ignoredDirectories = new Set(['node_modules', '.git', 'dist', 'reports', 'coverage']);

async function sourceFiles(root: string, current = root): Promise<string[]> {
  const entries = await readdir(current, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(current, entry.name);
      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name) ? [] : sourceFiles(root, path);
      }
      return supportedExtensions.has(extname(entry.name)) ? [path] : [];
    })
  );
  return nested.flat();
}

export async function analyze(target: string): Promise<AuditResult> {
  const files = await sourceFiles(target);
  const findings: AuditFinding[] = [];

  for (const file of files) {
    const lines = (await readFile(file, 'utf8')).split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const rule of rules) {
        if (rule.pattern.test(line)) {
          findings.push({
            ruleId: rule.id,
            title: rule.title,
            severity: rule.severity,
            file: relative(target, file),
            line: index + 1,
            evidence: line.trim().slice(0, 160),
            recommendation: rule.recommendation
          });
        }
      }
    });
  }

  const summary: Record<Severity, number> = { high: 0, medium: 0, low: 0 };
  findings.forEach((finding) => summary[finding.severity]++);
  const penalty = summary.high * 15 + summary.medium * 7 + summary.low * 3;

  return {
    target,
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    score: Math.max(0, 100 - penalty),
    summary,
    findings
  };
}
