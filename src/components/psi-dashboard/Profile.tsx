
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

const ProfileSection = ({ title, children, onEdit }: ProfileSectionProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 rounded-full"
              onClick={onEdit}
            >
              Edit <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export const Profile = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe32@gmail.com",
    phone: "092829383",
    role: "PSI agent",
  });

  const [addressInfo, setAddressInfo] = useState({
    fullAddress: "12, Allen street, iryah",
    city: "Orlsno",
    zipCode: "+203",
    country: "Canada",
  });

  const [document, setDocument] = useState<File | null>(null);

  const handlePersonalInfoEdit = () => {
    setEditing("personal");
  };

  const handleAddressInfoEdit = () => {
    setEditing("address");
  };

  const handleSaveChanges = () => {
    setEditing(null);
    // In a real app, you would save changes to a database here
    console.log("Saving changes:", { personalInfo, addressInfo, document });
  };

  const handleCancel = () => {
    setEditing(null);
    // Reset any changes made during editing
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 9; // Total number of fields we're checking

    // Personal info checks
    if (personalInfo.firstName) completed++;
    if (personalInfo.lastName) completed++;
    if (personalInfo.email) completed++;
    if (personalInfo.phone) completed++;
    if (personalInfo.role) completed++;

    // Address info checks
    if (addressInfo.fullAddress) completed++;
    if (addressInfo.city) completed++;
    if (addressInfo.zipCode) completed++;
    if (addressInfo.country) completed++;

    // Document check
    if (document) completed++;
    total++; // Include document in total count

    return Math.floor((completed / total) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-semibold text-[rgba(13,38,75,1)] mb-8">My profile</h1>
      
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/lovable-uploads/1b8469b9-789f-4789-bc8f-03ba205f9a4f.png" alt="John Doe" />
            <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white text-2xl">JD</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-xl font-medium">Name: {personalInfo.firstName} {personalInfo.lastName}</h2>
          <p className="text-gray-600 mb-1">Role: {personalInfo.role}</p>
          <p className="flex items-center">
            Profile status: 
            <span className={`ml-1 ${completionPercentage >= 80 ? 'text-green-500' : completionPercentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
              {completionPercentage}% complete
            </span>
          </p>
        </div>
      </div>

      <ProfileSection title="Personal Information" onEdit={handlePersonalInfoEdit}>
        {editing === "personal" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input 
                id="firstName" 
                value={personalInfo.firstName} 
                onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input 
                id="lastName" 
                value={personalInfo.lastName} 
                onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                value={personalInfo.email} 
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input 
                id="phone" 
                value={personalInfo.phone} 
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                value={personalInfo.role} 
                disabled 
                className="bg-gray-100" 
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">First name</p>
              <p className="font-medium">{personalInfo.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last name</p>
              <p className="font-medium">{personalInfo.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email address</p>
              <p className="font-medium">{personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone number</p>
              <p className="font-medium">{personalInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{personalInfo.role}</p>
            </div>
          </div>
        )}
      </ProfileSection>

      <ProfileSection title="Address Information" onEdit={handleAddressInfoEdit}>
        {editing === "address" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="fullAddress">Full address</Label>
              <Textarea 
                id="fullAddress" 
                value={addressInfo.fullAddress} 
                onChange={(e) => setAddressInfo({...addressInfo, fullAddress: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={addressInfo.city} 
                onChange={(e) => setAddressInfo({...addressInfo, city: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip code</Label>
              <Input 
                id="zipCode" 
                value={addressInfo.zipCode} 
                onChange={(e) => setAddressInfo({...addressInfo, zipCode: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                value={addressInfo.country} 
                onChange={(e) => setAddressInfo({...addressInfo, country: e.target.value})}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Full address</p>
              <p className="font-medium">{addressInfo.fullAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{addressInfo.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Zip code</p>
              <p className="font-medium">{addressInfo.zipCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">{addressInfo.country}</p>
            </div>
          </div>
        )}
      </ProfileSection>

      <ProfileSection title="ID document">
        <div className="flex flex-col items-center justify-center py-4">
          {document ? (
            <div className="text-center">
              <p className="font-medium mb-3">{document.name}</p>
              <Button variant="outline" onClick={() => setDocument(null)}>Remove</Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No record</p>
              <p className="text-xs text-gray-400 mb-1">Maximum file size: 8mb</p>
              <p className="text-xs text-gray-400 mb-6">Supported format: PDF, MPEG, JPEG</p>
              <label htmlFor="documentUpload">
                <div className="cursor-pointer">
                  <Button variant="outline" className="text-green-600 border-green-600 hover:text-green-700 hover:border-green-700">
                    <Upload className="mr-2 h-4 w-4" /> Upload document
                  </Button>
                  <input
                    id="documentUpload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.mpeg"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
            </div>
          )}
        </div>
      </ProfileSection>

      {editing && (
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            className="w-full md:w-auto min-w-[200px] bg-[rgba(13,38,75,1)]" 
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
          <Button 
            variant="outline" 
            className="w-full md:w-auto min-w-[200px]" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

// Helper component for the Avatar
const Avatar = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const AvatarImage = ({ src, alt }: { src: string, alt: string }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

const AvatarFallback = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      {children}
    </div>
  );
};
