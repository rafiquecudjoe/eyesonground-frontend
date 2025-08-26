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
    // price is either a flat price or a per-unit/unitPrice when used with quantity/miles
    price: number;
    description: string;
    included: boolean;
    // optional units (used for travel surcharge as miles)
    units?: number;
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
        name: 'Rush Delivery (Same Day)',
        price: 15,
        description: 'Get your report faster (priority processing)',
        included: false
    },
    {
        id: 'extra_videos',
        name: 'Extra Videos & Documentation',
        price: 25,
        description: 'Additional video recordings beyond the standard package',
        included: false
    },
    {
        id: 'travel_surcharge',
        name: 'Travel Surcharge',
        price: 20,
        description: 'Travel surcharge for remote locations',
        included: false,
        units: 0
    },
    {
        id: 'detailed_measurements',
        name: 'Detailed Measurements',
        price: 30,
        description: 'Precise measurements and dimensions',
        included: false
    },
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
        .reduce((sum, service) => {
            if (service.id === 'travel_surcharge') {
                const miles = service.units || 0;
                return sum + (service.price * miles);
            }
            return sum + service.price;
        }, 0);

    return basePrice + additionalPrice;
};
