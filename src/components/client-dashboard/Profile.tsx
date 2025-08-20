
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon, Upload } from "lucide-react";
import { toast } from "sonner";

export const Profile = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  const [addressInfo, setAddressInfo] = useState({
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePersonalInfo = () => {
    // In a real app, this would save to a database
    setIsEditingPersonal(false);
    toast.success("Personal information updated successfully");
  };

  const handleSaveAddressInfo = () => {
    // In a real app, this would save to a database
    setIsEditingAddress(false);
    toast.success("Address information updated successfully");
  };

  const handleFileUpload = () => {
    // In a real app, this would handle file upload
    toast.success("Document uploaded successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white text-xl">JD</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-md"
              onClick={() => toast.info("Profile picture upload not implemented")}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[rgba(13,38,75,1)]">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-gray-600">{personalInfo.email}</p>
            <p className="text-gray-600">Client Account</p>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                >
                  {isEditingPersonal ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      {isEditingPersonal ? (
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={personalInfo.firstName} 
                          onChange={handlePersonalInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {personalInfo.firstName}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      {isEditingPersonal ? (
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={personalInfo.lastName} 
                          onChange={handlePersonalInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {personalInfo.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditingPersonal ? (
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={personalInfo.email} 
                          onChange={handlePersonalInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {personalInfo.email}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditingPersonal ? (
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={personalInfo.phone} 
                          onChange={handlePersonalInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {personalInfo.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditingPersonal && (
                    <div className="flex justify-end">
                      <Button onClick={handleSavePersonalInfo}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>
                    Update your address details
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                >
                  {isEditingAddress ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    {isEditingAddress ? (
                      <Input 
                        id="street" 
                        name="street" 
                        value={addressInfo.street} 
                        onChange={handleAddressInfoChange} 
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">
                        {addressInfo.street}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditingAddress ? (
                        <Input 
                          id="city" 
                          name="city" 
                          value={addressInfo.city} 
                          onChange={handleAddressInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {addressInfo.city}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditingAddress ? (
                        <Input 
                          id="state" 
                          name="state" 
                          value={addressInfo.state} 
                          onChange={handleAddressInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {addressInfo.state}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      {isEditingAddress ? (
                        <Input 
                          id="zipCode" 
                          name="zipCode" 
                          value={addressInfo.zipCode} 
                          onChange={handleAddressInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {addressInfo.zipCode}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      {isEditingAddress ? (
                        <Input 
                          id="country" 
                          name="country" 
                          value={addressInfo.country} 
                          onChange={handleAddressInfoChange} 
                        />
                      ) : (
                        <div className="p-2 border rounded-md bg-gray-50">
                          {addressInfo.country}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditingAddress && (
                    <div className="flex justify-end">
                      <Button onClick={handleSaveAddressInfo}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Upload and manage your documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="border rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button onClick={handleFileUpload}>
                      Upload Document
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Uploaded Documents</h3>
                    <div className="text-center text-gray-500 py-6">
                      No documents uploaded yet
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
