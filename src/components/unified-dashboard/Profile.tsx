import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Upload, Star, Eye, Shield, CheckCircle, CreditCard, Wallet, Settings, Bell, Lock, DollarSign, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const Profile = ({ userType }: { userType: "client" | "agent" }) => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    bio: userType === "agent" ? "Experienced automotive inspector with 5+ years in the field." : ""
  });

  const [addressInfo, setAddressInfo] = useState({
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [agentStats] = useState({
    completedInspections: 127,
    rating: 4.9,
    responseTime: "< 2 hours",
    successRate: "98%"
  });

  // Mock payment methods for clients
  const [paymentMethods] = useState([
    {
      id: 1,
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ]);

  // Mock bank accounts for agents
  const [bankAccounts] = useState([
    {
      id: 1,
      bankName: "Chase Bank",
      accountType: "Checking",
      last4: "1234",
      isDefault: true
    }
  ]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePersonalInfo = () => {
    setIsEditingPersonal(false);
    toast.success("Personal information updated successfully");
  };

  const handleSaveAddressInfo = () => {
    setIsEditingAddress(false);
    toast.success("Address information updated successfully");
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification preferences updated");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Profile Header */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] border-[rgba(42,100,186,0.2)]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white text-2xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-md border-[rgba(42,100,186,0.3)]"
                  onClick={() => toast.info("Profile picture upload not implemented")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-[rgba(13,38,75,1)]">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </h1>
                  <Badge className={`${userType === 'agent' ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)]' : 'bg-[rgba(42,100,186,0.1)] text-[rgba(42,100,186,1)]'} text-white`}>
                    {userType === 'client' ? 'Client' : 'PSI Agent'}
                  </Badge>
                </div>
                <p className="text-[rgba(13,38,75,0.7)] mb-4">{personalInfo.email}</p>
                
                {userType === "agent" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white/60 rounded-xl">
                      <div className="text-xl font-bold text-[rgba(13,38,75,1)]">{agentStats.completedInspections}</div>
                      <div className="text-xs text-[rgba(13,38,75,0.7)]">Inspections</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-xl">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold text-[rgba(13,38,75,1)]">{agentStats.rating}</span>
                      </div>
                      <div className="text-xs text-[rgba(13,38,75,0.7)]">Rating</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-xl">
                      <div className="text-xl font-bold text-[rgba(13,38,75,1)]">{agentStats.responseTime}</div>
                      <div className="text-xs text-[rgba(13,38,75,0.7)]">Response</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-xl">
                      <div className="text-xl font-bold text-[rgba(13,38,75,1)]">{agentStats.successRate}</div>
                      <div className="text-xs text-[rgba(13,38,75,0.7)]">Success Rate</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6 bg-white/80 backdrop-blur-sm border border-[rgba(42,100,186,0.1)] grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="personal" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Personal
          </TabsTrigger>
          <TabsTrigger value="address" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Address
          </TabsTrigger>
          <TabsTrigger value={userType === "client" ? "payments" : "banking"} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            {userType === "client" ? "Payments" : "Banking"}
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Settings
          </TabsTrigger>
          {userType === "agent" && (
            <TabsTrigger value="verification" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
              Verification
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="personal">
          <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[rgba(13,38,75,1)]">Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]"
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
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
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
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
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
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
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
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
                        {personalInfo.phone}
                      </div>
                    )}
                  </div>
                </div>

                {isEditingPersonal && (
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSavePersonalInfo}
                      className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[rgba(13,38,75,1)]">Address Information</CardTitle>
                <CardDescription>Update your address details</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]"
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
                      className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                    />
                  ) : (
                    <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
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
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
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
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
                        {addressInfo.state}
                      </div>
                    )}
                  </div>
                </div>

                {isEditingAddress && (
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSaveAddressInfo}
                      className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab (Clients) */}
        {userType === "client" && (
          <TabsContent value="payments">
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your payment methods for inspection services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-[rgba(42,100,186,0.2)] rounded-xl bg-white/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-[rgba(13,38,75,1)]">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-[rgba(13,38,75,0.7)]">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                        {method.isDefault && (
                          <Badge className="bg-green-100 text-green-800">Default</Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button className="w-full bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Banking Tab (Agents) */}
        {userType === "agent" && (
          <TabsContent value="banking">
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Banking & Withdrawals
                </CardTitle>
                <CardDescription>
                  Manage your bank accounts and withdrawal preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Balance */}
                  <div className="p-6 bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-xl border border-[rgba(42,100,186,0.2)]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[rgba(13,38,75,1)]">Available Balance</h3>
                      <DollarSign className="h-6 w-6 text-[rgba(42,100,186,1)]" />
                    </div>
                    <div className="text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">$1,247.50</div>
                    <p className="text-sm text-[rgba(13,38,75,0.7)]">Ready for withdrawal</p>
                    <Button className="mt-4 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                      Withdraw Funds
                    </Button>
                  </div>

                  {/* Bank Accounts */}
                  <div>
                    <h3 className="text-lg font-bold text-[rgba(13,38,75,1)] mb-4">Bank Accounts</h3>
                    <div className="space-y-3">
                      {bankAccounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-4 border border-[rgba(42,100,186,0.2)] rounded-xl bg-white/60">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center">
                              <Wallet className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-[rgba(13,38,75,1)]">
                                {account.bankName} - {account.accountType}
                              </p>
                              <p className="text-sm text-[rgba(13,38,75,0.7)]">
                                •••• {account.last4}
                              </p>
                            </div>
                            {account.isDefault && (
                              <Badge className="bg-green-100 text-green-800">Default</Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button className="w-full bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Bank Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">Email Notifications</p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">Receive updates via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">SMS Notifications</p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">Receive updates via text message</p>
                    </div>
                    <Switch 
                      checked={notifications.sms} 
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">Push Notifications</p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">Receive browser notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.push} 
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Shield className="mr-2 h-4 w-4" />
                    Enable Two-Factor Authentication
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Settings className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Account Actions</CardTitle>
                <CardDescription>
                  Manage your account settings and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Upload className="mr-2 h-4 w-4" />
                    Export Account Data
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {userType === "agent" && (
          <TabsContent value="verification">
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Agent Verification
                </CardTitle>
                <CardDescription>
                  Manage your verification documents and certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Verification Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-800">Identity Verified</p>
                      <p className="text-xs text-green-600">Completed Dec 1, 2024</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-800">Background Check</p>
                      <p className="text-xs text-green-600">Completed Dec 1, 2024</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-blue-800">Skills Assessment</p>
                      <p className="text-xs text-blue-600">Score: 95/100</p>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="border-2 border-dashed border-[rgba(42,100,186,0.3)] rounded-xl p-8 text-center bg-[rgba(42,100,186,0.02)]">
                    <Upload className="h-8 w-8 text-[rgba(42,100,186,1)] mx-auto mb-2" />
                    <p className="text-sm font-medium text-[rgba(13,38,75,1)]">Upload Additional Certifications</p>
                    <p className="text-xs text-[rgba(13,38,75,0.6)] mt-1">PDF, JPG, PNG • Max 10MB</p>
                    <Button className="mt-4 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};