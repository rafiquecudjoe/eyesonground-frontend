import React, { useState, useEffect } from 'react';
import { Plus, FileText, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { dashboardStatsService, DashboardData } from '@/lib/api/dashboard-stats';
import { toast } from 'sonner';

interface DashboardOverviewProps {
  userType: "client" | "agent";
}

export const DashboardOverview = ({ userType }: DashboardOverviewProps) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [userType]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardStatsService.getDashboardStats(userType);
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data', {
        description: 'Using cached data. Please refresh to try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Use live stats or fallback to defaults
  const stats = dashboardData?.stats || {
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
  };

  const recentActivity = dashboardData?.recentActivity || [];

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[rgba(42,100,186,1)]" />
          <span className="ml-2 text-[rgba(13,38,75,0.7)]">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[rgba(13,38,75,1)] mb-2 flex items-center gap-3">
              Welcome back! 👋
              {loading && <Loader2 className="h-6 w-6 animate-spin text-[rgba(42,100,186,1)]" />}
            </h1>
            <p className="text-[rgba(13,38,75,0.7)] text-lg">
              {userType === 'client' 
                ? "Here's what's happening with your inspection requests" 
                : "Here's your job performance overview"}
            </p>
            {dashboardData && recentActivity.length > 0 && (
              <p className="text-sm text-[rgba(42,100,186,1)] mt-1">
                Live data • {recentActivity.length} recent activit{recentActivity.length !== 1 ? 'ies' : 'y'}
              </p>
            )}
          </div>
          <Button 
            onClick={loadDashboardData} 
            variant="outline" 
            size="sm"
            disabled={loading}
            className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[rgba(13,38,75,1)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userType === 'client' ? (
            <>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)] border-[rgba(42,100,186,0.2)]" 
                    onClick={() => navigate('/dashboard/create-request')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">Post New Request</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Create a new inspection request</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/dashboard/my-ads')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">View My Requests</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Track your active requests</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/dashboard/messages')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">Messages</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Chat with agents</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)] border-[rgba(42,100,186,0.2)]" 
                    onClick={() => navigate('/dashboard/post-board')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">Browse Jobs</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Find new inspection opportunities</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/dashboard/my-assignments')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">My Jobs</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Manage active assignments</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/dashboard/earnings')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">Earnings</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Track your income</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[rgba(13,38,75,1)] mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {userType === 'client' ? (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">{stats.client.totalRequests}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.client.activeRequests}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.client.completedRequests}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.client.pendingReviews}</div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Total Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[rgba(13,38,75,1)]">{stats.agent.totalJobs}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.agent.activeJobs}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.agent.completedJobs}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[rgba(13,38,75,0.7)]">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${stats.agent.earnings}</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[rgba(13,38,75,1)]">Recent Activity</h2>
          <Button variant="outline" size="sm" 
                  onClick={() => navigate('/dashboard/requests')}>
            View All
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            {recentActivity.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentActivity.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <Badge className={`${getStatusColor(item.status)} border-0`}>
                            {item.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[rgba(13,38,75,1)]">{item.title}</h4>
                          <p className="text-sm text-[rgba(13,38,75,0.6)]">{item.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[rgba(13,38,75,1)]">{item.amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-[rgba(13,38,75,0.3)] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[rgba(13,38,75,1)] mb-2">No recent activity</h3>
                <p className="text-[rgba(13,38,75,0.6)] mb-4">
                  {userType === 'client' 
                    ? "Your inspection requests will appear here once you create them." 
                    : "Your completed jobs and assignments will show up here."}
                </p>
                {userType === 'client' && (
                  <Button 
                    onClick={() => navigate('/dashboard/create-request')}
                    className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Request
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] border-[rgba(42,100,186,0.2)]">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-[rgba(13,38,75,1)] mb-2">
            {userType === 'client' ? "Need an inspection?" : "Ready for your next job?"}
          </h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-4">
            {userType === 'client' 
              ? "Get started by posting your inspection request. Our qualified agents are ready to help." 
              : "Browse available inspection jobs and start earning today."}
          </p>
          <Button 
            className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)]"
            onClick={() => navigate(userType === 'client' ? '/dashboard/create-request' : '/dashboard/post-board')}
          >
            {userType === 'client' ? "Post New Request" : "Browse Jobs"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
