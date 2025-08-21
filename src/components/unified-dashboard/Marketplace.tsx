import { useState } from "react";
import { Search, MapPin, Clock, DollarSign, Eye, Filter, Star, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const Marketplace = ({ userType }: { userType: "client" | "agent" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isMobile = useIsMobile();

  // Mock data for marketplace listings
  const listings = [
    {
      id: 1,
      title: "Vehicle Inspection - 2019 Honda Civic",
      category: "Automotive",
      location: "Los Angeles, CA",
      budget: "$150-200",
      urgency: "Within 24 hours",
      description: "Need thorough inspection of used Honda Civic before purchase. Check engine, transmission, body condition, and interior.",
      client: {
        name: "Sarah Johnson",
        rating: 4.8,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      postedTime: "2 hours ago",
      applicants: 5,
      status: "open"
    },
    {
      id: 2,
      title: "Property Assessment - Downtown Apartment",
      category: "Real Estate",
      location: "New York, NY",
      budget: "$300-400",
      urgency: "Within 3 days",
      description: "Comprehensive property inspection for 2-bedroom apartment. Need detailed report on condition, fixtures, and any potential issues.",
      client: {
        name: "Michael Chen",
        rating: 4.9,
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      postedTime: "5 hours ago",
      applicants: 8,
      status: "open"
    },
    {
      id: 3,
      title: "Electronics Verification - MacBook Pro",
      category: "Electronics",
      location: "San Francisco, CA",
      budget: "$75-100",
      urgency: "Same day",
      description: "Verify condition and functionality of MacBook Pro 2021. Check screen, keyboard, ports, and overall performance.",
      client: {
        name: "David Rodriguez",
        rating: 4.7,
        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
      },
      postedTime: "1 day ago",
      applicants: 12,
      status: "assigned"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "automotive", label: "Automotive" },
    { value: "real-estate", label: "Real Estate" },
    { value: "electronics", label: "Electronics" },
    { value: "appliances", label: "Appliances" },
    { value: "machinery", label: "Machinery" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Open</Badge>;
      case "assigned":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Assigned</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">
              {userType === "client" ? "Inspection Marketplace" : "Available Jobs"}
            </h1>
            <p className="text-[rgba(13,38,75,0.7)]">
              {userType === "client" 
                ? "Find verified agents for your inspection needs" 
                : "Browse and apply for inspection opportunities"}
            </p>
          </div>
          
          {userType === "client" && (
            <Button asChild className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/client-dashboard/create-request">
                <Plus className="mr-2 h-4 w-4" />
                Post New Request
              </Link>
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-4 w-4" />
            <Input
              placeholder={userType === "client" ? "Search for inspection services..." : "Search available jobs..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-[rgba(42,100,186,0.2)] bg-white/80 backdrop-blur-sm text-[rgba(13,38,75,1)] focus:border-[rgba(42,100,186,1)] focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <Button variant="outline" className="border-[rgba(42,100,186,0.2)] hover:bg-[rgba(42,100,186,0.1)]">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-3">
                {getStatusBadge(listing.status)}
                <span className="text-xs text-[rgba(13,38,75,0.6)]">{listing.postedTime}</span>
              </div>
              
              <h3 className="font-bold text-[rgba(13,38,75,1)] text-lg leading-tight mb-2">
                {listing.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-[rgba(13,38,75,0.7)]">
                <Badge variant="outline" className="border-[rgba(42,100,186,0.3)] text-[rgba(42,100,186,1)]">
                  {listing.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-[rgba(13,38,75,0.8)] text-sm mb-4 line-clamp-3">
                {listing.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[rgba(42,100,186,1)]" />
                  <span className="text-[rgba(13,38,75,0.8)]">{listing.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-[rgba(13,38,75,1)]">{listing.budget}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-[rgba(13,38,75,0.8)]">{listing.urgency}</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-between mb-4 p-3 bg-[rgba(42,100,186,0.05)] rounded-xl">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={listing.client.avatar} />
                    <AvatarFallback>{listing.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-[rgba(13,38,75,1)]">{listing.client.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-[rgba(13,38,75,0.7)]">{listing.client.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[rgba(13,38,75,0.6)]">{listing.applicants} applicants</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {userType === "agent" ? (
                  <>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white"
                      disabled={listing.status !== "open"}
                    >
                      {listing.status === "open" ? "Apply Now" : "View Details"}
                    </Button>
                    <Button variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild className="flex-1 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white">
                      <Link to={`/client-dashboard/request/${listing.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {listings.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-[rgba(42,100,186,1)]" />
          </div>
          <h3 className="text-xl font-bold text-[rgba(13,38,75,1)] mb-2">No listings found</h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-6">
            {userType === "client" 
              ? "Try adjusting your search criteria or post a new request" 
              : "Check back later for new inspection opportunities"}
          </p>
          {userType === "client" && (
            <Button asChild className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
              <Link to="/client-dashboard/create-request">
                <Plus className="mr-2 h-4 w-4" />
                Post Your First Request
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};