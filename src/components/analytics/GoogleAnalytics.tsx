import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual Google Analytics ID

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

// Event tracking functions
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
};

export const trackInspectionRequest = (inspectionType: string, location: string) => {
  trackEvent('inspection_request', {
    inspection_type: inspectionType,
    location: location,
    value: 1
  });
};

export const trackAgentRegistration = () => {
  trackEvent('agent_registration', {
    event_category: 'engagement',
    event_label: 'agent_signup'
  });
};

export const trackClientRegistration = () => {
  trackEvent('client_registration', {
    event_category: 'engagement',
    event_label: 'client_signup'
  });
};

export const trackPaymentInitiated = (amount: number, currency: string = 'USD') => {
  trackEvent('begin_checkout', {
    currency: currency,
    value: amount,
    event_category: 'ecommerce'
  });
};

export const trackPaymentCompleted = (transactionId: string, amount: number, currency: string = 'USD') => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: currency,
    value: amount,
    event_category: 'ecommerce'
  });
};
