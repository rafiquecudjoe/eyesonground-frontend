import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Shield, Lock, Database, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgba(42,100,186,0.05)] via-white to-[rgba(13,38,75,0.03)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[rgba(42,100,186,0.3)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[rgba(13,38,75,0.2)] rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-[rgba(13,38,75,1)] hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg relative">
            <Eye className="w-6 h-6 text-white" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg className="w-2 h-2 text-[rgba(42,100,186,1)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-wide">EYESONGROUND</span>
        </Link>
        
        <Button variant="ghost" asChild className="text-[rgba(13,38,75,1)]">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-8 pt-4">
        <div className="w-full max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-6">
              <Lock className="h-5 w-5 text-[rgba(42,100,186,1)]" />
              <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Privacy</span>
            </div>
            
            <h1 className="text-[rgba(13,38,75,1)] text-3xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-[rgba(13,38,75,0.7)] text-lg md:text-xl max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <p className="text-[rgba(13,38,75,0.6)] text-sm mt-2">
              Last updated: August 26, 2025
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Our Commitment to Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  At EyesOnGround, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p>
                  We understand that trust is essential for our business, and we take our responsibility to protect your data seriously.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Database className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <h4 className="font-semibold text-[rgba(13,38,75,1)]">Personal Information:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, phone number</li>
                  <li>Account credentials and profile information</li>
                  <li>Payment and billing information</li>
                  <li>Address and location data (when required for services)</li>
                </ul>
                
                <h4 className="font-semibold text-[rgba(13,38,75,1)] mt-6">Service Information:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Inspection requests and details</li>
                  <li>Communication between clients and agents</li>
                  <li>Photos, videos, and reports uploaded to the platform</li>
                  <li>Service history and preferences</li>
                </ul>
                
                <h4 className="font-semibold text-[rgba(13,38,75,1)] mt-6">Technical Information:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our inspection services</li>
                  <li>Match clients with appropriate agents</li>
                  <li>Process payments and maintain records</li>
                  <li>Communicate with you about your account and services</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal requirements</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Users className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Agents and Clients:</strong> Contact information and service details necessary to complete inspections</li>
                  <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform (payment processors, hosting providers)</li>
                  <li><strong>Legal Compliance:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                </ul>
                <p className="font-semibold text-[rgba(13,38,75,1)]">
                  We never sell your personal information to third parties for marketing purposes.
                </p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>Our security measures include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication systems</li>
                  <li>Employee training on data protection</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your account and personal data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>
                  To exercise these rights, contact us at privacy@eyesonground.com
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our platform. These help us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze platform usage and performance</li>
                  <li>Provide personalized content</li>
                  <li>Ensure platform security</li>
                </ul>
                <p>
                  You can manage cookie preferences through your browser settings.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Privacy Officer:</strong> privacy@eyesonground.com</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Business Ave, Suite 100, City, State 12345</p>
                </div>
                <Button asChild variant="outline" className="border-[rgba(42,100,186,1)] text-[rgba(42,100,186,1)]">
                  <Link to="/terms-and-conditions">View Terms & Conditions</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-[rgba(42,100,186,0.1)]">
            <p className="text-[rgba(13,38,75,0.6)] text-sm">
              © 2025 EyesOnGround. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
