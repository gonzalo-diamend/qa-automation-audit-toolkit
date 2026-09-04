export type Severity = 'high' | 'medium' | 'low';

export type AuditFinding = {
  ruleId: string;
  title: string;
  severity: Severity;
  file: string;
  line: number;
  evidence: string;
  recommendation: string;
};

export type AuditResult = {
  target: string;
  generatedAt: string;
  filesScanned: number;
  score: number;
  summary: Record<Severity, number>;
  findings: AuditFinding[];
};
