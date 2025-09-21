import { FormData } from '../types';

export interface LeadScore {
  totalScore: number;
  grade: 'A' | 'B' | 'C' | 'D';
  priority: 'High' | 'Medium' | 'Low';
  qualityFactors: {
    creditworthiness: number;
    financialStability: number;
    urgency: number;
    loanViability: number;
    contactability: number;
  };
  recommendations: string[];
  followUpStrategy: {
    timeframe: string;
    method: string[];
    priority: number;
  };
  approvalProbability: number;
}

export function calculateLeadScore(formData: FormData): LeadScore {
  const scores = {
    creditworthiness: scoreCreditworthiness(formData),
    financialStability: scoreFinancialStability(formData),
    urgency: scoreUrgency(formData),
    loanViability: scoreLoanViability(formData),
    contactability: scoreContactability(formData)
  };

  // Weighted total score (out of 100)
  const totalScore = Math.round(
    scores.creditworthiness * 0.25 +
    scores.financialStability * 0.25 +
    scores.urgency * 0.20 +
    scores.loanViability * 0.20 +
    scores.contactability * 0.10
  );

  const grade = getGrade(totalScore);
  const priority = getPriority(totalScore);
  const recommendations = getRecommendations(formData, scores);
  const followUpStrategy = getFollowUpStrategy(totalScore, formData);
  const approvalProbability = calculateApprovalProbability(formData, scores);

  return {
    totalScore,
    grade,
    priority,
    qualityFactors: scores,
    recommendations,
    followUpStrategy,
    approvalProbability
  };
}

function scoreCreditworthiness(formData: FormData): number {
  const creditScore = formData.loanDetails.creditScore;

  switch (creditScore) {
    case 'excellent-780+': return 100;
    case 'very-good-720-779': return 85;
    case 'good-660-719': return 70;
    case 'fair-600-659': return 50;
    case 'needs-work-599': return 25;
    default: return 60; // Unknown
  }
}

function scoreFinancialStability(formData: FormData): number {
  let score = 0;

  // Income scoring (40 points) - estimated from current defaults
  const income = formData.financialInfo.annualIncome || 75000;
  if (income >= 150000) score += 40;
  else if (income >= 100000) score += 35;
  else if (income >= 75000) score += 30;
  else if (income >= 50000) score += 20;
  else score += 10;

  // Employment status (30 points)
  switch (formData.financialInfo.employmentStatus) {
    case 'employed': score += 30; break;
    case 'self-employed': score += 20; break;
    case 'retired': score += 25; break;
    case 'unemployed': score += 5; break;
    default: score += 5;
  }

  // Credit history impact (30 points)
  switch (formData.loanDetails.creditHistory) {
    case 'none': score += 30; break;
    case 'consumer-proposal': score += 15; break;
    case 'foreclosure': score += 5; break;
    case 'bankruptcy': score += 0; break;
    default: score += 20;
  }

  return Math.min(100, score);
}

function scoreUrgency(formData: FormData): number {
  let score = 50; // Base score

  // Loan purpose urgency
  switch (formData.loanDetails.loanPurpose) {
    case 'home-improvement': score += 30; break;
    case 'debt-consolidation': score += 25; break;
    case 'investment-purposes': score += 15; break;
    case 'retirement-income': score += 10; break;
    default: score += 0;
  }

  // Property usage impact
  switch (formData.loanDetails.propertyUsage) {
    case 'primary-home': score += 20; break;
    case 'secondary-home': score += 10; break;
    case 'rental': score += 5; break;
    default: score += 0;
  }

  return Math.min(100, score);
}

function scoreLoanViability(formData: FormData): number {
  let score = 0;

  // Property value scoring (40 points)
  switch (formData.loanDetails.propertyValue) {
    case '600k-900k':
    case '900k-1200k': score += 40; break;
    case '300k-600k':
    case '1200k-1500k': score += 35; break;
    case '1500k-2000k': score += 30; break;
    case 'above-2000k': score += 25; break;
    case 'below-300k': score += 20; break;
    default: score += 30;
  }

  // Loan amount scoring (35 points)
  switch (formData.loanDetails.loanAmount) {
    case '100k-200k': score += 35; break;
    case '75k-100k': score += 30; break;
    case '50k-75k': score += 25; break;
    case 'above-200k': score += 30; break;
    case '25k-50k': score += 20; break;
    case 'below-25k': score += 10; break;
    default: score += 25;
  }

  // Current mortgage status (25 points)
  switch (formData.loanDetails.currentMortgages) {
    case 'paid-off': score += 25; break;
    case 'one-mortgage': score += 20; break;
    case 'two-mortgages': score += 10; break;
    default: score += 15;
  }

  return Math.min(100, score);
}

function scoreContactability(formData: FormData): number {
  let score = 0;

  // Email provided (50 points)
  if (formData.personalInfo.email && formData.personalInfo.email.includes('@')) {
    score += 50;
  }

  // Phone provided (50 points)
  if (formData.personalInfo.phone && formData.personalInfo.phone.length >= 10) {
    score += 50;
  }

  return score;
}

function getGrade(score: number): 'A' | 'B' | 'C' | 'D' {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  return 'D';
}

function getPriority(score: number): 'High' | 'Medium' | 'Low' {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium';
  return 'Low';
}

