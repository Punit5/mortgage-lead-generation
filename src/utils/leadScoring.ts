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
  const creditScore = formData.financialInfo.creditScore;

  switch (creditScore) {
    case 'excellent': return 100;
    case 'good': return 70;
    case 'fair': return 50;
    case 'poor': return 25;
    default: return 60; // Unknown
  }
}

function scoreFinancialStability(formData: FormData): number {
  let score = 0;

  // Income scoring (40 points)
  const income = formData.financialInfo.annualIncome;
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

  // Debt-to-income ratio (30 points)
  const monthlyIncome = income / 12;
  const debtRatio = formData.financialInfo.monthlyDebts / monthlyIncome;

  if (debtRatio <= 0.15) score += 30;
  else if (debtRatio <= 0.25) score += 25;
  else if (debtRatio <= 0.35) score += 15;
  else if (debtRatio <= 0.45) score += 10;
  else score += 0;

  return Math.min(100, score);
}

function scoreUrgency(formData: FormData): number {
  let score = 50; // Base score

  // Timeline urgency
  switch (formData.loanDetails.timeline) {
    case '30-days': score += 40; break;
    case '60-days': score += 30; break;
    case '90-days': score += 20; break;
    case 'no-rush': score += 0; break;
    default: score += 0;
  }

  // Loan purpose urgency
  switch (formData.loanDetails.purpose) {
    case 'purchase': score += 10; break;
    case 'refinance': score += 5; break;
    case 'cash-out-refinance': score += 15; break;
  }

  return Math.min(100, score);
}

function scoreLoanViability(formData: FormData): number {
  let score = 0;

  // Loan-to-value ratio (40 points)
  const loanAmount = formData.loanDetails.amount;
  const propertyValue = formData.propertyInfo.propertyValue;
  const ltv = loanAmount / propertyValue;

  if (ltv <= 0.65) score += 40;
  else if (ltv <= 0.75) score += 35;
  else if (ltv <= 0.80) score += 30;
  else if (ltv <= 0.85) score += 20;
  else if (ltv <= 0.95) score += 10;
  else score += 0;

  // Down payment (30 points)
  const downPaymentPercent = (formData.propertyInfo.downPayment / propertyValue) * 100;
  if (downPaymentPercent >= 25) score += 30;
  else if (downPaymentPercent >= 20) score += 25;
  else if (downPaymentPercent >= 15) score += 20;
  else if (downPaymentPercent >= 10) score += 15;
  else if (downPaymentPercent >= 5) score += 10;
  else score += 0;

  // Loan amount reasonableness (30 points)
  if (loanAmount >= 100000 && loanAmount <= 2000000) score += 30;
  else if (loanAmount >= 50000 && loanAmount < 100000) score += 20;
  else if (loanAmount > 2000000 && loanAmount <= 3000000) score += 25;
  else score += 10;

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
  const downPaymentPercent = (formData.propertyInfo.downPayment / formData.propertyInfo.propertyValue) * 100;
  if (downPaymentPercent < 20) {
    recommendations.push('Discuss mortgage insurance options');
  }

  if (formData.financialInfo.employmentStatus === 'self-employed') {
    recommendations.push('Prepare for additional documentation requirements');
  }

  if (formData.propertyInfo.firstTimeHomeBuyer) {
    recommendations.push('Present first-time buyer programs and incentives');
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
  const creditScore = formData.financialInfo.creditScore;
  switch (creditScore) {
    case 'excellent': probability += 30; break;
    case 'good': probability += 10; break;
    case 'fair': probability -= 10; break;
    case 'poor': probability -= 25; break;
  }

  // Income impact
  const income = formData.financialInfo.annualIncome;
  const loanAmount = formData.loanDetails.amount;
  const incomeMultiple = loanAmount / income;

  if (incomeMultiple <= 3) probability += 15;
  else if (incomeMultiple <= 4) probability += 10;
  else if (incomeMultiple <= 5) probability += 0;
  else probability -= 15;

  // Down payment impact
  const downPaymentPercent = (formData.propertyInfo.downPayment / formData.propertyInfo.propertyValue) * 100;
  if (downPaymentPercent >= 25) probability += 15;
  else if (downPaymentPercent >= 20) probability += 10;
  else if (downPaymentPercent >= 15) probability += 5;
  else if (downPaymentPercent < 5) probability -= 20;

  // Employment status impact
  switch (formData.financialInfo.employmentStatus) {
    case 'employed': probability += 10; break;
    case 'self-employed': probability -= 5; break;
    case 'unemployed': probability -= 30; break;
    default: probability -= 5; break;
  }

  // Property type impact
  switch (formData.loanDetails.propertyType) {
    case 'single-family': probability += 5; break;
    case 'condo': probability += 0; break;
    case 'townhouse': probability += 3; break;
    case 'multi-family': probability -= 5; break;
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
- Amount: $${formData.loanDetails.amount.toLocaleString()}
- Property Value: $${formData.propertyInfo.propertyValue.toLocaleString()}
- Down Payment: $${formData.propertyInfo.downPayment.toLocaleString()} (${Math.round((formData.propertyInfo.downPayment / formData.propertyInfo.propertyValue) * 100)}%)
- Purpose: ${formData.loanDetails.purpose}
- Timeline: ${formData.loanDetails.timeline}

FINANCIAL PROFILE:
- Annual Income: $${formData.financialInfo.annualIncome.toLocaleString()}
- Credit Score: ${formData.financialInfo.creditScore}
- Employment: ${formData.financialInfo.employmentStatus}
- Monthly Debts: $${formData.financialInfo.monthlyDebts.toLocaleString()}

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