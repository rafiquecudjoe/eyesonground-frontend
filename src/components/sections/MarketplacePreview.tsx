import { Search, Filter, Star, MapPin, Clock, DollarSign, ArrowRight, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export const MarketplacePreview = () => {
  const sampleJobs = [
    {
      id: 1,
      title: "Vehicle Inspection - 2019 Honda Civic",
      category: "Automotive",
      location: "Los Angeles, CA",
      budget: "$150",
      urgency: "Within 24 hours",
      postedDate: "2 hours ago",
      client: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.8
      },
      applicants: 3,
      distance: "2.5 miles"
    },
    {
      id: 2,
      title: "Excavator Assessment - Construction Site",
      category: "Heavy Equipment",
      location: "Austin, TX",
      budget: "$275-$350",
      urgency: "Standard",
      postedDate: "2 days ago",
      client: {
        name: "MidTex Construction",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        rating: 4.6
      },
      applicants: 8,
      distance: "15.2 miles",
      description: "Need comprehensive inspection of used CAT excavator including hydraulic systems and engine diagnostics."
    },
    {
      id: 3,
      title: "Electronics Verification - MacBook Pro",
      category: "Electronics",
      location: "San Francisco, CA",
      budget: "$85",
      urgency: "Same day",
      postedDate: "1 hour ago",
      client: {
        name: "David Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        rating: 4.7
      },
      applicants: 1,
      distance: "0.8 miles"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    if (urgency.includes("Same day") || urgency.includes("24 hours")) return "bg-red-100 text-red-800";
    if (urgency.includes("3 days")) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-br from-[rgba(234,241,255,0.3)] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-6">
            <Search className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Live Marketplace</span>
          </div>
          
          <h2 className="text-[rgba(13,38,75,1)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Browse Active
            <span className="text-[rgba(42,100,186,1)]"> Inspection Requests</span>
          </h2>
          
          <p className="text-[rgba(13,38,75,0.8)] text-lg md:text-xl max-w-3xl mx-auto">
            See what others are requesting inspections for in real-time. Find agents, compare prices, or get inspired for your own inspection needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Sample Jobs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[rgba(13,38,75,1)]">Recent Requests</h3>
              <div className="flex items-center gap-2 text-sm text-[rgba(13,38,75,0.7)]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live updates</span>
              </div>
            </div>

            {sampleJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 border-[rgba(42,100,186,0.1)] hover:border-[rgba(42,100,186,0.3)]">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {/* Title and Budget Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h4 className="font-semibold text-[rgba(13,38,75,1)] group-hover:text-[rgba(42,100,186,1)] transition-colors text-sm sm:text-base leading-tight">
                            {job.title}
                          </h4>
                          <Badge className={`${getUrgencyColor(job.urgency)} self-start sm:self-auto text-xs`}>
                            {job.urgency}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[rgba(13,38,75,0.7)] mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{job.postedDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{job.applicants} applicants</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="text-lg sm:text-xl font-bold text-[rgba(42,100,186,1)]">{job.budget}</div>
                        <div className="text-sm text-[rgba(13,38,75,0.7)]">{job.distance}</div>
                      </div>
                    </div>
                    
                    {/* Client Info */}
                    {job.client && (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={job.client.avatar} alt={job.client.name} />
                          <AvatarFallback>{job.client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-[rgba(13,38,75,1)] truncate">{job.client.name}</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
                            <span className="text-xs text-[rgba(13,38,75,0.7)]">{job.client.rating}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center pt-4">
              <Link to="/account-type">
                <Button variant="outline" className="border-2 border-[rgba(42,100,186,1)] text-[rgba(42,100,186,1)] hover:bg-[rgba(42,100,186,0.1)] font-medium px-6 py-2 rounded-lg transition-all duration-300 group">
                  View All Active Requests
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Marketplace Features */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)] border-[rgba(42,100,186,0.2)]">
              <CardHeader>
                <h3 className="text-lg font-bold text-[rgba(13,38,75,1)]">Marketplace Features</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[rgba(13,38,75,1)] mb-1">Smart Search & Filters</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.7)]">Find exactly what you need with advanced filtering by location, category, budget, and urgency.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[rgba(13,38,75,1)] mb-1">Verified Profiles</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.7)]">All agents and clients are verified with ratings, reviews, and background checks.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[rgba(13,38,75,1)] mb-1">Transparent Pricing</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.7)]">See real market rates and compare quotes from multiple qualified agents.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[rgba(42,100,186,0.1)]">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[rgba(13,38,75,1)] mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(13,38,75,0.7)]">Active Requests</span>
                    <span className="font-bold text-[rgba(13,38,75,1)]">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(13,38,75,0.7)]">Available Agents</span>
                    <span className="font-bold text-[rgba(13,38,75,1)]">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(13,38,75,0.7)]">Avg Response Time</span>
                    <span className="font-bold text-[rgba(13,38,75,1)]">1.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(13,38,75,0.7)]">Success Rate</span>
                    <span className="font-bold text-[rgba(13,38,75,1)]">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link to="/account-type">
                <Button className="w-full bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <Eye className="w-4 h-4 mr-2" />
                  Explore Full Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
