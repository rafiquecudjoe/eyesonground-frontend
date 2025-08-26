import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { inspectionRequestService, InspectionRequest } from '@/lib/api/inspection-requests';
import { toast } from 'sonner';
import { Loader2, MapPin, Clock, DollarSign, FileText, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const InspectionRequestsList = () => {
  const [requests, setRequests] = useState<InspectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadInspectionRequests();
    
    // Check if we came from creating a new request
    if (location.state?.justCreated) {
      toast.success('Request created successfully!', {
        description: 'Your inspection request is now live and visible below.'
      });
      // Clear the state to prevent showing the message again
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const loadInspectionRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await inspectionRequestService.getInspectionRequests();
      
      // Check if request was successful - check status code or presence of data
      if (result.data || (result.status && result.status >= 200 && result.status < 300)) {
        // Handle nested response structure: result.data.data
        const requestsData = (result as any).data?.data || result.data || [];
        
        // Filter to show only active requests (not completed or cancelled)
        const activeRequests = Array.isArray(requestsData)
          ? requestsData.filter((request: any) => 
              ['pending', 'processing'].includes(request.paymentStatus?.toLowerCase())
            )
          : [];
        setRequests(activeRequests);
        toast.success(`Loaded ${activeRequests.length} active inspection requests`);
      } else {
        throw new Error(result.message || 'Failed to load inspection requests');
      }
    } catch (err: any) {
      console.error('Error loading inspection requests:', err);
      setError(err.message || 'Failed to load inspection requests');
      toast.error('Failed to load inspection requests', {
        description: err.message || 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'processing':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getUrgencyBadgeVariant = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading inspection requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadInspectionRequests} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center p-8">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No inspection requests</h3>
        <p className="text-gray-500 mb-4">You haven't created any inspection requests yet.</p>
        <div className="space-y-2">
          <Button onClick={() => navigate('/client-dashboard/create-request')} className="mr-2">
            <Plus className="h-4 w-4 mr-2" />
            Create New Request
          </Button>
          <Button onClick={loadInspectionRequests} variant="outline">
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Active Requests</h2>
        <div className="space-x-2">
          <Button onClick={() => navigate('/client-dashboard/create-request')} className="bg-[rgba(42,100,186,1)] hover:bg-[rgba(42,100,186,0.9)]">
            <Plus className="h-4 w-4 mr-2" />
            Create New Request
          </Button>
          <Button onClick={loadInspectionRequests} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {request.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{request.category}</Badge>
                    <Badge variant={getUrgencyBadgeVariant(request.urgency)}>
                      {request.urgency}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(request.paymentStatus)}>
                      {request.paymentStatus}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${request.totalPrice}
                  </div>
                  <div className="text-sm text-gray-500">
                    Base: ${request.basePrice}
                    {request.additionalServicesTotal && request.additionalServicesTotal > 0 && (
                      <span> + ${request.additionalServicesTotal}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    {request.address}, {request.city}, {request.state}
                  </span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">
                    Created: {new Date(request.createdAt).toLocaleDateString()}
                    {request.availabilityWindow && (
                      <span> • Availability: {request.availabilityWindow}</span>
                    )}
                  </span>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {request.specificAreas || request.knownIssues || 'Inspection request for ' + request.category.toLowerCase() + ' item'}
                </p>

                {request.specificAreas && (
                  <div className="bg-blue-50 p-2 rounded text-sm">
                    <strong>Focus Areas:</strong> {request.specificAreas}
                  </div>
                )}

                {request.uploadedFiles && request.uploadedFiles.length > 0 && (
                  <div className="text-sm text-gray-600">
                    📎 {request.uploadedFiles.length} file(s) attached
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    ID: {request.id}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
