// Service Tier Types
export type ServiceTier = 'basic' | 'standard' | 'premium';

export interface ServiceTierDetails {
    id: ServiceTier;
    name: string;
    price: number;
    description: string;
    features: string[];
    icon: string;
    popular?: boolean;
    deliveryTime: string;
}

export interface RequestPricing {
    selectedTier: ServiceTier;
    totalPrice: number;
    additionalServices?: AdditionalService[];
}

export interface AdditionalService {
    id: string;
    name: string;
    price: number;
    description: string;
    included: boolean;
}

// Service Tier Configuration
export const SERVICE_TIERS: ServiceTierDetails[] = [
    {
        id: 'basic',
        name: 'Basic Inspection',
        price: 50,
        description: 'Essential inspection with detailed documentation',
        deliveryTime: '24-48 hours',
        icon: '📸',
        features: [
            'High-quality live images (15-20 photos)',
            'Basic written inspection report',
            'Digital delivery via platform',
            'Basic defect identification',
            'Cars,light trucks'
        ]
    },
    {
        id: 'standard',
        name: 'Standard Plus',
        price: 60,
        description: 'Comprehensive inspection with video documentation',
        deliveryTime: '24-48 hours',
        icon: '🎥',
        popular: true,
        features: [
            'Everything in Basic tier',
            'Live video recording (5-10 minutes)',
            'Close-up videos of defects/issues',
            'Audio commentary and explanations',
            'Enhanced defect documentation',
            'Priority processing',
            'Tracktors, skid steers, pickups'
        ]
    },
    {
        id: 'premium',
        name: 'Premium Live',
        price: 70,
        description: 'Real-time inspection with live interaction',
        deliveryTime: 'Same day completion',
        icon: '📞',
        features: [
            'Everything in Standard tier',
            'Live video call with agent (30-45 minutes)',
            'Real-time Q&A during inspection',
            'Interactive guided inspection',
            'Immediate answers to your questions',
            'Custom focus areas per your requests',
            'Same-day report delivery',
            'Priority agent assignment',
            'Combines,excavatos,dozers, high value items'
        ]
    }
];

// Additional services that can be added to any tier
export const ADDITIONAL_SERVICES: AdditionalService[] = [
    {
        id: 'rush_delivery',
        name: 'Rush Delivery',
        price: 15,
        description: 'Get your report within 12 hours',
        included: false
    },
    {
        id: 'expert_consultation',
        name: 'Expert Consultation Call',
        price: 25,
        description: '30-minute follow-up call with specialist',
        included: false
    },
    {
        id: 'second_opinion',
        name: 'Second Opinion Review',
        price: 30,
        description: 'Additional agent review for complex cases',
        included: false
    },
    {
        id: 'detailed_measurements',
        name: 'Detailed Measurements',
        price: 20,
        description: 'Precise measurements and dimensions',
        included: false
    }
];

// Helper functions
export const getTierByPrice = (price: number): ServiceTier => {
    const tier = SERVICE_TIERS.find(t => t.price === price);
    return tier?.id || 'basic';
};

export const calculateTotalPrice = (tier: ServiceTier, additionalServices: AdditionalService[]): number => {
    const baseTier = SERVICE_TIERS.find(t => t.id === tier);
    const basePrice = baseTier?.price || 50;
    const additionalPrice = additionalServices
        .filter(service => service.included)
        .reduce((sum, service) => sum + service.price, 0);

    return basePrice + additionalPrice;
};
