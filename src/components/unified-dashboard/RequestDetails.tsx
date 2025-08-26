import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  Star,
  User,
  Building,
  AlertCircle,
  Shield,
  Camera,
  Download,
  CreditCard,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { inspectionRequestService, InspectionRequest } from "@/lib/api/inspection-requests";
import { toast } from "sonner";

interface RequestDetailsProps {
  userType: "client" | "agent";
}

export const RequestDetails = ({ userType }: RequestDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<InspectionRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await inspectionRequestService.getInspectionRequest(id);
        
        // Handle nested response structure: response.data.data
        // The API returns { data: { data: InspectionRequest } } structure
        const requestData = (response as any).data?.data || response.data;
        
        if (requestData) {
          setRequest(requestData);
        } else {
          throw new Error('No data received');
        }
      } catch (error) {
        console.error('Error fetching request details:', error);
        toast.error('Failed to load request details');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getStatusBadge = (status?: string) => {
    const safeStatus = status || 'pending';
    
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Pending" },
      "in-progress": { color: "bg-blue-100 text-blue-800 border-blue-300", label: "In Progress" },
      completed: { color: "bg-green-100 text-green-800 border-green-300", label: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800 border-red-300", label: "Cancelled" },
    };
    
    const config = statusConfig[safeStatus as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border`}>
        {config.label}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status?: string) => {
    // Provide a default status if undefined
    const safeStatus = status || 'pending';
    
    const statusConfig = {
      pending: { color: "bg-gray-100 text-gray-800", icon: Clock },
      processing: { color: "bg-blue-100 text-blue-800", icon: Loader2 },
      succeeded: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      failed: { color: "bg-red-100 text-red-800", icon: XCircle },
      cancelled: { color: "bg-gray-100 text-gray-800", icon: XCircle },
    };
    
    const config = statusConfig[safeStatus as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount?: number | string) => {
    if (amount === null || amount === undefined) return '$0.00';
    
    // Convert string to number if needed
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numericAmount)) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numericAmount);
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgba(42,100,186,1)]" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Request not found</p>
        <Button onClick={handleGoBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-[rgba(42,100,186,0.1)]">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoBack}
          className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] hover:border-[rgba(42,100,186,0.5)]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">
            Request Details
          </h1>
          <p className="text-[rgba(13,38,75,0.7)]">
            View complete information about this inspection request
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-[rgba(42,100,186,0.1)] pb-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <CardTitle className="text-xl text-[rgba(13,38,75,1)]">
                    {request.title}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-[rgba(42,100,186,0.3)] text-[rgba(42,100,186,1)]">
                      {request.category}
                    </Badge>
                    {request.subCategory && (
                      <Badge variant="secondary" className="border border-gray-200">
                        {request.subCategory}
                      </Badge>
                    )}
                  </div>
                </div>
                {getStatusBadge(request.paymentStatus === 'succeeded' ? 'completed' : 'pending')}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <MapPin className="h-5 w-5 text-[rgba(42,100,186,1)] flex-shrink-0" />
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">
                    {request.address || 'N/A'}, {request.city || 'N/A'}, {request.state || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">
                    {request.urgency ? (request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)) : 'Medium'} Priority
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Phone className="h-5 w-5 text-[rgba(42,100,186,1)] flex-shrink-0" />
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">
                    {request.phoneNumber || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Calendar className="h-5 w-5 text-[rgba(42,100,186,1)] flex-shrink-0" />
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">
                    Created {formatDate(request.createdAt)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-[rgba(42,100,186,0.1)] pb-6">
              <CardTitle className="text-lg text-[rgba(13,38,75,1)] flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Inspection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {request.specificAreas && (
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h4 className="font-medium text-[rgba(13,38,75,1)] mb-3">Specific Areas to Inspect</h4>
                  <p className="text-sm text-[rgba(13,38,75,0.8)] leading-relaxed">
                    {request.specificAreas}
                  </p>
                </div>
              )}
              
              {request.knownIssues && (
                <div className="border border-amber-200 rounded-lg p-5 bg-amber-50">
                  <h4 className="font-medium text-[rgba(13,38,75,1)] mb-3">Known Issues</h4>
                  <p className="text-sm text-[rgba(13,38,75,0.8)] leading-relaxed">
                    {request.knownIssues}
                  </p>
                </div>
              )}

              {request.accessInstructions && (
                <div className="border border-blue-200 rounded-lg p-5 bg-blue-50">
                  <h4 className="font-medium text-[rgba(13,38,75,1)] mb-3">Access Instructions</h4>
                  <p className="text-sm text-[rgba(13,38,75,0.8)] leading-relaxed">
                    {request.accessInstructions}
                  </p>
                </div>
              )}

              {request.specialRequirements && (
                <div className="border border-purple-200 rounded-lg p-5 bg-purple-50">
                  <h4 className="font-medium text-[rgba(13,38,75,1)] mb-3">Special Requirements</h4>
                  <p className="text-sm text-[rgba(13,38,75,0.8)] leading-relaxed">
                    {request.specialRequirements}
                  </p>
                </div>
              )}

              {request.safetyConsiderations && (
                <div className="border border-red-200 rounded-lg p-5 bg-red-50">
                  <h4 className="font-medium text-[rgba(13,38,75,1)] mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Safety Considerations
                  </h4>
                  <p className="text-sm text-[rgba(13,38,75,0.8)] leading-relaxed">
                    {request.safetyConsiderations}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>          {/* Contact Information */}
          <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-[rgba(42,100,186,0.1)] pb-6">
              <CardTitle className="text-lg text-[rgba(13,38,75,1)] flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {request.contactPerson && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-[rgba(13,38,75,1)] mb-2">Contact Person</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.8)]">{request.contactPerson}</p>
                  </div>
                )}
                
                {request.contactPhone && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-[rgba(13,38,75,1)] mb-2">Contact Phone</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.8)]">{request.contactPhone}</p>
                  </div>
                )}

                {request.preferredContact && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-[rgba(13,38,75,1)] mb-2">Preferred Contact Method</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.8)]">{request.preferredContact}</p>
                  </div>
                )}

                {request.availabilityWindow && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-[rgba(13,38,75,1)] mb-2">Availability Window</h4>
                    <p className="text-sm text-[rgba(13,38,75,0.8)]">{request.availabilityWindow}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          {request.uploadedFiles && request.uploadedFiles.length > 0 && (
            <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b border-[rgba(42,100,186,0.1)]">
                <CardTitle className="text-lg text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Uploaded Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {request.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[rgba(42,100,186,1)]" />
                        <span className="text-sm text-[rgba(13,38,75,0.8)]">{file}</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Pricing Information */}
          <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-[rgba(42,100,186,0.1)] pb-6">
              <CardTitle className="text-lg text-[rgba(13,38,75,1)] flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <span className="text-sm text-[rgba(13,38,75,0.8)]">Base Price</span>
                <span className="font-medium text-[rgba(13,38,75,1)]">
                  {formatCurrency(request.basePrice)}
                </span>
              </div>
              
              {request.additionalServicesTotal && request.additionalServicesTotal > 0 && (
                <div className="flex justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">Additional Services</span>
                  <span className="font-medium text-[rgba(13,38,75,1)]">
                    {formatCurrency(request.additionalServicesTotal)}
                  </span>
                </div>
              )}
              
              <Separator className="border-[rgba(42,100,186,0.2)] my-4" />
              
              <div className="flex justify-between p-5 border-2 border-green-200 rounded-lg bg-green-50">
                <span className="font-medium text-[rgba(13,38,75,1)]">Total Price</span>
                <span className="font-bold text-lg text-green-700">
                  {formatCurrency(request.totalPrice)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-[rgba(42,100,186,0.1)]">
              <CardTitle className="text-lg text-[rgba(13,38,75,1)] flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <span className="text-sm text-[rgba(13,38,75,0.8)]">Status</span>
                {getPaymentStatusBadge(request.paymentStatus)}
              </div>
              
              {request.paidAt && (
                <div className="flex justify-between p-3 border border-green-200 rounded-lg bg-green-50">
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">Paid At</span>
                  <span className="text-sm text-[rgba(13,38,75,1)]">
                    {formatDate(request.paidAt)}
                  </span>
                </div>
              )}
              
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-sm text-[rgba(13,38,75,0.8)]">Payment ID</span>
                </div>
                <span className="text-xs text-[rgba(13,38,75,0.6)] font-mono break-all">
                  {request.paymentIntentId}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-[rgba(42,100,186,0.1)]">
              <CardTitle className="text-lg text-[rgba(13,38,75,1)] flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Additional Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <span className="text-sm text-[rgba(13,38,75,0.8)]">Recording Consent</span>
                <Badge 
                  variant={request.recordingConsent ? "default" : "secondary"}
                  className={request.recordingConsent 
                    ? "bg-green-100 text-green-800 border border-green-300" 
                    : "bg-gray-100 text-gray-800 border border-gray-300"
                  }
                >
                  {request.recordingConsent ? "Granted" : "Not Granted"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact {userType === "client" ? "Agent" : "Client"}
            </Button>
            
            {userType === "client" && (
              <Button variant="outline" className="w-full border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] hover:border-[rgba(42,100,186,0.5)] transition-all duration-300">
                <FileText className="mr-2 h-4 w-4" />
                Edit Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
