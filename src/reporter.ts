import type { AuditResult } from './types.js';

export function toMarkdown(result: AuditResult): string {
  const rows = result.findings
    .map(
      (finding) =>
        `| ${finding.severity.toUpperCase()} | ${finding.title} | \`${finding.file}:${finding.line}\` | ${finding.recommendation} |`
    )
    .join('\n');

  return (
    `# QA Automation Audit\n\n` +
    `**Quality score:** ${result.score}/100  \n` +
    `**Files scanned:** ${result.filesScanned}  \n` +
    `**Findings:** ${result.findings.length} (${result.summary.high} high, ${result.summary.medium} medium, ${result.summary.low} low)\n\n` +
    `## Prioritized findings\n\n` +
    (rows
      ? `| Severity | Finding | Location | Recommendation |\n| --- | --- | --- | --- |\n${rows}\n`
      : 'No targeted risks were detected.\n') +
    `\n## Suggested next steps\n\n1. Resolve high-severity reliability and security risks.\n2. Stabilize selectors and synchronization.\n3. Add CI quality gates and measure flaky-test rate over time.\n`
  );
}
