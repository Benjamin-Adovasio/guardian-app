import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600">Last Updated: December 5, 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <FileText className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Guardian is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal and medical information when you use our emergency medical services application at Bates College.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Eye className="w-5 h-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Name and email address (from your Bates account)</li>
                  <li>Phone number</li>
                  <li>Profile picture (optional)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Medical Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Blood type</li>
                  <li>Known allergies</li>
                  <li>Current medications</li>
                  <li>Medical conditions</li>
                  <li>Emergency contact information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location Data</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Real-time location (only when you use navigation features)</li>
                  <li>Location is not stored or tracked</li>
                  <li>Used solely for emergency navigation and route planning</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Lock className="w-5 h-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Emergency Response:</strong> Your medical information is available to emergency responders through your Guardian Card to provide appropriate care.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Navigation Services:</strong> Location data is used to help you find AEDs and navigate campus during emergencies.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>AI Assistance:</strong> Your conversations with Guardian AI are used to provide personalized emergency guidance.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Service Improvement:</strong> Aggregated, anonymized data may be used to improve campus safety services.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
              <CardTitle className="text-red-900">Data Security</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure cloud storage with access controls</li>
                <li>Limited access to medical information (only authorized personnel)</li>
                <li>Regular security audits and updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
              <CardTitle className="text-orange-900">Data Sharing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>Your information may be shared with:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Emergency Services:</strong> First responders and medical personnel in emergency situations</li>
                <li><strong>Bates College:</strong> Campus security and health services as necessary</li>
                <li><strong>Your Emergency Contacts:</strong> As designated by you</li>
              </ul>
              <p className="mt-4 font-semibold">We will NEVER sell your data to third parties.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-gray-900">Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Access:</strong> View all information we have about you</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Update:</strong> Modify your medical and personal information at any time</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Delete:</strong> Request deletion of your account and data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Opt-out:</strong> Disable location services in your device settings</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-blue-200">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                <strong>Questions or Concerns?</strong>
              </p>
              <p className="text-gray-700">
                Contact Bates College Campus Security or the Health Center for privacy-related inquiries about Guardian.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}