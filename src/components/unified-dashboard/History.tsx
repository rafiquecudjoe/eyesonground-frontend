import { useState } from "react";
import { Search, Eye, MessageSquare, Calendar, MapPin, DollarSign, Clock, Filter, Download, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const History = ({ userType }: { userType: "client" | "agent" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const isMobile = useIsMobile();

  // Mock data for completed/archived requests only
  const completedRequests = [
    {
      id: 1,
      title: "Vehicle Inspection - 2019 Honda Civic",
      category: "Automotive",
      location: "Los Angeles, CA",
      budget: "$150",
      status: "completed",
      date: "Dec 15, 2024",
      completedDate: "Dec 16, 2024",
      duration: "2 hours",
      rating: 5,
      agent: {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9
      },
      client: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      reportUrl: "/reports/vehicle-inspection-1.pdf",
      totalEarnings: userType === "agent" ? "$135" : undefined
    },
    {
      id: 2,
      title: "Property Assessment - Downtown Apartment",
      category: "Real Estate",
      location: "New York, NY",
      budget: "$350",
      status: "completed",
      date: "Dec 10, 2024",
      completedDate: "Dec 12, 2024",
      duration: "3 hours",
      rating: 4,
      agent: {
        name: "Mike Wilson",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4.8
      },
      client: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
      },
      reportUrl: "/reports/property-assessment-2.pdf",
      totalEarnings: userType === "agent" ? "$315" : undefined
    },
    {
      id: 3,
      title: "Electronics Verification - MacBook Pro",
      category: "Electronics",
      location: "San Francisco, CA",
      budget: "$85",
      status: "completed",
      date: "Dec 5, 2024",
      completedDate: "Dec 6, 2024",
      duration: "1.5 hours",
      rating: 5,
      agent: {
        name: "Emma Davis",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4.9
      },
      client: {
        name: "David Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg"
      },
      reportUrl: "/reports/electronics-verification-3.pdf",
      totalEarnings: userType === "agent" ? "$76.50" : undefined
    }
  ];

  const filteredRequests = completedRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalEarnings = userType === "agent" 
    ? completedRequests.reduce((sum, req) => sum + parseFloat(req.totalEarnings?.replace('$', '') || '0'), 0)
    : 0;

  const averageRating = completedRequests.reduce((sum, req) => sum + req.rating, 0) / completedRequests.length;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">
          {userType === "client" ? "Inspection History" : "Completed Assignments"}
        </h1>
        <p className="text-[rgba(13,38,75,0.7)]">
          {userType === "client" 
            ? "View all your completed inspections and reports" 
            : "Review your completed assignments and earnings"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] border-[rgba(42,100,186,0.2)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[rgba(13,38,75,0.7)]">Total {userType === "client" ? "Inspections" : "Assignments"}</p>
                <p className="text-2xl font-bold text-[rgba(13,38,75,1)]">{completedRequests.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-800">{averageRating.toFixed(1)}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {userType === "agent" && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Total Earnings</p>
                  <p className="text-2xl font-bold text-blue-800">${totalEarnings.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-4 w-4" />
          <Input
            placeholder="Search completed inspections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-[rgba(42,100,186,0.2)] bg-white/80 backdrop-blur-sm text-[rgba(13,38,75,1)] focus:border-[rgba(42,100,186,1)] focus:outline-none"
          >
            <option value="all">All Time</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
          </select>
          
          <Button variant="outline" className="border-[rgba(42,100,186,0.2)] hover:bg-[rgba(42,100,186,0.1)]">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                <span className="text-xs text-[rgba(13,38,75,0.6)]">{request.completedDate}</span>
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
                  <span className="font-semibold text-[rgba(13,38,75,1)]">
                    {userType === "agent" ? `Earned: ${request.totalEarnings}` : `Paid: ${request.budget}`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-[rgba(13,38,75,0.8)]">Duration: {request.duration}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < request.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-[rgba(13,38,75,0.8)]">({request.rating}/5)</span>
                </div>
              </div>

              {/* Agent/Client Info */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-[rgba(42,100,186,0.05)] rounded-xl">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userType === "client" ? request.agent.avatar : request.client.avatar} />
                  <AvatarFallback>
                    {userType === "client" ? request.agent.name.charAt(0) : request.client.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[rgba(13,38,75,1)]">
                    {userType === "client" ? "Agent: " : "Client: "}
                    {userType === "client" ? request.agent.name : request.client.name}
                  </p>
                  {userType === "client" && request.agent.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-[rgba(13,38,75,0.7)]">{request.agent.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                
                <Button variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-[rgba(42,100,186,1)]" />
          </div>
          <h3 className="text-xl font-bold text-[rgba(13,38,75,1)] mb-2">No completed inspections yet</h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-6">
            {userType === "client" 
              ? "Your completed inspections will appear here" 
              : "Your completed assignments will appear here"}
          </p>
        </div>
      )}
    </div>
  );
};