import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, CheckCircle, Users } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600">Last Updated: December 5, 2025</p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-600 rounded-lg p-6 mb-6 shadow-xl">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold text-lg mb-2">Critical Notice</p>
              <p className="text-red-100">
                Guardian is a supplementary emergency information tool. It does NOT replace professional medical advice, diagnosis, or treatment. In life-threatening emergencies, always call 911 immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <CheckCircle className="w-5 h-5" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Guardian, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this application. These terms apply to all Bates College students, faculty, and staff using the Guardian emergency services platform.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Users className="w-5 h-5" />
                Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span>You must have a valid @bates.edu email address to use Guardian</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span>You must be affiliated with Bates College as a student, faculty, or staff member</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span>You must be at least 18 years old or have parental consent</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span>You agree to provide accurate medical information</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
              <CardTitle className="text-purple-900">Service Description</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">Guardian provides the following services:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Emergency contact directory for campus services</li>
                <li>AED (Automated External Defibrillator) location mapping and navigation</li>
                <li>Digital medical information card (Guardian Card)</li>
                <li>AI-powered emergency guidance (Guardian AI)</li>
                <li>First aid reference guides</li>
                <li>Campus safety resources</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
              <CardTitle className="text-red-900">Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p className="font-semibold text-red-900">IMPORTANT - PLEASE READ CAREFULLY:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Guardian is NOT a substitute for professional medical care</li>
                  <li>Information provided is for educational and reference purposes only</li>
                  <li>Always seek qualified medical advice for any health concerns</li>
                  <li>In emergencies, call 911 or campus security immediately</li>
                  <li>Guardian AI guidance should not replace professional medical judgment</li>
                  <li>First aid guides are general information - proper training is essential</li>
                  <li>Bates College and Guardian are not liable for medical outcomes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
              <CardTitle className="text-orange-900">User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-3">As a Guardian user, you agree to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Provide accurate and up-to-date medical information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Update your Guardian Card whenever medical information changes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Use the app only for legitimate emergency and safety purposes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Not misuse emergency services or make false reports</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Respect the privacy of other users</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Keep your login credentials secure</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-gray-900">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, Guardian and Bates College shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use this service, including but not limited to medical outcomes, injuries, or emergency response times. The service is provided "as is" without warranties of any kind.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <CardTitle className="text-blue-900">Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed mb-3">
                Your use of Guardian is subject to our Privacy Policy. By using the service, you consent to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Collection and storage of your medical information</li>
                <li>Sharing information with emergency responders when necessary</li>
                <li>Use of location data for navigation services</li>
                <li>Processing of your data as described in our Privacy Policy</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
              <CardTitle className="text-purple-900">Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Guardian strives for 24/7 availability but does not guarantee uninterrupted service</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Service may be temporarily unavailable for maintenance or updates</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>We are not responsible for connectivity issues or device limitations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Features may be modified or discontinued with notice</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
              <CardTitle className="text-red-900">Termination</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Bates College reserves the right to suspend or terminate your access to Guardian at any time for violation of these terms, misuse of the service, or when you are no longer affiliated with Bates College. You may also terminate your account at any time through the Settings page.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
              <CardTitle className="text-green-900">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be posted within the app with an updated "Last Updated" date. Your continued use of Guardian after changes constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-blue-200">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                <strong>Questions About These Terms?</strong>
              </p>
              <p className="text-gray-700">
                Contact Bates College Campus Security or visit the Health Center for questions about Guardian's Terms of Service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}