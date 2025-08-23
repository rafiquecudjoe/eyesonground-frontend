import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Shield, 
  Globe, 
  Smartphone, 
  Mail, 
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  CreditCard,
  Wallet,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Settings = ({ userType }: { userType: "client" | "agent" }) => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    instantMessages: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showLocation: true,
    showRating: true,
    allowDirectContact: true
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/New_York",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    theme: "light"
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification preferences updated");
  };

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.success("Privacy settings updated");
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast.success("Preferences updated");
  };

  const handlePasswordChange = () => {
    toast.success("Password updated successfully");
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled");
  };

  const handleExportData = () => {
    toast.info("Preparing your data export...");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires additional verification");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg">
            <SettingsIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)]">Settings</h1>
            <p className="text-[rgba(13,38,75,0.7)]">Manage your account preferences and security</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-6 bg-white/80 backdrop-blur-sm border border-[rgba(42,100,186,0.1)] grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Privacy
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[rgba(42,100,186,1)] data-[state=active]:to-[rgba(13,38,75,1)] data-[state=active]:text-white">
            Account
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
            <CardHeader>
              <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                <Bell className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-[rgba(13,38,75,1)] mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Service Updates</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">
                          {userType === "client" ? "Updates about your inspection requests" : "New assignment notifications"}
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.emailUpdates} 
                        onCheckedChange={(checked) => handleNotificationChange('emailUpdates', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Weekly Reports</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">Summary of your activity and earnings</p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports} 
                        onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Marketing Emails</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">Product updates and promotional content</p>
                      </div>
                      <Switch 
                        checked={notifications.marketingEmails} 
                        onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* SMS Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-[rgba(13,38,75,1)] mb-4 flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    SMS Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Urgent Alerts</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">Critical updates via text message</p>
                      </div>
                      <Switch 
                        checked={notifications.smsAlerts} 
                        onCheckedChange={(checked) => handleNotificationChange('smsAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div>
                  <h3 className="text-lg font-semibold text-[rgba(13,38,75,1)] mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                    Browser Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Push Notifications</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">Real-time browser notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.pushNotifications} 
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Instant Messages</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">New message notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.instantMessages} 
                        onCheckedChange={(checked) => handleNotificationChange('instantMessages', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
            <CardHeader>
              <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-[rgba(13,38,75,1)]">Profile Visibility</Label>
                    <p className="text-sm text-[rgba(13,38,75,0.7)] mb-3">Who can see your profile information</p>
                    <Select value={privacy.profileVisibility} onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}>
                      <SelectTrigger className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Everyone can see</SelectItem>
                        <SelectItem value="verified">Verified Users Only</SelectItem>
                        <SelectItem value="private">Private - Hidden from search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">Show Location</p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">Display your city/region in your profile</p>
                    </div>
                    <Switch 
                      checked={privacy.showLocation} 
                      onCheckedChange={(checked) => handlePrivacyChange('showLocation', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">Show Rating</p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">Display your rating publicly</p>
                    </div>
                    <Switch 
                      checked={privacy.showRating} 
                      onCheckedChange={(checked) => handlePrivacyChange('showRating', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">Allow Direct Contact</p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">
                        {userType === "client" ? "Let agents contact you directly" : "Let clients contact you directly"}
                      </p>
                    </div>
                    <Switch 
                      checked={privacy.allowDirectContact} 
                      onCheckedChange={(checked) => handlePrivacyChange('allowDirectContact', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* Password Change */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your account password for better security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50 pr-12"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[rgba(42,100,186,1)]"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50 pr-12"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[rgba(42,100,186,1)]"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <Button 
                    onClick={handlePasswordChange}
                    className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white"
                  >
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-[rgba(42,100,186,0.05)] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      twoFactorEnabled ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {twoFactorEnabled ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Shield className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[rgba(13,38,75,1)]">
                        {twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}
                      </p>
                      <p className="text-sm text-[rgba(13,38,75,0.7)]">
                        {twoFactorEnabled ? "Your account is protected" : "Enable for better security"}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={handleTwoFactorToggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Login Sessions */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Active Sessions</CardTitle>
                <CardDescription>
                  Manage your active login sessions across devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-[rgba(42,100,186,0.2)] rounded-xl bg-white/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Globe className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Current Session</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">Chrome on Windows • New York, NY</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
            <CardHeader>
              <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                General Preferences
              </CardTitle>
              <CardDescription>
                Customize your experience and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                    <SelectTrigger className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange('timezone', value)}>
                    <SelectTrigger className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => handlePreferenceChange('currency', value)}>
                    <SelectTrigger className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => handlePreferenceChange('dateFormat', value)}>
                    <SelectTrigger className="rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="space-y-6">
            {/* Account Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Account Information</CardTitle>
                <CardDescription>
                  View and manage your account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
                        <Badge className={`${userType === 'agent' ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white' : 'bg-[rgba(42,100,186,0.1)] text-[rgba(42,100,186,1)]'}`}>
                          {userType === 'client' ? 'Client Account' : 'Agent Account'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Member Since</Label>
                      <div className="p-3 border rounded-xl bg-[rgba(42,100,186,0.05)] border-[rgba(42,100,186,0.1)]">
                        December 2024
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Status</Label>
                    <div className="flex items-center gap-2 p-3 border rounded-xl bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-800 font-medium">Verified Account</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Data Management</CardTitle>
                <CardDescription>
                  Export or delete your account data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-[rgba(42,100,186,0.2)] rounded-xl bg-white/60">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                      <div>
                        <p className="font-medium text-[rgba(13,38,75,1)]">Export Account Data</p>
                        <p className="text-sm text-[rgba(13,38,75,0.7)]">Download all your data in JSON format</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleExportData} className="border-[rgba(42,100,186,0.3)]">
                      Export
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl bg-red-50">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">Delete Account</p>
                        <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleDeleteAccount} className="border-red-300 text-red-600 hover:bg-red-100">
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Support & Help</CardTitle>
                <CardDescription>
                  Get help and contact our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <MessageSquare className="mr-3 h-4 w-4" />
                    Contact Support
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Info className="mr-3 h-4 w-4" />
                    Help Center
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)]">
                    <Upload className="mr-3 h-4 w-4" />
                    Report an Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};