function getRecommendations(formData: FormData, scores: any): string[] {
  const recommendations: string[] = [];

  // Credit recommendations
  if (scores.creditworthiness < 70) {
    recommendations.push('Consider credit improvement consultation');
  }

  // Financial stability recommendations
  if (scores.financialStability < 60) {
    recommendations.push('May need additional income documentation');
  }

  // Urgency recommendations
  if (scores.urgency > 80) {
    recommendations.push('Prioritize immediate contact - hot lead');
  }

  // Loan viability recommendations
  if (scores.loanViability < 60) {
    recommendations.push('Review loan structure and down payment options');
  }

  // Contact recommendations
  if (scores.contactability < 100) {
    recommendations.push('Obtain complete contact information');
  }

  // Specific loan recommendations
  if (formData.loanDetails.creditHistory && formData.loanDetails.creditHistory !== 'none') {
    recommendations.push('Address credit history concerns early in conversation');
  }

  if (formData.financialInfo.employmentStatus === 'self-employed') {
    recommendations.push('Prepare for additional documentation requirements');
  }

  if (formData.propertyInfo.firstTimeHomeBuyer) {
    recommendations.push('Present first-time buyer programs and incentives');
  }

  if (formData.loanDetails.propertyUsage === 'rental') {
    recommendations.push('Discuss investment property lending requirements');
  }

  return recommendations;
}

function getFollowUpStrategy(score: number, formData: FormData): LeadScore['followUpStrategy'] {
  if (score >= 85) {
    return {
      timeframe: 'Within 1 hour',
      method: ['Phone call', 'Email', 'Text message'],
      priority: 1
    };
  } else if (score >= 70) {
    return {
      timeframe: 'Within 4 hours',
      method: ['Phone call', 'Email'],
      priority: 2
    };
  } else if (score >= 55) {
    return {
      timeframe: 'Within 24 hours',
      method: ['Email', 'Phone call'],
      priority: 3
    };
  } else {
    return {
      timeframe: 'Within 72 hours',
      method: ['Email'],
      priority: 4
    };
  }
}

function calculateApprovalProbability(formData: FormData, scores: any): number {
  // Base probability
  let probability = 50;

  // Credit score impact
  const creditScore = formData.loanDetails.creditScore;
  switch (creditScore) {
    case 'excellent-780+': probability += 30; break;
    case 'very-good-720-779': probability += 20; break;
    case 'good-660-719': probability += 10; break;
    case 'fair-600-659': probability -= 10; break;
    case 'needs-work-599': probability -= 25; break;
  }

  // Credit history impact
  switch (formData.loanDetails.creditHistory) {
    case 'none': probability += 15; break;
    case 'consumer-proposal': probability -= 5; break;
    case 'foreclosure': probability -= 15; break;
    case 'bankruptcy': probability -= 25; break;
  }

  // Property type impact
  switch (formData.loanDetails.propertyType) {
    case 'single-family': probability += 5; break;
    case 'condominium': probability += 0; break;
    case 'townhome': probability += 3; break;
    case 'multi-family': probability -= 5; break;
  }

  // Property usage impact
  switch (formData.loanDetails.propertyUsage) {
    case 'primary-home': probability += 10; break;
    case 'secondary-home': probability += 0; break;
    case 'rental': probability -= 5; break;
  }

  // Homeowner status
  if (formData.loanDetails.isHomeowner) {
    probability += 10;
  }

  return Math.max(0, Math.min(100, Math.round(probability)));
}

// Lead routing based on score
export function getLeadRouting(leadScore: LeadScore) {
  if (leadScore.totalScore >= 85) {
    return {
      assignTo: 'Senior Loan Officer',
      team: 'High-Value Team',
      specialHandling: true
    };
  } else if (leadScore.totalScore >= 70) {
    return {
      assignTo: 'Experienced Loan Officer',
      team: 'Primary Team',
      specialHandling: false
    };
  } else if (leadScore.totalScore >= 55) {
    return {
      assignTo: 'Junior Loan Officer',
      team: 'Standard Team',
      specialHandling: false
    };
  } else {
    return {
      assignTo: 'Lead Development Team',
      team: 'Nurture Team',
      specialHandling: false
    };
  }
}

// Generate lead summary for CRM
export function generateLeadSummary(formData: FormData, leadScore: LeadScore): string {
  const routing = getLeadRouting(leadScore);

  return `
LEAD SUMMARY - Grade ${leadScore.grade} (${leadScore.totalScore}/100)

CONTACT: ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}
EMAIL: ${formData.personalInfo.email}
PHONE: ${formData.personalInfo.phone}

LOAN DETAILS:
- Homeowner: ${formData.loanDetails.isHomeowner ? 'Yes' : 'No'}
- Property Type: ${formData.loanDetails.propertyType || 'Not specified'}
- Property Usage: ${formData.loanDetails.propertyUsage || 'Not specified'}
- Property Value Range: ${formData.loanDetails.propertyValue || 'Not specified'}
- Loan Amount Range: ${formData.loanDetails.loanAmount || 'Not specified'}
- Loan Purpose: ${formData.loanDetails.loanPurpose || 'Not specified'}
- Current Mortgages: ${formData.loanDetails.currentMortgages || 'Not specified'}
- Province: ${formData.loanDetails.province || 'Not specified'}

FINANCIAL PROFILE:
- Credit Score: ${formData.loanDetails.creditScore || 'Not specified'}
- Credit History: ${formData.loanDetails.creditHistory || 'Not specified'}
- Annual Income: $${formData.financialInfo.annualIncome?.toLocaleString() || 'Not specified'}
- Employment: ${formData.financialInfo.employmentStatus || 'Not specified'}

SCORING:
- Approval Probability: ${leadScore.approvalProbability}%
- Priority: ${leadScore.priority}
- Follow-up: ${leadScore.followUpStrategy.timeframe}

ROUTING:
- Assign to: ${routing.assignTo}
- Team: ${routing.team}

RECOMMENDATIONS:
${leadScore.recommendations.map(rec => `- ${rec}`).join('\n')}
  `.trim();
}