import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

const pageMetadata: Record<string, SEOMetadata> = {
  '/': {
    title: 'EyesOnGround - Professional Remote Inspection Services | Trusted Agents Worldwide',
    description: 'Get professional remote inspections anywhere in the world. Our 500+ verified agents provide detailed reports, photos, and videos for vehicles, equipment, real estate, and marketplace purchases. Trusted by 2,500+ customers.',
    keywords: 'remote inspection, vehicle inspection, equipment inspection, real estate inspection, marketplace inspection, pre-purchase inspection, professional inspectors, verified agents',
    canonical: 'https://eyesonground.com/',
    ogImage: 'https://eyesonground.com/images/og-home.jpg',
    ogType: 'website'
  },
  '/services': {
    title: 'Our Services - Remote Inspection Solutions | EyesOnGround',
    description: 'Comprehensive remote inspection services including vehicle, equipment, real estate, and marketplace inspections. Professional reports with photos, videos, and expert analysis.',
    keywords: 'inspection services, remote inspection types, vehicle inspection, equipment inspection, real estate inspection, marketplace inspection',
    canonical: 'https://eyesonground.com/services'
  },
  '/vehicle-inspection': {
    title: 'Vehicle Inspection Services - Cars, Trucks, Motorcycles | EyesOnGround',
    description: 'Professional vehicle inspections for cars, trucks, motorcycles, and recreational vehicles. Get detailed condition reports before purchasing. Available nationwide.',
    keywords: 'vehicle inspection, car inspection, truck inspection, motorcycle inspection, pre-purchase vehicle inspection, automotive inspection',
    canonical: 'https://eyesonground.com/vehicle-inspection'
  },
  '/equipment-inspection': {
    title: 'Equipment Inspection Services - Heavy Machinery & Tools | EyesOnGround',
    description: 'Expert equipment inspections for heavy machinery, construction equipment, industrial tools, and specialized equipment. Professional condition assessments.',
    keywords: 'equipment inspection, heavy machinery inspection, construction equipment inspection, industrial equipment inspection',
    canonical: 'https://eyesonground.com/equipment-inspection'
  },
  '/real-estate-inspection': {
    title: 'Real Estate Inspection Services - Property Inspections | EyesOnGround',
    description: 'Comprehensive real estate inspections for residential and commercial properties. Professional property condition reports with detailed photos and analysis.',
    keywords: 'real estate inspection, property inspection, home inspection, commercial property inspection, building inspection',
    canonical: 'https://eyesonground.com/real-estate-inspection'
  },
  '/marketplace-inspection': {
    title: 'Marketplace Inspection Services - eBay, Amazon, Facebook | EyesOnGround',
    description: 'Professional inspections for online marketplace purchases. Verify item condition before buying from eBay, Facebook Marketplace, Craigslist, and more.',
    keywords: 'marketplace inspection, eBay inspection, Facebook marketplace inspection, online purchase inspection, item verification',
    canonical: 'https://eyesonground.com/marketplace-inspection'
  },
  '/about': {
    title: 'About EyesOnGround - Professional Remote Inspection Company',
    description: 'Learn about EyesOnGround\'s mission to provide trusted remote inspection services worldwide. Our story, values, and commitment to quality inspections.',
    keywords: 'about eyesonground, remote inspection company, professional inspectors, company history, inspection services',
    canonical: 'https://eyesonground.com/about'
  },
  '/reviews': {
    title: 'Customer Reviews & Testimonials - EyesOnGround Inspection Services',
    description: 'Read authentic customer reviews and testimonials about EyesOnGround\'s remote inspection services. See why 2,500+ customers trust our verified agents.',
    keywords: 'customer reviews, testimonials, inspection service reviews, eyesonground reviews, client feedback',
    canonical: 'https://eyesonground.com/reviews'
  },
  '/faq': {
    title: 'Frequently Asked Questions - Remote Inspection Services | EyesOnGround',
    description: 'Find answers to common questions about remote inspection services, pricing, process, and how our verified agents work. Get help before you start.',
    keywords: 'inspection FAQ, remote inspection questions, inspection process, inspection pricing, how inspections work',
    canonical: 'https://eyesonground.com/faq'
  },
  '/account-type': {
    title: 'Get Started - Request Inspection or Become an Agent | EyesOnGround',
    description: 'Choose your path: Request a professional inspection for your purchase or become a verified inspection agent. Join thousands of satisfied customers and agents.',
    keywords: 'get started, request inspection, become agent, inspection services, professional inspector',
    canonical: 'https://eyesonground.com/account-type'
  },
  '/clientregister': {
    title: 'Client Registration - Request Professional Inspections | EyesOnGround',
    description: 'Register as a client to request professional remote inspections. Get detailed reports for vehicles, equipment, real estate, and marketplace purchases.',
    keywords: 'client registration, request inspection, inspection services, remote inspection client',
    canonical: 'https://eyesonground.com/clientregister'
  },
  '/psiregister': {
    title: 'Agent Registration - Become a Professional Inspector | EyesOnGround',
    description: 'Join our network of 500+ verified inspection agents. Earn money providing professional inspection services in your area. Apply today.',
    keywords: 'agent registration, become inspector, inspection jobs, professional inspector, inspection agent',
    canonical: 'https://eyesonground.com/psiregister'
  },
  '/locations/new-york-city': {
    title: 'Professional Remote Inspections in New York City, NY | EyesOnGround',
    description: 'Get trusted vehicle, equipment, real estate, and marketplace inspections in NYC. Verified local agents serving all 5 boroughs with 24-48 hour reports.',
    keywords: 'NYC inspections, New York City vehicle inspection, Manhattan inspection services, Brooklyn inspections, Queens inspections, Bronx inspections',
    canonical: 'https://eyesonground.com/locations/new-york-city',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'EyesOnGround - New York City Inspections',
      'description': 'Professional remote inspection services in New York City',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'New York City',
        'addressRegion': 'NY',
        'addressCountry': 'US'
      },
      'areaServed': ['New York City', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
      'serviceType': ['Vehicle Inspection', 'Real Estate Inspection', 'Equipment Inspection', 'Marketplace Inspection']
    }
  },
  '/locations/los-angeles': {
    title: 'Professional Remote Inspections in Los Angeles, CA | EyesOnGround',
    description: 'Get trusted vehicle, equipment, real estate, and marketplace inspections in Los Angeles. Verified local agents serving LA County with detailed reports.',
    keywords: 'Los Angeles inspections, LA vehicle inspection, California inspection services, Hollywood inspections, Santa Monica inspections',
    canonical: 'https://eyesonground.com/locations/los-angeles',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'EyesOnGround - Los Angeles Inspections',
      'description': 'Professional remote inspection services in Los Angeles',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Los Angeles',
        'addressRegion': 'CA',
        'addressCountry': 'US'
      },
      'areaServed': ['Los Angeles', 'Santa Monica', 'Beverly Hills', 'West Hollywood', 'Pasadena', 'Glendale'],
      'serviceType': ['Vehicle Inspection', 'Real Estate Inspection', 'Equipment Inspection', 'Marketplace Inspection']
    }
  },
  '/locations/chicago': {
    title: 'Professional Remote Inspections in Chicago, IL | EyesOnGround',
    description: 'Get trusted vehicle, equipment, real estate, and marketplace inspections in Chicago. Verified local agents serving Chicagoland with detailed reports.',
    keywords: 'Chicago inspections, Chicago vehicle inspection, Illinois inspection services, downtown Chicago inspections, Chicagoland inspections',
    canonical: 'https://eyesonground.com/locations/chicago',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'EyesOnGround - Chicago Inspections',
      'description': 'Professional remote inspection services in Chicago',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Chicago',
        'addressRegion': 'IL',
        'addressCountry': 'US'
      },
      'areaServed': ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Evanston'],
      'serviceType': ['Vehicle Inspection', 'Real Estate Inspection', 'Equipment Inspection', 'Marketplace Inspection']
    }
  }
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[location.pathname] || pageMetadata['/'];
    
    // Update document title
    document.title = metadata.title;
    
    // Update meta description
    updateMetaTag('name', 'description', metadata.description);
    
    // Update keywords if provided
    if (metadata.keywords) {
      updateMetaTag('name', 'keywords', metadata.keywords);
    }
    
    // Update canonical URL
    updateLinkTag('canonical', metadata.canonical || `https://eyesonground.com${location.pathname}`);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', metadata.title);
    updateMetaTag('property', 'og:description', metadata.description);
    updateMetaTag('property', 'og:url', metadata.canonical || `https://eyesonground.com${location.pathname}`);
    updateMetaTag('property', 'og:type', metadata.ogType || 'website');
    
    if (metadata.ogImage) {
      updateMetaTag('property', 'og:image', metadata.ogImage);
    }
    
    // Update Twitter tags
    updateMetaTag('name', 'twitter:title', metadata.title);
    updateMetaTag('name', 'twitter:description', metadata.description);
    updateMetaTag('name', 'twitter:url', metadata.canonical || `https://eyesonground.com${location.pathname}`);
    
    // Add structured data if provided
    if (metadata.structuredData) {
      addStructuredData(metadata.structuredData);
    }
    
  }, [location.pathname]);
};

const updateMetaTag = (attribute: string, value: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
};

const addStructuredData = (data: object) => {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"].dynamic-seo');
  if (existing) {
    existing.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.className = 'dynamic-seo';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Component to be used in App.tsx
export const SEOManager = () => {
  useSEO();
  return null;
};
