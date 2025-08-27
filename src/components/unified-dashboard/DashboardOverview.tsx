import React from 'react';
import { Plus, FileText, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface DashboardOverviewProps {
  userType: "client" | "agent";
}

export const DashboardOverview = ({ userType }: DashboardOverviewProps) => {
  const navigate = useNavigate();

  // Mock data - replace with real data from your API
  const stats = {
    client: {
      totalRequests: 12,
      activeRequests: 3,
      completedRequests: 8,
      pendingReviews: 1
    },
    agent: {
      totalJobs: 45,
      activeJobs: 5,
      completedJobs: 38,
      earnings: 2850
    }
  };

  const recentActivity = [
    {
      id: 1,
      title: userType === 'client' ? 'Vehicle Inspection - 2019 Honda Civic' : 'Commercial Property Assessment',
      status: 'completed',
      date: '2 hours ago',
      amount: userType === 'client' ? '$85' : '$125'
    },
    {
      id: 2,
      title: userType === 'client' ? 'Home Appliance Check' : 'Industrial Equipment Audit',
      status: 'in-progress',
      date: '1 day ago',
      amount: userType === 'client' ? '$45' : '$200'
    },
    {
      id: 3,
      title: userType === 'client' ? 'Electronics Assessment' : 'Machinery Inspection',
      status: 'pending',
      date: '3 days ago',
      amount: userType === 'client' ? '$65' : '$150'
    }
  ];

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
        <h1 className="text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-[rgba(13,38,75,0.7)] text-lg">
          {userType === 'client' 
            ? "Here's what's happening with your inspection requests" 
            : "Here's your job performance overview"}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[rgba(13,38,75,1)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userType === 'client' ? (
            <>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)] border-[rgba(42,100,186,0.2)]" 
                    onClick={() => navigate('/client-dashboard/create-request')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">Post New Request</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Create a new inspection request</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/client-dashboard/my-ads')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">View My Requests</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Track your active requests</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/client-dashboard/messages')}>
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
                    onClick={() => navigate('/agent-dashboard/post-board')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">Browse Jobs</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Find new inspection opportunities</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/agent-dashboard/my-assignments')}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-[rgba(13,38,75,1)] mb-2">My Jobs</h3>
                  <p className="text-sm text-[rgba(13,38,75,0.6)]">Manage active assignments</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => navigate('/agent-dashboard/earnings')}>
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
                  onClick={() => navigate(userType === 'client' ? '/client-dashboard/my-ads' : '/agent-dashboard/my-assignments')}>
            View All
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
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
            onClick={() => navigate(userType === 'client' ? '/client-dashboard/create-request' : '/agent-dashboard/post-board')}
          >
            {userType === 'client' ? "Post New Request" : "Browse Jobs"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
