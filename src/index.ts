#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { analyze } from './analyzer.js';
import { toMarkdown } from './reporter.js';

const args = process.argv.slice(2);
const target = resolve(args.find((arg) => !arg.startsWith('--')) ?? '.');
const format = args[args.indexOf('--format') + 1] ?? 'markdown';
const output = resolve(args[args.indexOf('--output') + 1] ?? 'reports');

if (!['markdown', 'json', 'both'].includes(format)) {
  throw new Error('Format must be markdown, json or both.');
}

const result = await analyze(target);
await mkdir(output, { recursive: true });

if (format === 'markdown' || format === 'both') {
  await writeFile(resolve(output, 'audit-report.md'), toMarkdown(result));
}
if (format === 'json' || format === 'both') {
  await writeFile(resolve(output, 'audit-report.json'), JSON.stringify(result, null, 2));
}

console.log(`Audit complete: ${result.score}/100, ${result.findings.length} findings.`);
