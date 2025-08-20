
import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

export const CreateService = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = () => {
    // Here you would handle the form submission, possibly sending data to an API
    console.log({ 
      itemName, 
      purpose, 
      location, 
      phoneNumber, 
      additionalInfo,
      photoFile,
      videoFile
    });
    
    // For demo purposes, navigate back to service history
    navigate("/client-dashboard/service-history");
  };
  
  const handleCancel = () => {
    navigate("/client-dashboard/service-history");
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate("/client-dashboard/service-history")}
            className="p-2 mr-4 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[rgba(13,38,75,1)]">Create A Service</h1>
            <p className="text-gray-600 text-sm">Kindly Fill The Details Below</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input 
              id="itemName" 
              placeholder="Type here" 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input 
              id="purpose" 
              placeholder="Type here" 
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Current location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem>
                <SelectItem value="abuja">Abuja</SelectItem>
                <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                <SelectItem value="ibadan">Ibadan</SelectItem>
                <SelectItem value="kano">Kano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              placeholder="Type here" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Label>Photo upload</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
            />
            <label 
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="h-8 w-8 text-[rgba(42,100,186,1)] mb-2" />
              <p className="text-sm font-medium text-gray-700">Select image to upload</p>
              <p className="text-xs text-gray-500 mt-1">JPG and PNG format</p>
              {photoFile && (
                <p className="text-sm text-green-600 mt-2">{photoFile.name}</p>
              )}
            </label>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Label>Video upload (optional)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
            <input
              type="file"
              id="video-upload"
              className="hidden"
              accept="video/mp4"
              onChange={handleVideoChange}
            />
            <label 
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <Upload className="h-8 w-8 text-[rgba(42,100,186,1)] mb-2" />
              <p className="text-sm font-medium text-gray-700">Select video to upload</p>
              <p className="text-xs text-gray-500 mt-1">20mb limit</p>
              {videoFile && (
                <p className="text-sm text-green-600 mt-2">{videoFile.name}</p>
              )}
            </label>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Label htmlFor="additionalInfo">Additional details (optional)</Label>
          <Textarea 
            id="additionalInfo" 
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="text-right text-xs text-gray-500">250/500 words</div>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[rgba(42,100,186,1)] hover:bg-[rgba(13,38,75,1)] text-white py-6 transition-colors"
          >
            Continue with PSI
          </Button>
          
          <Button 
            onClick={handleCancel}
            variant="outline" 
            className="w-full border-gray-300 py-6"
          >
            Cancel PSI
          </Button>
        </div>
      </div>
    </div>
  );
};
