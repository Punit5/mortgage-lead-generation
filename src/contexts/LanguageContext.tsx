import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  changeLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string, params?: Record<string, any>): string => {
    let translation = (translations[language] as any)[key] || key;

    // Handle parameter substitution
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translations object
const translations = {
  en: {
    // Navigation
    'nav.getStarted': 'Get Started',
    'nav.preApproval': 'Pre-Approval',
    'nav.refinance': 'Refinance',
    'nav.firstTimeBuyer': 'First-Time Buyer',
    'navbar.home': 'Home',
    'navbar.getPreApproved': 'Get Pre-Approved',
    'navbar.refinance': 'Refinance',
    'navbar.firstTimeBuyers': 'First-Time Buyers',
    'navbar.checkYourRate': 'Check Your Rate',

    // Step 1 - Homeowner Status
    'step1.title': 'Expert Mortgage & Finance Advice 🇨🇦',
    'step1.question': 'Are you a homeowner?',
    'step1.tooltip': 'This helps us provide you with the most relevant mortgage options',
    'step1.questionTooltip': 'This information helps us provide you with the most relevant mortgage options',
    'step1.yes.title': 'Yes, I own a home',
    'step1.yes.description': 'Refinance, home equity, or second mortgage',
    'step1.no.title': "No, I'm looking to buy",
    'step1.no.description': 'First-time buyer or purchasing a new home',
    'step1.timeEstimate': 'Takes only 2 minutes',

    // Step 2 - Property Type
    'step2.title': 'Property Information',
    'step2.question': 'What type of property?',
    'step2.tooltip': 'Choose the option that best describes your property',
    'step2.singleFamily': 'Single Family Home',
    'step2.singleFamily.desc': 'Detached house with your own land',
    'step2.townhome': 'Town Home',
    'step2.townhome.desc': 'Multi-level home sharing walls',
    'step2.condo': 'Condominium',
    'step2.condo.desc': 'Unit in a shared building',
    'step2.multiFamily': 'Multi Family Home',
    'step2.multiFamily.desc': 'Property with multiple units',
    'step2.progress': 'Almost there!',

    // Step 3 - Property Usage
    'step3.title': 'Property Usage',
    'step3.question': 'How do you use this property?',
    'step3.tooltip': 'Select the option that best describes your intended use',
    'step3.primary': 'Primary Home',
    'step3.primary.desc': 'This is where you live most of the time',
    'step3.secondary': 'Secondary Home',
    'step3.secondary.desc': 'Vacation home or weekend retreat',
    'step3.rental': 'Rental Property',
    'step3.rental.desc': 'Investment property for rental income',
    'step3.progress': "You're doing great!",

    // Step 4 - Property Value
    'step4.title': 'Property Value',
    'step4.question': 'What is the estimated property value?',
    'step4.tooltip': 'Select the range that best matches your property\'s value',
    'step4.progress': 'Making great progress!',

    // Step 5 - Current Mortgages
    'step5.title': 'Current Mortgages',
    'step5.question': 'How many mortgages do you have on this property?',
    'step5.tooltip': 'This helps us understand your current financial obligations',
    'step5.paidOff': "It's Paid Off",
    'step5.paidOff.desc': 'No existing mortgage payments',
    'step5.one': 'One Mortgage',
    'step5.one.desc': 'Single mortgage payment',
    'step5.two': 'Two Mortgages',
    'step5.two.desc': 'Multiple mortgage payments',
    'step5.progress': 'Halfway there!',

    // Step 6 - Loan Amount
    'step6.title': 'Loan Amount',
    'step6.question': 'How much would you like to borrow?',
    'step6.tooltip': 'Select the amount that meets your financing needs',
    'step6.progress': 'More than halfway!',

    // Step 7 - Loan Purpose
    'step7.title': 'Loan Purpose',
    'step7.question': 'What are you using this loan for?',
    'step7.tooltip': 'Select your primary reason for seeking financing',
    'step7.homeImprovement': 'Home Improvement',
    'step7.homeImprovement.desc': 'Renovations, upgrades & repairs',
    'step7.retirement': 'Retirement Income',
    'step7.retirement.desc': 'Supplemental retirement funds',
    'step7.debtConsolidation': 'Debt Consolidation',
    'step7.debtConsolidation.desc': 'Combine multiple debts',
    'step7.investment': 'Investment Purposes',
    'step7.investment.desc': 'Business or investment opportunities',
    'step7.progress': 'Great momentum!',

    // Step 8 - Credit History
    'step8.title': 'Credit History',
    'step8.question': 'Have you had any of the following in the last 7 years?',
    'step8.tooltip': 'Select any that apply to your financial history',
    'step8.bankruptcy': 'Bankruptcy',
    'step8.bankruptcy.desc': 'Filed for bankruptcy protection',
    'step8.foreclosure': 'Foreclosure',
    'step8.foreclosure.desc': 'Property foreclosure proceeding',
    'step8.consumerProposal': 'Consumer Proposal',
    'step8.consumerProposal.desc': 'Formal debt restructuring agreement',
    'step8.none': 'None of the Above',
    'step8.none.desc': 'Clean credit history',
    'step8.progress': 'Almost done!',

    // Step 9 - Credit Score
    'step9.title': 'Credit Score',
    'step9.question': 'What is your estimated credit score?',
    'step9.tooltip': 'Select your estimated credit score range',
    'step9.excellent': 'Excellent (780+)',
    'step9.excellent.desc': 'Outstanding credit rating',
    'step9.veryGood': 'Very Good (720-779)',
    'step9.veryGood.desc': 'Strong credit history',
    'step9.good': 'Good (660-719)',
    'step9.good.desc': 'Solid credit standing',
    'step9.fair': 'Fair (600-659)',
    'step9.fair.desc': 'Average credit score',
    'step9.needsWork': 'Needs Work (<599)',
    'step9.needsWork.desc': 'Room for improvement',
    'step9.progress': 'Nearly there!',

    // Step 10 - Province
    'step10.title': 'Your Province',
    'step10.question': 'Please select your province',
    'step10.tooltip': 'This helps us provide province-specific mortgage options',
    'step10.questionTooltip': 'This helps us provide province-specific mortgage options',
    'step10.progress': 'One more step!',

    // Step 11 - Contact Info
    'step11.title': 'Expert Mortgage & Finance Advice 🇨🇦 • Contact info ℹ️',
    'step11.firstName': 'First name',
    'step11.lastName': 'Last name',
    'step11.email': 'Email address',
    'step11.phone': 'Phone number',
    'step11.phoneNote': 'We\'ll use this to provide you with your personalized rate quote',
    'step11.submit': 'Get My FREE Rate Quote!',
    'step11.submitNote': 'No credit check • Instant results',
    'step11.whatNext': 'What happens next?',
    'step11.instant': 'Instant Results',
    'step11.instant.desc': 'Get your rate quote immediately',
    'step11.contact': 'Expert Contact',
    'step11.contact.desc': 'Licensed broker calls within 24hrs',
    'step11.rates': 'Best Rates',
    'step11.rates.desc': 'Compare offers from multiple lenders',

    // Common
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.step': 'Step',
    'common.of': 'of',
    'common.stepProgress': 'Step {{current}} of {{total}}',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',

    // Validation Errors
    'error.required': 'This field is required',
    'error.email': 'Please enter a valid email address',
    'error.phone': 'Please enter a valid phone number',
    'error.selectHomeowner': 'Please select if you are a homeowner',
    'error.selectPropertyType': 'Please select a property type',
    'error.selectPropertyUsage': 'Please select property usage',
    'error.selectPropertyValue': 'Please select property value range',
    'error.selectCurrentMortgages': 'Please select current mortgages status',
    'error.selectLoanAmount': 'Please select loan amount range',
    'error.selectLoanPurpose': 'Please select loan purpose',
    'error.selectCreditHistory': 'Please select credit history option',
    'error.selectCreditScore': 'Please select credit score range',
    'error.selectProvince': 'Please select a province',

    // Trust Indicators
    'trust.secure': 'Secure & Encrypted',
    'trust.noCredit': 'No Credit Impact',
    'trust.fast': 'Fast & Free'
  },
  fr: {
    // Navigation
    'nav.getStarted': 'Commencer',
    'nav.preApproval': 'Pré-approbation',
    'nav.refinance': 'Refinancement',
    'nav.firstTimeBuyer': 'Premier Acheteur',
    'navbar.home': 'Accueil',
    'navbar.getPreApproved': 'Obtenir une pré-approbation',
    'navbar.refinance': 'Refinancement',
    'navbar.firstTimeBuyers': 'Premiers acheteurs',
    'navbar.checkYourRate': 'Vérifiez votre taux',

    // Step 1 - Homeowner Status
    'step1.title': 'Conseils Hypothécaires et Financiers Experts 🇨🇦',
    'step1.question': 'Êtes-vous propriétaire?',
    'step1.tooltip': 'Cela nous aide à vous fournir les options hypothécaires les plus pertinentes',
    'step1.questionTooltip': 'Cette information nous aide à vous fournir les options hypothécaires les plus pertinentes',
    'step1.yes.title': 'Oui, je possède une maison',
    'step1.yes.description': 'Refinancement, équité domiciliaire, ou deuxième hypothèque',
    'step1.no.title': 'Non, je cherche à acheter',
    'step1.no.description': 'Premier acheteur ou achat d\'une nouvelle maison',
    'step1.timeEstimate': 'Prend seulement 2 minutes',

    // Step 2 - Property Type
    'step2.title': 'Information sur la Propriété',
    'step2.question': 'Quel type de propriété?',
    'step2.tooltip': 'Choisissez l\'option qui décrit le mieux votre propriété',
    'step2.singleFamily': 'Maison Unifamiliale',
    'step2.singleFamily.desc': 'Maison détachée avec votre propre terrain',
    'step2.townhome': 'Maison de Ville',
    'step2.townhome.desc': 'Maison à plusieurs niveaux partageant des murs',
    'step2.condo': 'Condominium',
    'step2.condo.desc': 'Unité dans un bâtiment partagé',
    'step2.multiFamily': 'Maison Multifamiliale',
    'step2.multiFamily.desc': 'Propriété avec plusieurs unités',
    'step2.progress': 'Presque là!',

    // Step 3 - Property Usage
    'step3.title': 'Usage de la Propriété',
    'step3.question': 'Comment utilisez-vous cette propriété?',
    'step3.tooltip': 'Sélectionnez l\'option qui décrit le mieux votre usage prévu',
    'step3.primary': 'Résidence Principale',
    'step3.primary.desc': 'C\'est là où vous vivez la plupart du temps',
    'step3.secondary': 'Résidence Secondaire',
    'step3.secondary.desc': 'Maison de vacances ou retraite de week-end',
    'step3.rental': 'Propriété de Location',
    'step3.rental.desc': 'Propriété d\'investissement pour revenus locatifs',
    'step3.progress': 'Vous faites du excellent travail!',

    // Step 4 - Property Value
    'step4.title': 'Valeur de la Propriété',
    'step4.question': 'Quelle est la valeur estimée de la propriété?',
    'step4.tooltip': 'Sélectionnez la gamme qui correspond le mieux à la valeur de votre propriété',
    'step4.progress': 'Excellent progrès!',

    // Step 5 - Current Mortgages
    'step5.title': 'Hypothèques Actuelles',
    'step5.question': 'Combien d\'hypothèques avez-vous sur cette propriété?',
    'step5.tooltip': 'Cela nous aide à comprendre vos obligations financières actuelles',
    'step5.paidOff': 'C\'est Payé',
    'step5.paidOff.desc': 'Aucun paiement hypothécaire existant',
    'step5.one': 'Une Hypothèque',
    'step5.one.desc': 'Paiement hypothécaire unique',
    'step5.two': 'Deux Hypothèques',
    'step5.two.desc': 'Paiements hypothécaires multiples',
    'step5.progress': 'À mi-chemin!',

    // Step 6 - Loan Amount
    'step6.title': 'Montant du Prêt',
    'step6.question': 'Combien aimeriez-vous emprunter?',
    'step6.tooltip': 'Sélectionnez le montant qui répond à vos besoins de financement',
    'step6.progress': 'Plus qu\'à mi-chemin!',

    // Step 7 - Loan Purpose
    'step7.title': 'Objectif du Prêt',
    'step7.question': 'À quoi utilisez-vous ce prêt?',
    'step7.tooltip': 'Sélectionnez votre raison principale pour demander un financement',
    'step7.homeImprovement': 'Amélioration de la Maison',
    'step7.homeImprovement.desc': 'Rénovations, améliorations et réparations',
    'step7.retirement': 'Revenu de Retraite',
    'step7.retirement.desc': 'Fonds de retraite supplémentaires',
    'step7.debtConsolidation': 'Consolidation de Dettes',
    'step7.debtConsolidation.desc': 'Combiner plusieurs dettes',
    'step7.investment': 'Fins d\'Investissement',
    'step7.investment.desc': 'Opportunités d\'affaires ou d\'investissement',
    'step7.progress': 'Excellent momentum!',

    // Step 8 - Credit History
    'step8.title': 'Historique de Crédit',
    'step8.question': 'Avez-vous eu l\'un des éléments suivants au cours des 7 dernières années?',
    'step8.tooltip': 'Sélectionnez tout ce qui s\'applique à votre historique financier',
    'step8.bankruptcy': 'Faillite',
    'step8.bankruptcy.desc': 'Déclaration de faillite',
    'step8.foreclosure': 'Saisie',
    'step8.foreclosure.desc': 'Procédure de saisie de propriété',
    'step8.consumerProposal': 'Proposition de Consommateur',
    'step8.consumerProposal.desc': 'Accord formel de restructuration de dettes',
    'step8.none': 'Aucun des Above',
    'step8.none.desc': 'Historique de crédit propre',
    'step8.progress': 'Presque terminé!',

    // Step 9 - Credit Score
    'step9.title': 'Cote de Crédit',
    'step9.question': 'Quelle est votre cote de crédit estimée?',
    'step9.tooltip': 'Sélectionnez votre gamme de cote de crédit estimée',
    'step9.excellent': 'Excellent (780+)',
    'step9.excellent.desc': 'Cote de crédit exceptionnelle',
    'step9.veryGood': 'Très Bon (720-779)',
    'step9.veryGood.desc': 'Historique de crédit solide',
    'step9.good': 'Bon (660-719)',
    'step9.good.desc': 'Statut de crédit solide',
    'step9.fair': 'Correct (600-659)',
    'step9.fair.desc': 'Cote de crédit moyenne',
    'step9.needsWork': 'À Améliorer (<599)',
    'step9.needsWork.desc': 'Place à l\'amélioration',
    'step9.progress': 'Presque là!',

    // Step 10 - Province
    'step10.title': 'Votre Province',
    'step10.question': 'Veuillez sélectionner votre province',
    'step10.tooltip': 'Cela nous aide à fournir des options hypothécaires spécifiques à la province',
    'step10.questionTooltip': 'Cela nous aide à fournir des options hypothécaires spécifiques à la province',
    'step10.progress': 'Une étape de plus!',

    // Step 11 - Contact Info
    'step11.title': 'Conseils Hypothécaires et Financiers Experts 🇨🇦 • Info de contact ℹ️',
    'step11.firstName': 'Prénom',
    'step11.lastName': 'Nom de famille',
    'step11.email': 'Adresse courriel',
    'step11.phone': 'Numéro de téléphone',
    'step11.phoneNote': 'Nous utiliserons ceci pour vous fournir votre devis de taux personnalisé',
    'step11.submit': 'Obtenez Mon Devis de Taux GRATUIT!',
    'step11.submitNote': 'Aucune vérification de crédit • Résultats instantanés',
    'step11.whatNext': 'Que se passe-t-il ensuite?',
    'step11.instant': 'Résultats Instantanés',
    'step11.instant.desc': 'Obtenez votre devis de taux immédiatement',
    'step11.contact': 'Contact Expert',
    'step11.contact.desc': 'Un courtier licencié appelle dans les 24h',
    'step11.rates': 'Meilleurs Taux',
    'step11.rates.desc': 'Comparez les offres de plusieurs prêteurs',

    // Common
    'common.continue': 'Continuer',
    'common.back': 'Retour',
    'common.step': 'Étape',
    'common.of': 'de',
    'common.stepProgress': 'Étape {{current}} de {{total}}',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',

    // Validation Errors
    'error.required': 'Ce champ est requis',
    'error.email': 'Veuillez entrer une adresse courriel valide',
    'error.phone': 'Veuillez entrer un numéro de téléphone valide',
    'error.selectHomeowner': 'Veuillez sélectionner si vous êtes propriétaire',
    'error.selectPropertyType': 'Veuillez sélectionner un type de propriété',
    'error.selectPropertyUsage': 'Veuillez sélectionner l\'usage de la propriété',
    'error.selectPropertyValue': 'Veuillez sélectionner la gamme de valeur de propriété',
    'error.selectCurrentMortgages': 'Veuillez sélectionner le statut des hypothèques actuelles',
    'error.selectLoanAmount': 'Veuillez sélectionner la gamme de montant de prêt',
    'error.selectLoanPurpose': 'Veuillez sélectionner l\'objectif du prêt',
    'error.selectCreditHistory': 'Veuillez sélectionner l\'option d\'historique de crédit',
    'error.selectCreditScore': 'Veuillez sélectionner la gamme de cote de crédit',
    'error.selectProvince': 'Veuillez sélectionner une province',

    // Trust Indicators
    'trust.secure': 'Sécurisé et Crypté',
    'trust.noCredit': 'Aucun Impact sur le Crédit',
    'trust.fast': 'Rapide et Gratuit'
  }
};