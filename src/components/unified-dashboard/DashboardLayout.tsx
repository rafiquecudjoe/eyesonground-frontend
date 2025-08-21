import { useState } from "react";
import { Search, Eye, MessageSquare, Calendar, MapPin, DollarSign, Clock, Filter, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const RequestHistory = ({ userType }: { userType: "client" | "agent" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const isMobile = useIsMobile();

  // Mock data - only active requests (pending and in-progress)
  const requests = [
    {
      id: 1,
      title: "Property Inspection - Luxury Condo",
      category: "Real Estate",
      location: "Miami, FL",
      budget: "$250",
      status: "completed",
      date: "Dec 15, 2024",
      agent: {
        name: "Sarah Johnson",
        rating: 4.9,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      client: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      completedDate: "Dec 16, 2024",
      duration: "2 hours"
    },
    {
      id: 2,
      title: "Property Assessment - Downtown Apartment",
      category: "Real Estate",
      location: "New York, NY",
      budget: "$350",
      status: "in-progress",
      date: "Dec 18, 2024",
      agent: {
        name: "Mike Wilson",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4.8
      },
      client: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
      },
      estimatedCompletion: "Dec 20, 2024"
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
  ].filter(request => {
    if (showOnlyActive) {
      return request.status === "pending" || request.status === "in-progress";
    }
    return true;
  });

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

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">
          {userType === "client" ? "Active Requests" : "Current Assignments"}
        </h1>
        <p className="text-[rgba(13,38,75,0.7)]">
          {userType === "client" 
            ? "Track and manage your active inspection requests" 
            : "View your current assignments and applications"}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-4 w-4" />
          <Input
            placeholder={showOnlyActive ? "Search active requests..." : "Search all requests..."}
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
                
                {request.status === "completed" && request.duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-[rgba(13,38,75,0.8)]">Duration: {request.duration}</span>
                  </div>
                )}
              </div>

              {/* Agent/Client Info */}
              {request.agent && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-[rgba(42,100,186,0.05)] rounded-xl">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.agent.avatar} />
                    <AvatarFallback>{request.agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[rgba(13,38,75,1)]">
                      {userType === "client" ? "Agent: " : "Client: "}{userType === "client" ? request.agent.name : request.client?.name}
                    </p>
                    {request.agent.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 ${i < Math.floor(request.agent.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-[rgba(13,38,75,0.7)]">{request.agent.rating}</span>
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
                  <Link to={`/${userType === 'client' ? 'client' : 'psi'}-dashboard/request/${request.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
                
                {request.agent && (
                  <Button asChild variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Link to={`/${userType === 'client' ? 'client' : 'psi'}-dashboard/messages`}>
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
            {userType === "client" ? "No active requests" : "No current assignments"}
          </h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-6">
            {userType === "client" 
              ? "Your active inspection requests will appear here" 
              : "Your current assignments will appear here"}
          </p>
        </div>
      )}
    </div>
  );
};