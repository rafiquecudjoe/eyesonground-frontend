import { useState } from "react";
import { Search, MapPin, DollarSign, Clock, Eye, Users, Filter, Calendar, Star, ShoppingBag, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const Marketplace = ({ userType }: { userType: "client" | "agent" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");

  // Mock marketplace data - all available client requests
  const availableJobs = [
    {
      id: 1,
      title: "Vehicle Inspection - 2019 Honda Civic",
      category: "Automotive",
      location: "Los Angeles, CA",
      budget: "$150",
      urgency: "Within 24 hours",
      postedDate: "2 hours ago",
      description: "Need a thorough inspection of a used Honda Civic before purchase. Looking for engine check, body condition, interior assessment, and test drive.",
      client: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.8,
        totalRequests: 12
      },
      requirements: ["Automotive experience", "Available weekends", "Own transportation"],
      applicants: 3,
      distance: "2.5 miles",
      estimatedDuration: "2-3 hours"
    },
    {
      id: 2,
      title: "Property Assessment - Downtown Apartment",
      category: "Real Estate",
      location: "New York, NY",
      budget: "$350",
      urgency: "Within 3 days",
      postedDate: "5 hours ago",
      description: "Comprehensive property inspection for a 2-bedroom apartment. Need detailed room-by-room assessment, structural evaluation, and neighborhood analysis.",
      client: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        rating: 4.9,
        totalRequests: 8
      },
      requirements: ["Real estate experience", "Professional camera", "Flexible schedule"],
      applicants: 7,
      distance: "1.2 miles",
      estimatedDuration: "3-4 hours"
    },
    {
      id: 3,
      title: "Electronics Verification - MacBook Pro",
      category: "Electronics",
      location: "San Francisco, CA",
      budget: "$85",
      urgency: "Same day",
      postedDate: "1 hour ago",
      description: "Need verification of a MacBook Pro's condition and functionality. Check for any hardware issues, battery health, and overall performance.",
      client: {
        name: "David Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        rating: 4.7,
        totalRequests: 15
      },
      requirements: ["Electronics knowledge", "Available today", "Tech background preferred"],
      applicants: 1,
      distance: "0.8 miles",
      estimatedDuration: "1-2 hours"
    },
    {
      id: 4,
      title: "Antique Furniture Authentication",
      category: "Antiques",
      location: "Boston, MA",
      budget: "$200",
      urgency: "Within a week",
      postedDate: "1 day ago",
      description: "Authentication and condition assessment of vintage furniture pieces. Need expert evaluation of authenticity, age, and market value.",
      client: {
        name: "Jennifer Walsh",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        rating: 5.0,
        totalRequests: 6
      },
      requirements: ["Antique expertise", "Art history background", "Detail-oriented"],
      applicants: 2,
      distance: "5.1 miles",
      estimatedDuration: "2-3 hours"
    },
    {
      id: 5,
      title: "Industrial Equipment Inspection",
      category: "Machinery",
      location: "Chicago, IL",
      budget: "$450",
      urgency: "Within 2 days",
      postedDate: "6 hours ago",
      description: "Comprehensive inspection of industrial printing equipment. Need technical assessment of mechanical condition, safety compliance, and operational status.",
      client: {
        name: "Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        rating: 4.6,
        totalRequests: 20
      },
      requirements: ["Industrial experience", "Safety certification", "Technical background"],
      applicants: 5,
      distance: "3.7 miles",
      estimatedDuration: "4-5 hours"
    }
  ];

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || job.category.toLowerCase() === categoryFilter;
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter);
    const matchesBudget = budgetFilter === "all" || 
      (budgetFilter === "under-100" && parseInt(job.budget.replace('$', '')) < 100) ||
      (budgetFilter === "100-200" && parseInt(job.budget.replace('$', '')) >= 100 && parseInt(job.budget.replace('$', '')) <= 200) ||
      (budgetFilter === "200-300" && parseInt(job.budget.replace('$', '')) >= 200 && parseInt(job.budget.replace('$', '')) <= 300) ||
      (budgetFilter === "over-300" && parseInt(job.budget.replace('$', '')) > 300);
    
    return matchesSearch && matchesCategory && matchesLocation && matchesBudget;
  });

  const handleApplyForJob = (jobId: number, jobTitle: string) => {
    toast.success("Application submitted!", {
      description: `You've applied for: ${jobTitle}`
    });
  };

  const getUrgencyColor = (urgency: string) => {
    if (urgency.includes("Same day")) return "bg-red-100 text-red-800";
    if (urgency.includes("24 hours")) return "bg-orange-100 text-orange-800";
    if (urgency.includes("3 days")) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">
              {userType === "client" ? "Inspection Marketplace" : "Job Marketplace"}
            </h1>
            <p className="text-[rgba(13,38,75,0.7)]">
              {userType === "client" 
                ? "Browse available inspection services and agents" 
                : "Browse and apply for inspection opportunities"}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] border-[rgba(42,100,186,0.2)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[rgba(13,38,75,0.7)]">Available Jobs</p>
                  <p className="text-xl font-bold text-[rgba(13,38,75,1)]">{availableJobs.length}</p>
                </div>
                <Eye className="h-8 w-8 text-[rgba(42,100,186,1)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Avg. Budget</p>
                  <p className="text-xl font-bold text-green-800">$227</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Urgent Jobs</p>
                  <p className="text-xl font-bold text-blue-800">2</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">New Today</p>
                  <p className="text-xl font-bold text-purple-800">3</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-5 w-5" />
          <Input
            placeholder={userType === "client" ? "Search inspection services..." : "Search inspection jobs..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/80 backdrop-blur-sm text-lg"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/80">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="real estate">Real Estate</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="antiques">Antiques</SelectItem>
              <SelectItem value="machinery">Machinery</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/80">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles, CA</SelectItem>
              <SelectItem value="New York">New York, NY</SelectItem>
              <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
              <SelectItem value="Boston">Boston, MA</SelectItem>
              <SelectItem value="Chicago">Chicago, IL</SelectItem>
            </SelectContent>
          </Select>

          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/80">
              <SelectValue placeholder="All Budgets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="under-100">Under $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200-300">$200 - $300</SelectItem>
              <SelectItem value="over-300">Over $300</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-12 border-[rgba(42,100,186,0.2)] hover:bg-[rgba(42,100,186,0.1)]">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-3">
                <Badge className={getUrgencyColor(job.urgency)}>
                  {job.urgency}
                </Badge>
                <div className="text-right">
                  <span className="text-xs text-[rgba(13,38,75,0.6)]">{job.postedDate}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-[rgba(42,100,186,1)]" />
                    <span className="text-xs text-[rgba(13,38,75,0.7)]">{job.distance}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-[rgba(13,38,75,1)] text-lg leading-tight mb-2">
                {job.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-[rgba(42,100,186,0.3)] text-[rgba(42,100,186,1)]">
                  {job.category}
                </Badge>
                <Badge variant="outline" className="border-green-300 text-green-700">
                  {job.estimatedDuration}
                </Badge>
              </div>

              <p className="text-[rgba(13,38,75,0.8)] text-sm leading-relaxed line-clamp-3">
                {job.description}
              </p>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Job Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[rgba(42,100,186,1)]" />
                    <span className="text-[rgba(13,38,75,0.8)]">{job.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-[rgba(13,38,75,1)]">{job.budget}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-[rgba(13,38,75,0.8)]">{job.applicants} applied</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-[rgba(13,38,75,0.8)]">{job.estimatedDuration}</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-3 p-3 bg-[rgba(42,100,186,0.05)] rounded-xl">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage src={job.client.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                      {job.client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-[rgba(13,38,75,1)]">{job.client.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-[rgba(13,38,75,0.7)]">{job.client.rating}</span>
                      </div>
                      <span className="text-xs text-[rgba(13,38,75,0.6)]">•</span>
                      <span className="text-xs text-[rgba(13,38,75,0.7)]">{job.client.totalRequests} requests</span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <p className="text-sm font-medium text-[rgba(13,38,75,1)] mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[rgba(42,100,186,0.3)] text-[rgba(13,38,75,0.8)]">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {userType === "agent" ? (
                    <Button 
                      onClick={() => handleApplyForJob(job.id, job.title)}
                      className="flex-1 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white h-11 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Apply for Job
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => toast.info("Contact agent feature coming soon")}
                      className="flex-1 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white h-11 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Contact Agent
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] h-11 rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-[rgba(42,100,186,1)]" />
          </div>
          <h3 className="text-xl font-bold text-[rgba(13,38,75,1)] mb-2">
            {userType === "client" ? "No services match your criteria" : "No jobs match your criteria"}
          </h3>
          <p className="text-[rgba(13,38,75,0.7)] mb-6">
            Try adjusting your filters to see more opportunities
          </p>
          {userType === "client" && (
            <Button asChild className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white mb-4">
              <Link to="/dashboard/create-request">
                <Plus className="mr-2 h-4 w-4" />
                Post Your Request
              </Link>
            </Button>
          )}
          <Button 
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setLocationFilter("all");
              setBudgetFilter("all");
            }}
            variant="outline" 
            className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredJobs.length > 0 && (
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] px-8"
          >
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};