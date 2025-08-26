import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Shield, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsAndConditions = () => {
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
              <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
              <span className="text-sm font-medium text-[rgba(13,38,75,1)]">Legal</span>
            </div>
            
            <h1 className="text-[rgba(13,38,75,1)] text-3xl md:text-5xl font-bold mb-4">
              Terms and Conditions
            </h1>
            <p className="text-[rgba(13,38,75,0.7)] text-lg md:text-xl max-w-2xl mx-auto">
              Please read these terms carefully before using our platform
            </p>
            <p className="text-[rgba(13,38,75,0.6)] text-sm mt-2">
              Last updated: August 26, 2025
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Agreement */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  By accessing and using EyesOnGround ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            {/* Platform Description */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Platform Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  EyesOnGround is a remote inspection platform that connects clients who need inspection services with verified agents who provide on-site inspection services. Our platform facilitates:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Equipment and vehicle inspections at auctions and other locations</li>
                  <li>Real-time reporting with photos, videos, and detailed assessments</li>
                  <li>Professional inspection services across various categories</li>
                  <li>Secure communication between clients and agents</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <h4 className="font-semibold text-[rgba(13,38,75,1)]">For Clients:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information about inspection requirements</li>
                  <li>Make timely payments for services rendered</li>
                  <li>Respect agent time and scheduling constraints</li>
                  <li>Use inspection reports responsibly for purchasing decisions</li>
                </ul>
                
                <h4 className="font-semibold text-[rgba(13,38,75,1)] mt-6">For Agents:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide honest, accurate, and professional inspection services</li>
                  <li>Maintain appropriate qualifications and insurance</li>
                  <li>Respect property owners and follow all safety protocols</li>
                  <li>Deliver reports within agreed timeframes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  Payment for inspection services is processed through our secure platform. Clients agree to pay for services upon completion of inspections. Agents receive payment according to the payment schedule outlined in their agreement with EyesOnGround.
                </p>
                <p>
                  Refunds may be available in cases of service dissatisfaction, subject to our refund policy and investigation of the complaint.
                </p>
              </CardContent>
            </Card>

            {/* Liability Limitations */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Liability and Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  EyesOnGround acts as a platform connecting clients and agents. We are not responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The accuracy of inspection reports (agents are independently responsible)</li>
                  <li>Purchasing decisions made based on inspection reports</li>
                  <li>Actions or omissions of agents during inspections</li>
                  <li>Property damage that may occur during inspections</li>
                </ul>
                <p className="font-semibold">
                  Inspections are for informational purposes only. Clients should use their own judgment when making purchasing decisions.
                </p>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Privacy and Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                </p>
                <Button asChild variant="outline" className="border-[rgba(42,100,186,1)] text-[rgba(42,100,186,1)]">
                  <Link to="/privacy-policy">View Privacy Policy</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[rgba(13,38,75,0.8)]">
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@eyesonground.com</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Business Ave, Suite 100, City, State 12345</p>
                </div>
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

export default TermsAndConditions;
