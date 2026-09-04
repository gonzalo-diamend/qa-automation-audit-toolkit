import type { Severity } from './types.js';

export type AuditRule = {
  id: string;
  title: string;
  severity: Severity;
  pattern: RegExp;
  recommendation: string;
};

export const rules: AuditRule[] = [
  {
    id: 'no-hard-waits',
    title: 'Hard-coded wait detected',
    severity: 'high',
    pattern: /(?:waitForTimeout|cy\.wait)\s*\(\s*\d+/,
    recommendation: 'Replace time-based waits with observable UI, network or state conditions.'
  },
  {
    id: 'no-focused-tests',
    title: 'Focused test can bypass suite coverage',
    severity: 'high',
    pattern: /(?:test|it|describe)\.only\s*\(/,
    recommendation: 'Remove .only and enable forbidOnly in CI.'
  },
  {
    id: 'avoid-force',
    title: 'Forced interaction can hide usability defects',
    severity: 'medium',
    pattern: /force\s*:\s*true/,
    recommendation: 'Fix actionability or application state instead of bypassing browser checks.'
  },
  {
    id: 'avoid-xpath',
    title: 'Brittle XPath locator detected',
    severity: 'medium',
    pattern: /(?:xpath=|\/\/\w+\[)/,
    recommendation: 'Prefer role, label, text or stable test-id locators.'
  },
  {
    id: 'no-static-secrets',
    title: 'Possible credential embedded in test code',
    severity: 'high',
    pattern: /(?:password|token|apiKey)\s*[:=]\s*['"][^'"]{5,}['"]/i,
    recommendation: 'Load credentials from a secure CI secret or environment variable.'
  },
  {
    id: 'avoid-brittle-css',
    title: 'Positional CSS selector detected',
    severity: 'low',
    pattern: /:nth-(?:child|of-type)\s*\(/,
    recommendation: 'Use a locator tied to user-visible semantics or a stable test attribute.'
  }
];
