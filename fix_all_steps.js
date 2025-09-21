// This script will help identify what changes need to be made to all steps
const fs = require('fs');
const path = require('path');

const steps = [
  'Step3PropertyUsage.tsx',
  'Step4PropertyValue.tsx',
  'Step5CurrentMortgages.tsx',
  'Step6LoanAmount.tsx',
  'Step7LoanPurpose.tsx',
  'Step8CreditHistory.tsx',
  'Step9CreditScore.tsx',
  'Step10Province.tsx',
  'Step11ContactInfo.tsx'
];

steps.forEach(step => {
  const filePath = path.join('src/components/forms', step);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for dark background elements
    const hasDarkBg = content.includes('bg-gray-800') || content.includes('text-white');
    const hasAutoNext = content.includes('setTimeout(nextStep') || content.includes('setTimeout(handleNext');

    console.log(`${step}:`);
    console.log(`  - Has dark background: ${hasDarkBg}`);
    console.log(`  - Has auto navigation: ${hasAutoNext}`);
    console.log('');
  }
});