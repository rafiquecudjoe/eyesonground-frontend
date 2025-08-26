import { useState, useEffect } from "react";
import { Search, Eye, MessageSquare, Calendar, MapPin, DollarSign, Clock, Filter, FileText, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { inspectionRequestService, InspectionRequest } from "@/lib/api/inspection-requests";
import { toast } from "sonner";

export const RequestHistory = ({ userType }: { userType: "client" | "agent" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [liveRequests, setLiveRequests] = useState<InspectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Mock data - only active requests (pending and in-progress)
  const mockRequests = [
    {
      id: 2,
      title: "Excavator Assessment - Construction Site",
      category: "Heavy Equipment",
      location: "Austin, TX",
      budget: "$275-$350",
      urgency: "Standard",
      status: "In Progress",
      agent: {
        name: "Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        rating: 4.9
      },
      postedDate: "2 days ago",
      description: "Need thorough inspection of used excavator including hydraulic systems, engine condition, and track wear assessment."
    },
    {
      id: 3,
      title: "Electronics Verification - MacBook Pro",
      category: "Electronics",
      location: "San Francisco, CA",
      budget: "$85",
      status: "pending", 
      date: "Dec 20, 2024",
      applicants: 5
    }
  ];

  useEffect(() => {
    loadLiveRequests();
    
    // Check if we came from creating a new request
    if (location.state?.justCreated) {
      toast.success('Request created successfully!', {
        description: 'Your inspection request is now live and visible below.'
      });
      // Clear the state to prevent showing the message again
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const loadLiveRequests = async () => {
    try {
      setLoading(true);
      const result = await inspectionRequestService.getInspectionRequests();
      
      if (result.data || (result.status && result.status >= 200 && result.status < 300)) {
        // Handle nested response structure: result.data.data
        const requestsData = (result as any).data?.data || result.data || [];
        
        // Filter to show only active requests
        const activeRequests = Array.isArray(requestsData) 
          ? requestsData.filter((request: any) => 
              ['pending', 'processing'].includes(request.paymentStatus?.toLowerCase())
            )
          : [];
        setLiveRequests(activeRequests);
      }
    } catch (err: any) {
      console.error('Error loading live requests:', err);
      // Silently fail - will just show mock data
    } finally {
      setLoading(false);
    }
  };

  // Convert live requests to match the mock request format
  const formatLiveRequests = (requests: InspectionRequest[]) => {
    return requests.map(request => ({
      id: request.id,
      title: request.title,
      category: request.category,
      location: `${request.city}, ${request.state}`,
      budget: `$${request.totalPrice}`,
      urgency: request.urgency,
      status: request.paymentStatus === 'pending' ? 'pending' : 'In Progress',
      date: new Date(request.createdAt).toLocaleDateString(),
      description: request.specificAreas || request.knownIssues || `Inspection request for ${request.category.toLowerCase()} item`,
      agent: null, // No agent assigned yet
      applicants: Math.floor(Math.random() * 8) + 1 // Random applicants for demo
    }));
  };

  // Combine mock data with live data
  const allRequests = [
    ...formatLiveRequests(liveRequests),
    ...mockRequests
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-2 flex items-center gap-3">
              {userType === "client" ? "My Active Requests" : "Current Assignments"}
              {loading && <Loader2 className="h-5 w-5 animate-spin text-[rgba(42,100,186,1)]" />}
            </h1>
            <p className="text-[rgba(13,38,75,0.7)]">
              {userType === "client" 
                ? "Track and manage your pending and in-progress inspection requests" 
                : "View your current assignments and applications"}
            </p>
            {liveRequests.length > 0 && (
              <p className="text-sm text-[rgba(42,100,186,1)] mt-1">
                {liveRequests.length} live request{liveRequests.length !== 1 ? 's' : ''} loaded from your account
              </p>
            )}
          </div>
          <Button 
            onClick={loadLiveRequests} 
            variant="outline" 
            size="sm"
            disabled={loading}
            className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-4 w-4" />
          <Input
            placeholder="Search active requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-[rgba(42,100,186,0.2)] bg-white/80 backdrop-blur-sm text-[rgba(13,38,75,1)] focus:border-[rgba(42,100,186,1)] focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <Button variant="outline" className="border-[rgba(42,100,186,0.2)] hover:bg-[rgba(42,100,186,0.1)]">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-3">
                {getStatusBadge(request.status)}
                <span className="text-xs text-[rgba(13,38,75,0.6)]">{request.date}</span>
              </div>
              
              <h3 className="font-bold text-[rgba(13,38,75,1)] text-lg leading-tight mb-2">
                {request.title}
              </h3>
              
              <Badge variant="outline" className="border-[rgba(42,100,186,0.3)] text-[rgba(42,100,186,1)] w-fit">
                {request.category}
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[rgba(42,100,186,1)]" />
                  <span className="text-[rgba(13,38,75,0.8)]">{request.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-[rgba(13,38,75,1)]">{request.budget}</span>
                </div>
              </div>

              {/* Agent/Client Info */}
              {request.agent && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-[rgba(42,100,186,0.05)] rounded-xl">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.agent?.avatar} />
                    <AvatarFallback>{request.agent?.name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[rgba(13,38,75,1)]">
                      {userType === "client" ? "Agent: " : "Client: "}{request.agent?.name || "Not assigned"}
                    </p>
                    {request.agent?.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 ${i < Math.floor(request.agent?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-[rgba(13,38,75,0.7)]">{request.agent?.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!request.agent && request.applicants && (
                <div className="mb-4 p-3 bg-[rgba(42,100,186,0.05)] rounded-xl">
                  <p className="text-sm text-[rgba(13,38,75,0.8)]">{request.applicants} agents applied</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button asChild className="flex-1 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white">
                  <Link to={`/${userType === 'client' ? 'client' : 'agent'}-dashboard/request/${request.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
                
                {request.agent && (
                  <Button asChild variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Link to={`/${userType === 'client' ? 'client' : 'agent'}-dashboard/messages`}>
                      <MessageSquare className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-[rgba(42,100,186,1)]" />
          </div>
          <h3 className="text-xl font-bold text-[rgba(13,38,75,1)] mb-2">
            {userType === "client" ? "No active requests found" : "No current assignments"}
          </h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-6">
            {userType === "client" 
              ? "Create your first inspection request to get started" 
              : "Your current assignments will appear here"}
          </p>
          {userType === "client" && (
            <Button asChild className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
              <Link to="/client-dashboard/post-board">
                <Plus className="mr-2 h-4 w-4" />
                Post Request
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};