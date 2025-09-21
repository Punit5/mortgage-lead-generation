import { FormData } from '../types';

// Analytics event types
export interface AnalyticsEvent {
  eventName: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
  userId?: string;
}

// Conversion funnel tracking
export interface FunnelStep {
  step: string;
  timestamp: Date;
  properties?: Record<string, any>;
}

class AnalyticsManager {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private funnelSteps: FunnelStep[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking() {
    // Track page load
    this.track('page_load', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date()
    });

    // Track session start
    this.track('session_start', {
      sessionId: this.sessionId
    });
  }

  // Main tracking method
  track(eventName: string, properties: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        url: window.location.href,
        timestamp: new Date().toISOString()
      },
      timestamp: new Date(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.events.push(event);

    // Send to analytics providers
    this.sendToProviders(event);

    // Store in localStorage for debugging
    this.storeLocally(event);

    console.log('Analytics Event:', event);
  }

  // Track form interactions
  trackFormStep(stepNumber: number, stepName: string, formData?: Partial<FormData>) {
    this.track('form_step_completed', {
      step_number: stepNumber,
      step_name: stepName,
      form_data: formData ? this.sanitizeFormData(formData) : undefined
    });

    this.funnelSteps.push({
      step: `step_${stepNumber}_${stepName}`,
      timestamp: new Date(),
      properties: { stepNumber, stepName }
    });
  }

  // Track form abandonment
  trackFormAbandonment(stepNumber: number, timeSpent: number) {
    this.track('form_abandonment', {
      step_number: stepNumber,
      time_spent_seconds: timeSpent,
      completion_percentage: (stepNumber / 11) * 100
    });
  }

  // Track conversion events
  trackConversion(conversionType: 'form_submission' | 'lead_capture' | 'exit_intent', formData?: FormData) {
    const sanitizedData = formData ? this.sanitizeFormData(formData) : undefined;

    this.track('conversion', {
      conversion_type: conversionType,
      form_data: sanitizedData,
      funnel_steps: this.funnelSteps.length,
      time_to_conversion: this.calculateTimeToConversion()
    });
  }

  // Track user interactions
  trackInteraction(interactionType: string, element: string, properties: Record<string, any> = {}) {
    this.track('user_interaction', {
      interaction_type: interactionType,
      element,
      ...properties
    });
  }

  // Track errors
  trackError(errorType: string, errorMessage: string, context?: Record<string, any>) {
    this.track('error', {
      error_type: errorType,
      error_message: errorMessage,
      context
    });
  }

  // Track performance metrics
  trackPerformance() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      const paint = performance.getEntriesByType('paint');

