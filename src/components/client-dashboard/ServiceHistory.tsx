
import React, { useState } from "react";
import { Search, ChevronRight, ChevronLeft, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

export const ServiceHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const isMobile = useIsMobile();
  
  // Mock data - in a real app this would come from an API
  const services = [
    { 
      id: 1, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "pending", 
      amount: "3,628USD" 
    },
    { 
      id: 2, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
    { 
      id: 3, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
    { 
      id: 4, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
    { 
      id: 5, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
    { 
      id: 6, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
    { 
      id: 7, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
    { 
      id: 8, 
      destination: "21, brooks street 425 US",
      pickupTime: "Pick up 12- sept-24 (10:43am)",
      details: "Spark plug change", 
      agentName: "John Christian Doe", 
      status: "completed", 
      amount: "3,628USD" 
    },
  ];

  // Handle search
  const filteredServices = services.filter(service => 
    service.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentItems = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">Task Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending service</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  // Mobile Card View Component
  const MobileServiceCard = ({ service }: { service: any }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded overflow-hidden">
              <img 
                src={`https://placehold.co/48x48/e6e6e6/878787?text=PSI`} 
                alt="Service" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">
                <span className="inline-block mr-1">📍</span> 
                {service.destination}
              </p>
              <p className="text-xs text-gray-500">{service.pickupTime}</p>
            </div>
          </div>
          <button className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Details:</p>
            <p className="font-medium">{service.details}</p>
          </div>
          <div>
            <p className="text-gray-500">Agent:</p>
            <p className="font-medium">{service.agentName}</p>
          </div>
          <div>
            <p className="text-gray-500">Status:</p>
            <div>{getStatusBadge(service.status)}</div>
          </div>
          <div>
            <p className="text-gray-500">Amount:</p>
            <p className="font-medium">{service.amount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end">
        <Button asChild variant="ghost" size="sm" className="text-[rgba(42,100,186,1)]">
          <Link to={`/client-dashboard/service-history/${service.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="bg-[rgba(249,250,251,1)] min-h-screen">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search agent name"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(42,100,186,1)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <Button asChild className="bg-[rgba(42,100,186,1)] hover:bg-[rgba(13,38,75,1)] text-white w-full md:w-auto">
            <Link to="/client-dashboard/create-service">
              {isMobile ? (
                <><Plus className="mr-1" /> Create service</>
              ) : (
                'Create a service'
              )}
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-100 border-b">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{filteredServices.length} Results</p>
              <p className="text-sm text-gray-600">Last updated 8:32 pm</p>
            </div>
          </div>
          
          {/* Desktop Table View */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-200">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700">Destination details</TableHead>
                    <TableHead className="font-semibold text-gray-700">Details</TableHead>
                    <TableHead className="font-semibold text-gray-700">Agent name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Amount paid</TableHead>
                    <TableHead className="font-semibold text-gray-700">More</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((service) => (
                    <TableRow key={service.id} className="border-b">
                      <TableCell className="font-medium">
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 w-14 h-14 bg-gray-200 rounded overflow-hidden">
                            <img 
                              src={`https://placehold.co/56x56/e6e6e6/878787?text=PSI`} 
                              alt="Service" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              <span className="inline-block mr-1">📍</span> 
                              {service.destination}
                            </p>
                            <p className="text-xs text-gray-500">{service.pickupTime}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{service.details}</TableCell>
                      <TableCell>{service.agentName}</TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell>{service.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button asChild variant="ghost" size="sm" className="text-[rgba(42,100,186,1)]">
                            <Link to={`/client-dashboard/service-history/${service.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <button className="p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Mobile Card View */}
          {isMobile && (
            <div className="p-4">
              {currentItems.map((service) => (
                <MobileServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center p-4 bg-white border-t">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {!isMobile && Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          href="#" 
                          isActive={currentPage === pageNumber}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {!isMobile && totalPages > 5 && (
                    <>
                      <PaginationItem>
                        <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                          ...
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  
                  {isMobile && (
                    <PaginationItem>
                      <span className="px-2">
                        {currentPage} / {totalPages}
                      </span>
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
