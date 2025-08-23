import { Star, MapPin, Award, Eye, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export const FeaturedAgents = () => {
  const featuredAgents = [
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.9,
      reviewCount: 127,
      location: "Los Angeles, CA",
      specialties: ["Automotive", "Electronics"],
      completedJobs: 145,
      responseTime: "< 2 hours",
      verified: true,
      topRated: true,
      description: "Certified automotive inspector with 8+ years experience. Specializes in classic cars and luxury vehicles."
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 4.8,
      reviewCount: 98,
      location: "New York, NY",
      specialties: ["Real Estate", "Property"],
      completedJobs: 112,
      responseTime: "< 1 hour",
      verified: true,
      topRated: true,
      description: "Licensed real estate inspector and appraiser. Expert in residential and commercial property assessments."
    },
    {
      id: 3,
      name: "David Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 4.9,
      reviewCount: 156,
      location: "San Francisco, CA",
      specialties: ["Electronics", "Tech"],
      completedJobs: 203,
      responseTime: "< 30 min",
      verified: true,
      topRated: true,
      description: "Tech industry veteran with expertise in consumer electronics, computers, and smart devices."
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-b from-white to-[rgba(234,241,255,0.5)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-48 h-48 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-6">
            <Award className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Top Rated Professionals</span>
          </div>
          
          <h2 className="text-[rgba(13,38,75,1)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Meet Our
            <span className="text-[rgba(42,100,186,1)]"> Featured Agents</span>
          </h2>
          
          <p className="text-[rgba(13,38,75,0.8)] text-lg md:text-xl max-w-3xl mx-auto">
            Trusted professionals with proven track records, verified credentials, and exceptional client satisfaction ratings.
          </p>
        </div>

        {/* Featured Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredAgents.map((agent) => (
            <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300 border-[rgba(42,100,186,0.1)] hover:border-[rgba(42,100,186,0.3)] overflow-hidden">
              <CardContent className="p-6">
                {/* Agent Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-[rgba(42,100,186,0.2)]">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {agent.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[rgba(13,38,75,1)] text-lg">{agent.name}</h3>
                      {agent.topRated && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                          TOP RATED
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(agent.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-[rgba(13,38,75,1)]">{agent.rating}</span>
                      <span className="text-sm text-[rgba(13,38,75,0.6)]">({agent.reviewCount} reviews)</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-[rgba(13,38,75,0.7)]">
                      <MapPin className="w-4 h-4" />
                      <span>{agent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[rgba(13,38,75,0.8)] mb-4 leading-relaxed">
                  {agent.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-[rgba(42,100,186,0.1)] text-[rgba(42,100,186,1)] hover:bg-[rgba(42,100,186,0.2)]">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div className="bg-[rgba(42,100,186,0.05)] rounded-lg p-3">
                    <div className="text-lg font-bold text-[rgba(13,38,75,1)]">{agent.completedJobs}</div>
                    <div className="text-xs text-[rgba(13,38,75,0.7)]">Jobs Completed</div>
                  </div>
                  <div className="bg-[rgba(42,100,186,0.05)] rounded-lg p-3">
                    <div className="text-lg font-bold text-[rgba(13,38,75,1)]">{agent.responseTime}</div>
                    <div className="text-xs text-[rgba(13,38,75,0.7)]">Response Time</div>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-md">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Browse All CTA */}
        <div className="text-center">
          <Link to="/account-type">
            <Button variant="outline" className="border-2 border-[rgba(42,100,186,1)] text-[rgba(42,100,186,1)] hover:bg-[rgba(42,100,186,0.1)] font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-md">
              Browse All Agents in Marketplace
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[rgba(42,100,186,0.1)] shadow-sm">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">500+</div>
            <div className="text-sm text-[rgba(13,38,75,0.7)]">Verified Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">4.8★</div>
            <div className="text-sm text-[rgba(13,38,75,0.7)]">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">2.5k+</div>
            <div className="text-sm text-[rgba(13,38,75,0.7)]">Completed Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">&lt; 2hrs</div>
            <div className="text-sm text-[rgba(13,38,75,0.7)]">Avg Response</div>
          </div>
        </div>
      </div>
    </section>
  );
};
