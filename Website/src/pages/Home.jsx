import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, BookOpen, Heart, AlertCircle, User } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LocationDisplay from "../components/LocationDisplay";

export default function Home() {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    loadUser();
    getUserLocation();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleEmergencyCall = () => {
    setShowEmergencyDialog(true);
  };

  const quickActions = [
    {
      title: "Find AED",
      description: "Locate nearest AED device",
      icon: Heart,
      color: "from-red-500 to-red-600",
      url: createPageUrl("AEDLocations"),
    },
    {
      title: "First Aid Guide",
      description: "Emergency instructions",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      url: createPageUrl("FirstAid"),
    },
    {
      title: "Guardian Card",
      description: "Emergency medical info",
      icon: User,
      color: "from-purple-500 to-purple-600",
      url: createPageUrl("GuardianCard"),
    },
    {
      title: "Emergency Contacts",
      description: "Campus medical services",
      icon: Phone,
      color: "from-green-500 to-green-600",
      url: createPageUrl("EmergencyContacts"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <AlertCircle className="w-4 h-4" />
            Bates College Emergency Medical Services
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quick Medical Access
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get immediate help, find AED locations, and access first aid information when you need it most.
          </p>
        </div>

        {/* Location Display */}
        <div className="mb-8">
          <LocationDisplay />
        </div>

        {/* Emergency SOS Button */}
        <Card className="mb-8 overflow-hidden border-2 border-red-200 shadow-2xl">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center">
            <AlertCircle className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Medical Emergency?
            </h2>
            <Button
              size="lg"
              onClick={handleEmergencyCall}
              className="bg-white text-red-600 hover:bg-red-50 text-xl px-8 py-6 h-auto shadow-xl transform hover:scale-105 transition-transform"
            >
              <Phone className="w-6 h-6 mr-3" />
              CALL CAMPUS EMS NOW
            </Button>
            <p className="text-red-100 text-sm mt-4">
              For life-threatening emergencies, call 911
            </p>
          </div>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.url}>
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer">
                <div className={`h-2 bg-gradient-to-r ${action.color}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{action.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <AlertCircle className="w-5 h-5" />
              Campus Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Save campus emergency numbers in your phone contacts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Know the locations of AEDs in buildings you frequent</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Keep your medical profile updated with current information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Consider taking a first aid and CPR certification course</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Call Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-red-600 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Emergency Contact
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              <div className="space-y-4">
                {userLocation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Your Location
                    </p>
                    <p className="text-sm text-blue-800 font-mono">
                      {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Share these coordinates with emergency services
                    </p>
                  </div>
                )}

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-bold text-red-900 mb-2">Bates Emergency Medical Services</p>
                  <a 
                    href="tel:207-786-6111" 
                    className="text-3xl font-bold text-red-600 hover:underline"
                  >
                    207-786-6111
                  </a>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="font-bold text-yellow-900 mb-2">Life-Threatening Emergency</p>
                  <a 
                    href="tel:911" 
                    className="text-3xl font-bold text-yellow-600 hover:underline"
                  >
                    911
                  </a>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  Click the number to call directly. If someone is unconscious, not breathing, or in severe distress, call 911 immediately.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}