      this.track('performance', {
        page_load_time: navigation?.loadEventEnd - navigation?.loadEventStart,
        dom_content_loaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        first_paint: paint.find(entry => entry.name === 'first-paint')?.startTime,
        first_contentful_paint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime
      });
    }
  }

  // A/B testing
  trackExperiment(experimentName: string, variant: string) {
    this.track('experiment_exposure', {
      experiment_name: experimentName,
      variant
    });
  }

  // Heat mapping and scroll tracking
  trackScrollDepth(percentage: number) {
    this.track('scroll_depth', {
      percentage,
      max_scroll: Math.max(percentage, this.getProperty('max_scroll') || 0)
    });
  }

  // Lead quality scoring
  trackLeadScore(score: number, grade: string, factors: Record<string, number>) {
    this.track('lead_scoring', {
      score,
      grade,
      factors
    });
  }

  // Marketing attribution
  trackAttribution() {
    const urlParams = new URLSearchParams(window.location.search);
    const attribution = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_content: urlParams.get('utm_content'),
      utm_term: urlParams.get('utm_term'),
      referrer: document.referrer,
      landing_page: window.location.href
    };

    this.track('attribution', attribution);
    return attribution;
  }

  // Device and browser info
  trackDeviceInfo() {
    this.track('device_info', {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_pixel_ratio: window.devicePixelRatio,
      color_depth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookie_enabled: navigator.cookieEnabled
    });
  }

  // Set user ID
  setUserId(userId: string) {
    this.userId = userId;
    this.track('user_identified', { userId });
  }

  // User properties
  setUserProperties(properties: Record<string, any>) {
    this.track('user_properties_updated', properties);
  }

  private sanitizeFormData(formData: Partial<FormData>): Record<string, any> {
    // Remove sensitive information and sanitize data for analytics
    const sanitized: any = {};

    if (formData.loanDetails) {
      sanitized.is_homeowner = formData.loanDetails.isHomeowner;
      sanitized.property_type = formData.loanDetails.propertyType;
      sanitized.property_usage = formData.loanDetails.propertyUsage;
      sanitized.property_value = formData.loanDetails.propertyValue;
      sanitized.current_mortgages = formData.loanDetails.currentMortgages;
      sanitized.loan_amount = formData.loanDetails.loanAmount;
      sanitized.loan_purpose = formData.loanDetails.loanPurpose;
      sanitized.credit_history = formData.loanDetails.creditHistory;
      sanitized.credit_score = formData.loanDetails.creditScore;
      sanitized.province = formData.loanDetails.province;
    }

    if (formData.propertyInfo) {
      sanitized.property_value_numeric = formData.propertyInfo.propertyValue;
      sanitized.down_payment = formData.propertyInfo.downPayment;
      sanitized.down_payment_percentage = formData.propertyInfo.propertyValue > 0 ? Math.round((formData.propertyInfo.downPayment / formData.propertyInfo.propertyValue) * 100) : 0;
      sanitized.first_time_buyer = formData.propertyInfo.firstTimeHomeBuyer;
    }

    if (formData.financialInfo) {
      sanitized.employment_status = formData.financialInfo.employmentStatus;
      // Income ranges instead of exact amounts
      sanitized.income_range = this.getIncomeRange(formData.financialInfo.annualIncome);
    }

    if (formData.personalInfo) {
      // Only include non-sensitive contact preferences
      sanitized.has_contact_info = !!(formData.personalInfo.firstName && formData.personalInfo.email);
    }

    return sanitized;
  }

  private getIncomeRange(income: number): string {
    if (income < 30000) return 'under_30k';
    if (income < 50000) return '30k_50k';
    if (income < 75000) return '50k_75k';
    if (income < 100000) return '75k_100k';
    if (income < 150000) return '100k_150k';
    if (income < 200000) return '150k_200k';
    return 'over_200k';
  }

  private calculateTimeToConversion(): number {
    if (this.funnelSteps.length === 0) return 0;
    const firstStep = this.funnelSteps[0];
    const lastStep = this.funnelSteps[this.funnelSteps.length - 1];
    return (lastStep.timestamp.getTime() - firstStep.timestamp.getTime()) / 1000; // seconds
  }

  private sendToProviders(event: AnalyticsEvent) {
    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', event.eventName, event.properties);
    }

    // Facebook Pixel
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', event.eventName, event.properties);
    }

    // Mixpanel
    if (typeof (window as any).mixpanel !== 'undefined') {
      (window as any).mixpanel.track(event.eventName, event.properties);
    }

    // Custom analytics endpoint
    this.sendToCustomEndpoint(event);
  }

  private sendToCustomEndpoint(event: AnalyticsEvent) {
    // Send to your custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    }).catch(error => {
      console.error('Failed to send analytics event:', error);
    });
  }

  private storeLocally(event: AnalyticsEvent) {
    try {
      const stored = localStorage.getItem('analytics_events') || '[]';
      const events = JSON.parse(stored);
      events.push(event);

      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }

      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Failed to store analytics event locally:', error);
    }
  }

  private getProperty(key: string): any {
    const lastEvent = this.events.find(e => e.properties[key] !== undefined);
    return lastEvent?.properties[key];
  }

  // Get analytics summary
  getAnalyticsSummary() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      totalEvents: this.events.length,
      funnelSteps: this.funnelSteps.length,
      sessionDuration: this.calculateSessionDuration(),
      conversionEvents: this.events.filter(e => e.eventName === 'conversion').length
    };
  }

  private calculateSessionDuration(): number {
    if (this.events.length === 0) return 0;
    const firstEvent = this.events[0];
    const lastEvent = this.events[this.events.length - 1];
    return (lastEvent.timestamp.getTime() - firstEvent.timestamp.getTime()) / 1000;
  }
}

// Global analytics instance
export const analytics = new AnalyticsManager();

// Convenience functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  analytics.track(eventName, properties);
};

export const trackFormStep = (stepNumber: number, stepName: string, formData?: Partial<FormData>) => {
  analytics.trackFormStep(stepNumber, stepName, formData);
};

export const trackConversion = (type: 'form_submission' | 'lead_capture' | 'exit_intent', formData?: FormData) => {
  analytics.trackConversion(type, formData);
};

export const trackInteraction = (type: string, element: string, properties?: Record<string, any>) => {
  analytics.trackInteraction(type, element, properties);
};

export const trackError = (type: string, message: string, context?: Record<string, any>) => {
  analytics.trackError(type, message, context);
};

// React hook for analytics
export function useAnalytics() {
  return {
    track: trackEvent,
    trackFormStep,
    trackConversion,
    trackInteraction,
    trackError,
    setUserId: analytics.setUserId.bind(analytics),
    setUserProperties: analytics.setUserProperties.bind(analytics)
  };
}

// Initialize analytics on load
analytics.trackAttribution();
analytics.trackDeviceInfo();
analytics.trackPerformance();

// Track page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    analytics.track('page_hidden');
  } else {
    analytics.track('page_visible');
  }
});

// Track beforeunload for session end
window.addEventListener('beforeunload', () => {
  analytics.track('session_end', {
    session_duration: analytics.getAnalyticsSummary().sessionDuration
  });
});

export default analytics;