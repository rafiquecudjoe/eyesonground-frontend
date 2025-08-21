import { useState } from "react";
import { ArrowLeft, Upload, MapPin, Calendar, DollarSign, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CreateRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    location: "",
    address: "",
    budget: "",
    urgency: "",
    description: "",
    phoneNumber: ""
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFiles(Array.from(e.target.files));
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Request data:", { ...formData, photoFiles, videoFile });
    
    toast.success("Request posted successfully!", {
      description: "Agents will start applying soon"
    });
    
    navigate("/client-dashboard/my-requests");
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <button 
          onClick={() => navigate("/client-dashboard/my-requests")}
          className="inline-flex items-center text-[rgba(42,100,186,1)] hover:text-[rgba(13,38,75,1)] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Requests
        </button>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
            <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            <span className="text-sm font-medium text-[rgba(13,38,75,1)]">New Request</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">
            Post Inspection Request
          </h1>
          <p className="text-[rgba(13,38,75,0.7)]">
            Provide details about what you need inspected
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
          <CardHeader>
            <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Vehicle Inspection - 2019 Honda Civic" 
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger id="category" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="appliances">Appliances</SelectItem>
                    <SelectItem value="machinery">Machinery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub Category</Label>
                <Select value={formData.subCategory} onValueChange={(value) => handleInputChange("subCategory", value)}>
                  <SelectTrigger id="subCategory" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="Select sub category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car-inspection">Car Inspection</SelectItem>
                    <SelectItem value="property-assessment">Property Assessment</SelectItem>
                    <SelectItem value="appliance-check">Appliance Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location & Budget */}
        <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
          <CardHeader>
            <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[rgba(42,100,186,1)]" />
              Location & Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">City/State</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger id="location" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                    <SelectItem value="new-york">New York, NY</SelectItem>
                    <SelectItem value="chicago">Chicago, IL</SelectItem>
                    <SelectItem value="houston">Houston, TX</SelectItem>
                    <SelectItem value="miami">Miami, FL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger id="budget" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200-300">$200 - $300</SelectItem>
                    <SelectItem value="300-500">$300 - $500</SelectItem>
                    <SelectItem value="500+">$500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Specific Address</Label>
                <Input 
                  id="address" 
                  placeholder="Enter the inspection address" 
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="urgency">Timeline</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger id="urgency" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same-day">Same Day</SelectItem>
                    <SelectItem value="within-24h">Within 24 hours</SelectItem>
                    <SelectItem value="within-3-days">Within 3 days</SelectItem>
                    <SelectItem value="within-week">Within a week</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description & Media */}
        <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
          <CardHeader>
            <CardTitle className="text-[rgba(13,38,75,1)]">Description & Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea 
                id="description" 
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[120px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                placeholder="Describe what you need inspected, any specific concerns, and what you're looking for in the report..."
                required
              />
            </div>
            
            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Reference Photos (Optional)</Label>
              <div className="border-2 border-dashed border-[rgba(42,100,186,0.3)] rounded-xl p-8 text-center bg-[rgba(42,100,186,0.02)] hover:bg-[rgba(42,100,186,0.05)] transition-colors">
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={handlePhotoChange}
                />
                <label 
                  htmlFor="photo-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-[rgba(42,100,186,1)] mb-2" />
                  <p className="text-sm font-medium text-[rgba(13,38,75,1)]">Upload reference images</p>
                  <p className="text-xs text-[rgba(13,38,75,0.6)] mt-1">JPG, PNG format • Max 5 files</p>
                  {photoFiles.length > 0 && (
                    <p className="text-sm text-green-600 mt-2">{photoFiles.length} file(s) selected</p>
                  )}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
          <CardHeader>
            <CardTitle className="text-[rgba(13,38,75,1)]">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                placeholder="Your contact number" 
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                required
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <Button 
            type="submit"
            className="flex-1 h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Post Inspection Request
          </Button>
          
          <Button 
            type="button"
            onClick={() => navigate("/client-dashboard/marketplace")}
            variant="outline" 
            className="flex-1 h-12 border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};