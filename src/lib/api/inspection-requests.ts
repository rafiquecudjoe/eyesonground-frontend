import { apiClient } from './client';
import { ApiResponse } from './types';

// Inspection Request Types
export interface CreateInspectionRequestPayload {
    title: string;
    category: 'residential' | 'commercial' | 'industrial' | 'automotive' | 'heavy-equipment' | 'electronics' | 'appliances' | 'machinery' | 'construction' | 'antiques' | 'jewelry' | 'art' | 'furniture' | 'sporting' | 'musical' | 'medical' | 'marine' | 'aviation' | 'agricultural' | 'retail' | 'other';
    subCategory: string;
    customSubCategory?: string;
    state: string;
    city: string;
    address: string;
    urgency: string; // ISO date string for preferred inspection date
    phoneNumber: string;
    basePrice: number;
    additionalServicesTotal?: number;
    totalPrice: number;
    specificAreas?: string;
    knownIssues?: string;
    accessInstructions?: string;
    contactPerson?: string;
    contactPhone?: string;
    preferredContact?: string;
    availabilityWindow?: string;
    specialRequirements?: string;
    safetyConsiderations?: string;
    recordingConsent?: boolean;
    uploadedFiles?: string[];
    paymentIntentId?: string;
    paymentStatus: 'pending' | 'pending_payment' | 'processing' | 'succeeded' | 'failed' | 'cancelled';
    paidAt?: string;
}

export interface InspectionRequest {
    id: string;
    title: string;
    category: string;
    subCategory: string;
    customSubCategory?: string;
    state: string;
    city: string;
    address: string;
    urgency: string;
    phoneNumber: string;
    basePrice: number;
    additionalServicesTotal?: number;
    totalPrice: number;
    specificAreas?: string;
    knownIssues?: string;
    accessInstructions?: string;
    contactPerson?: string;
    contactPhone?: string;
    preferredContact?: string;
    availabilityWindow?: string;
    specialRequirements?: string;
    safetyConsiderations?: string;
    recordingConsent?: boolean;
    uploadedFiles?: string[];
    paymentIntentId: string;
    paymentStatus: string;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
}

export interface UpdateInspectionRequestPayload {
    title?: string;
    category?: 'residential' | 'commercial' | 'industrial' | 'automotive' | 'heavy-equipment' | 'electronics' | 'appliances' | 'machinery' | 'construction' | 'antiques' | 'jewelry' | 'art' | 'furniture' | 'sporting' | 'musical' | 'medical' | 'marine' | 'aviation' | 'agricultural' | 'retail' | 'other';
    subCategory?: string;
    customSubCategory?: string;
    state?: string;
    city?: string;
    address?: string;
    urgency?: string; // ISO date string for preferred inspection date
    phoneNumber?: string;
    basePrice?: number;
    additionalServicesTotal?: number;
    totalPrice?: number;
    specificAreas?: string;
    knownIssues?: string;
    accessInstructions?: string;
    contactPerson?: string;
    contactPhone?: string;
    preferredContact?: string;
    availabilityWindow?: string;
    specialRequirements?: string;
    safetyConsiderations?: string;
    recordingConsent?: boolean;
    uploadedFiles?: string[];
    paymentStatus?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled';
    paidAt?: string;
}

class InspectionRequestService {
    /**
     * Create a new inspection request
     */
    async createInspectionRequest(payload: CreateInspectionRequestPayload): Promise<ApiResponse<InspectionRequest>> {
        return apiClient.post<InspectionRequest>('/api/v1/inspection-requests', payload);
    }

    /**
     * Get all inspection requests for the authenticated user
     */
    async getInspectionRequests(): Promise<ApiResponse<InspectionRequest[]>> {
        return apiClient.get<InspectionRequest[]>('/api/v1/inspection-requests');
    }

    /**
     * Get a specific inspection request by ID
     */
    async getInspectionRequest(id: string): Promise<ApiResponse<InspectionRequest>> {
        return apiClient.get<InspectionRequest>(`/api/v1/inspection-requests/${id}`);
    }

    /**
     * Update an inspection request
     */
    async updateInspectionRequest(id: string, payload: UpdateInspectionRequestPayload): Promise<ApiResponse<InspectionRequest>> {
        return apiClient.put<InspectionRequest>(`/api/v1/inspection-requests/${id}`, payload);
    }

    /**
     * Delete an inspection request
     */
    async deleteInspectionRequest(id: string): Promise<ApiResponse<null>> {
        return apiClient.delete<null>(`/api/v1/inspection-requests/${id}`);
    }

    /**
     * Transform legacy request format to inspection request format
     */
    transformLegacyRequest(legacyData: any): CreateInspectionRequestPayload {
        return {
            title: legacyData.title || '',
            category: legacyData.category || 'residential',
            subCategory: legacyData.subCategory || '',
            customSubCategory: legacyData.customSubCategory || '',
            state: legacyData.state || '',
            city: legacyData.city || '',
            address: legacyData.address || '',
            urgency: legacyData.urgency || 'medium',
            phoneNumber: legacyData.phoneNumber || '',
            basePrice: legacyData.basePrice || 0,
            additionalServicesTotal: legacyData.additionalServicesTotal || 0,
            totalPrice: legacyData.totalPrice || 0,
            specificAreas: legacyData.specificAreas || '',
            knownIssues: legacyData.knownIssues || '',
            accessInstructions: legacyData.accessInstructions || '',
            contactPerson: legacyData.contactPerson || '',
            contactPhone: legacyData.contactPhone || '',
            preferredContact: legacyData.preferredContact || '',
            availabilityWindow: legacyData.availabilityWindow || '',
            specialRequirements: legacyData.specialRequirements || '',
            safetyConsiderations: legacyData.safetyConsiderations || '',
            recordingConsent: legacyData.recordingConsent || false,
            uploadedFiles: legacyData.uploadedFiles || [],
            paymentIntentId: legacyData.paymentIntentId || 'temp_payment_intent',
            paymentStatus: legacyData.paymentStatus || 'pending',
            paidAt: legacyData.paidAt || undefined,
        };
    }
}

// Export singleton instance
export const inspectionRequestService = new InspectionRequestService();
