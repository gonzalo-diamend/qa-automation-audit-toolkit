# QA Automation Audit Toolkit

An evidence-based command-line toolkit that scans Playwright and Cypress code, identifies common reliability risks, calculates a quality score and produces a prioritized consulting report.

Created by **Gonzalo Alberto Diamend**, Senior QA Automation Consultant.

## Why this portfolio exists

Automation problems are rarely solved by adding more tests. Teams first need to understand why suites are slow, flaky or difficult to maintain. This project demonstrates a consulting-led approach: collect evidence, quantify risk and turn findings into an actionable improvement backlog.

## Risks detected

- Hard-coded waits and focused tests.
- Forced interactions that can hide real defects.
- Brittle XPath and positional CSS selectors.
- Potential credentials committed in test code.
- Severity-based scoring and prioritization.

## Run the sample audit

```bash
npm ci
npm run demo
```

The command creates both `reports/audit-report.md` and `reports/audit-report.json`.

See the committed [sample audit report](docs/SAMPLE_AUDIT_REPORT.md) for the expected client-facing output.

Audit another repository:

```bash
npm run audit -- ../your-automation-repo --format both --output reports
```

## Commercial application

This toolkit supports a fixed-scope **QA Automation Audit** covering architecture, test reliability, selectors, synchronization, CI/CD and maintainability. Automated findings are evidence inputs; final recommendations still require senior engineering judgment and business context.

## Quality controls

The repository includes strict TypeScript, automated unit tests, formatting checks, GitHub Actions and a generated audit artifact on every change.

## Responsible use

The intentionally problematic sample suite contains fake demonstration data only. Do not treat static analysis as a substitute for credential scanning or a complete security review.

## License

MIT
