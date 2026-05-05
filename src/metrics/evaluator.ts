import { GeneratedArchitecture } from "../agent/orchestrator";

/**
 * Performance Metrics Evaluator
 * Rates the Agent's performance on a scale from 1 to 10,000.
 */
export function evaluatePerformance(result: GeneratedArchitecture): number {
  let score = 0;

  // 1. Security Check (Max 4000)
  score += evaluateSecurity(result.securityRules);

  // 2. Code Quality & Standards (Max 4000)
  score += evaluateCodeQuality(result.flutterModels, result.repositoryLayer);

  // 3. Completeness (Max 2000)
  if (result.securityRules && result.flutterModels && result.repositoryLayer) {
    score += 2000;
  }

  return score;
}

function evaluateSecurity(rules: string): number {
  let securityScore = 4000;
  const lowerRules = rules.toLowerCase();
  
  // Penalize bad practices
  if (lowerRules.includes('allow read, write: if true')) {
    securityScore -= 3500; // Major security flaw
  }
  
  // Check for authentication requirements
  if (!lowerRules.includes('request.auth != null')) {
    securityScore -= 1000;
  }

  return Math.max(0, Math.min(securityScore, 4000));
}

function evaluateCodeQuality(models: string, repo: string): number {
  let qualityScore = 4000;
  
  // Check for freezed usage
  if (!models.includes('freezed') || !models.includes('json_serializable')) {
    qualityScore -= 1500;
  }

  // Check for error handling in repository
  if (!repo.includes('try') || !repo.includes('catch')) {
    qualityScore -= 1000;
  }

  return Math.max(0, Math.min(qualityScore, 4000));
}
