# Mortgage Lead Generation Website

A complete, production-ready React application for mortgage lead generation built with modern technologies and optimized for conversion.

## 🚀 Features

### Core Functionality
- **Multi-Step Form Application**: 4-step progressive lead capture with validation
- **Real-time Mortgage Calculator**: Dynamic payment calculations with live updates
- **Refinance Calculator**: Savings calculator with integrated lead capture
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Real-time validation with helpful error messages
- **State Management**: React Context for form persistence across steps

### Pages
- **Homepage**: Hero section with calculator and current rates
- **Pre-approval Page**: Complete multi-step application form
- **Refinance Calculator**: Dedicated refinance savings tool
- **First-time Buyer Page**: Targeted landing page with special programs
- **Thank You Page**: Conversion confirmation with next steps

### Lead Generation Strategy
- Progressive disclosure starting with engaging questions
- Multiple capture points throughout the user journey
- Urgency messaging ("Rates change daily")
- Trust indicators and social proof
- Mobile-optimized forms for maximum conversion

## 🛠 Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hooks** (useState, useEffect, useContext)
- **Vanilla JavaScript** for calculations (no external math libraries)
- **React Context** for state management (no localStorage/sessionStorage)

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd mortgage-leads
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment

### Static Hosting (Netlify, Vercel, etc.)
1. Run `npm run build`
2. Deploy the `build` folder to your hosting provider

### Traditional Web Server
1. Run `npm run build`
2. Serve the `build` folder with any static file server:
```bash
npm install -g serve
serve -s build
```

## 📊 Lead Data Capture

All form submissions are logged to the console for testing. In production, you'll want to:

1. **Replace console.log statements** in the following files:
   - `src/components/forms/Step1LoanDetails.tsx`
   - `src/components/forms/Step2PropertyInfo.tsx`
   - `src/components/forms/Step3PersonalInfo.tsx`
   - `src/components/forms/Step4FinancialInfo.tsx`
   - `src/pages/RefinancePage.tsx`
   - `src/pages/FirstTimeBuyerPage.tsx`
   - `src/pages/ThankYouPage.tsx`

2. **Integrate with your CRM/Backend**:
   - Send lead data to your lead management system
   - Set up email notifications
   - Configure lead routing rules

## 🎨 Customization

### Brand Colors
Update the primary color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... your brand colors
  }
}
```

### Content Updates
- Update company name and contact information in components
- Modify loan programs and rates in `src/context/AppContext.tsx`
- Customize form questions and validation rules
- Update testimonials and social proof elements

### Mortgage Rates
Update current rates in `src/context/AppContext.tsx`:
```javascript
currentRates: {
  thirtyYear: 7.125,
  fifteenYear: 6.625,
  fiveYear: 6.875
}
```

## 📱 Key Components

### MultiStepForm
Complete 4-step application process with:
- Loan details (amount, property type, purpose)
- Property information (location, value, down payment)
- Personal information (contact details)
- Financial details (credit score, income, employment)

### MortgageCalculator
Real-time payment calculator featuring:
- Principal & interest calculation
- Property taxes and insurance estimates
- PMI calculation for loans over 80% LTV
- Breakdown of monthly payment components

### Lead Capture Strategy
- **Step 1**: Easy engagement (loan amount, property type)
- **Step 2**: Qualification (property details, down payment)
- **Step 3**: Contact information (when user is committed)
- **Step 4**: Financial details (complete qualification)

## 🔧 Form Validation

Comprehensive validation includes:
- Email format validation
- Phone number format validation
- Loan amount limits ($50K - $2M)
- Down payment minimums (3% of property value)
- Income requirements ($25K minimum)
- Credit score selection requirement

## 📈 Conversion Optimization

The application includes multiple conversion optimization features:
- Mobile-first responsive design
- Progressive form disclosure
- Trust indicators and security badges
- Social proof elements
- Urgency messaging
- Clear calls-to-action
- Multiple lead capture points

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and ready for deployment.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for mortgage professionals who want to convert more leads online.
