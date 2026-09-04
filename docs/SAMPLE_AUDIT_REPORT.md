# QA Automation Audit

**Quality score:** 38/100  
**Files scanned:** 1  
**Findings:** 6 (3 high, 2 medium, 1 low)

## Prioritized findings

| Severity | Finding                                       | Location             | Recommendation                                                              |
| -------- | --------------------------------------------- | -------------------- | --------------------------------------------------------------------------- |
| HIGH     | Focused test can bypass suite coverage        | `checkout.spec.ts:1` | Remove .only and enable forbidOnly in CI.                                   |
| HIGH     | Possible credential embedded in test code     | `checkout.spec.ts:2` | Load credentials from a secure CI secret or environment variable.           |
| MEDIUM   | Forced interaction can hide usability defects | `checkout.spec.ts:3` | Fix actionability or application state instead of bypassing browser checks. |
| MEDIUM   | Brittle XPath locator detected                | `checkout.spec.ts:3` | Prefer role, label, text or stable test-id locators.                        |
| HIGH     | Hard-coded wait detected                      | `checkout.spec.ts:4` | Replace time-based waits with observable UI, network or state conditions.   |
| LOW      | Positional CSS selector detected              | `checkout.spec.ts:5` | Use a locator tied to user-visible semantics or a stable test attribute.    |

## Suggested next steps

1. Resolve high-severity reliability and security risks.
2. Stabilize selectors and synchronization.
3. Add CI quality gates and measure flaky-test rate over time.
