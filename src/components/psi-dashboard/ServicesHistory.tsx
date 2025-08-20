
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

// Mock data
const services = [
  {
    id: "PSI-001",
    client: {
      name: "John Smith",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    destination: "123 Main St, Boston, MA",
    details: "Personal Security",
    pickupTime: "Sep 12, 2023 - 10:00 AM",
    status: "completed",
    amount: "$2,000"
  },
  {
    id: "PSI-002",
    client: {
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    destination: "456 Park Ave, New York, NY",
    details: "Asset Protection",
    pickupTime: "Sep 15, 2023 - 2:30 PM",
    status: "in-progress",
    amount: "$3,500"
  },
  {
    id: "PSI-003",
    client: {
      name: "Robert Williams",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    destination: "789 Oak Dr, Los Angeles, CA",
    details: "Car Repair",
    pickupTime: "Sep 18, 2023 - 9:15 AM",
    status: "pending",
    amount: "$1,200"
  }
];

export const ServicesHistory = () => {
  const isMobile = useIsMobile();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Services History</h1>
        
        <div className="w-full md:w-auto flex gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search services..." className="pl-10" />
          </div>
        </div>
      </div>

      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={service.client.image} 
                  alt={service.client.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{service.client.name}</h3>
                  <p className="text-sm text-gray-500">ID: {service.id}</p>
                </div>
                <div className="ml-auto">
                  {getStatusBadge(service.status)}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Destination:</span>
                  <span className="col-span-2">{service.destination}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Details:</span>
                  <span className="col-span-2">{service.details}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Pickup:</span>
                  <span className="col-span-2">{service.pickupTime}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-500">Amount:</span>
                  <span className="col-span-2 font-bold">{service.amount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop view with table
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Pickup Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={service.client.image} 
                        alt={service.client.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{service.client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{service.destination}</TableCell>
                  <TableCell>{service.details}</TableCell>
                  <TableCell>{service.pickupTime}</TableCell>
                  <TableCell>{getStatusBadge(service.status)}</TableCell>
                  <TableCell className="font-bold">{service.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
