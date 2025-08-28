import { apiClient } from './client';

export interface DashboardStats {
    client: {
        totalRequests: number;
        activeRequests: number;
        completedRequests: number;
        pendingReviews: number;
    };
    agent: {
        totalJobs: number;
        activeJobs: number;
        completedJobs: number;
        earnings: number;
    };
}

export interface RecentActivity {
    id: number;
    title: string;
    status: 'completed' | 'in-progress' | 'pending' | 'pending_payment';
    date: string;
    amount: string;
    category?: string;
    location?: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentActivity: RecentActivity[];
}

export const dashboardStatsService = {
    /**
     * Get dashboard statistics for a user
     */
    async getDashboardStats(userType: 'client' | 'agent'): Promise<DashboardData> {
        try {
            // For now, we'll fetch inspection requests and calculate stats from them
            // In the future, you can create a dedicated backend endpoint for dashboard stats
            const response = await apiClient.get('/api/v1/inspection-requests');

            if (response.data) {
                const requests = response.data.data || response.data || [];

                // Calculate statistics from the requests data
                const stats = this.calculateStats(requests, userType);
                const recentActivity = this.formatRecentActivity(requests, userType);

                return {
                    stats,
                    recentActivity
                };
            }

            throw new Error('Failed to fetch dashboard data');
        } catch (error) {
            console.error('Dashboard stats service error:', error);

            // Return fallback/mock data if API fails
            return this.getFallbackData(userType);
        }
    },

    /**
     * Calculate statistics from inspection requests data
     */
    calculateStats(requests: any[], userType: 'client' | 'agent'): DashboardStats {
        const totalRequests = requests.length;
        const activeRequests = requests.filter(req =>
            ['pending', 'pending_payment', 'in_progress'].includes(req.paymentStatus?.toLowerCase())
        ).length;
        const completedRequests = requests.filter(req =>
            req.paymentStatus?.toLowerCase() === 'completed'
        ).length;
        const pendingReviews = requests.filter(req =>
            req.paymentStatus?.toLowerCase() === 'completed' && !req.reviewed
        ).length;

        // Calculate earnings for agents (this would need real data from payments)
        const totalEarnings = requests
            .filter(req => req.paymentStatus?.toLowerCase() === 'completed')
            .reduce((sum, req) => sum + (req.totalPrice || 0), 0);

        return {
            client: {
                totalRequests,
                activeRequests,
                completedRequests,
                pendingReviews
            },
            agent: {
                totalJobs: totalRequests,
                activeJobs: activeRequests,
                completedJobs: completedRequests,
                earnings: Math.round(totalEarnings * 0.8) // Assuming 80% goes to agent
            }
        };
    },

    /**
     * Format recent activity from inspection requests
     */
    formatRecentActivity(requests: any[], userType: 'client' | 'agent'): RecentActivity[] {
        // Sort by creation date and take the 5 most recent
        const sortedRequests = requests
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);

        return sortedRequests.map((request, index) => ({
            id: request.id || index,
            title: request.title || `${request.category} Inspection`,
            status: this.mapPaymentStatusToActivityStatus(request.paymentStatus),
            date: this.formatRelativeDate(request.createdAt),
            amount: `$${request.totalPrice || 0}`,
            category: request.category,
            location: `${request.city}, ${request.state}`
        }));
    },

    /**
     * Map payment status to activity status
     */
    mapPaymentStatusToActivityStatus(paymentStatus: string): 'completed' | 'in-progress' | 'pending' | 'pending_payment' {
        const status = paymentStatus?.toLowerCase();
        switch (status) {
            case 'completed':
                return 'completed';
            case 'in_progress':
            case 'processing':
                return 'in-progress';
            case 'pending_payment':
                return 'pending_payment';
            case 'pending':
            default:
                return 'pending';
        }
    },

    /**
     * Format date as relative time
     */
    formatRelativeDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) {
                return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
            } else {
                return date.toLocaleDateString();
            }
        }
    },

    /**
     * Get fallback data when API fails
     */
    getFallbackData(userType: 'client' | 'agent'): DashboardData {
        return {
            stats: {
                client: {
                    totalRequests: 0,
                    activeRequests: 0,
                    completedRequests: 0,
                    pendingReviews: 0
                },
                agent: {
                    totalJobs: 0,
                    activeJobs: 0,
                    completedJobs: 0,
                    earnings: 0
                }
            },
            recentActivity: []
        };
    }
};
