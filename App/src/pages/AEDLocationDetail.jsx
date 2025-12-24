import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Navigation, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function AEDLocationDetail() {
  const [currentStep, setCurrentStep] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const locationId = urlParams.get('id');

  const { data: location, isLoading } = useQuery({
    queryKey: ['aed-location', locationId],
    queryFn: async () => {
      const locations = await base44.entities.AEDLocation.list();
      return locations.find(loc => loc.id === locationId);
    },
    enabled: !!locationId,
  });

  const navigationImages = location?.navigation_images?.sort((a, b) => a.step_number - b.step_number) || [];

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < navigationImages.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-48 mb-8" />
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-96 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link to={createPageUrl("AEDLocations")}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AED Locations
            </Button>
          </Link>
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">AED location not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to={createPageUrl("AEDLocations")}>
          <Button variant="ghost" className="mb-4 hover:bg-red-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AED Locations
          </Button>
        </Link>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600">Bates College AED Location</p>
        </div>

        {/* Location Header */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl text-gray-900 mb-2">
                  {location.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-600">
                  <Navigation className="w-4 h-4" />
                  <p>{location.address}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200 text-sm">
                Active
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Indoor Navigation */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              Indoor Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {navigationImages.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No navigation images available</p>
                <p className="text-gray-400 text-sm">
                  Navigation images will be added soon to help you find this AED location.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Current Step Display */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">
                        Step {currentStep + 1} of {navigationImages.length}
                      </p>
                      <h3 className="text-xl font-bold text-blue-900 mt-1">
                        {navigationImages[currentStep].description}
                      </h3>
                    </div>
                  </div>

                  {/* Image Display */}
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src={navigationImages[currentStep].image_url}
                      alt={`Navigation step ${currentStep + 1}`}
                      className="w-full h-96 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600?text=Image+Coming+Soon';
                      }}
                    />
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex gap-2">
                      {navigationImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStep
                              ? 'bg-blue-600 w-8'
                              : 'bg-blue-200 hover:bg-blue-300'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={currentStep === navigationImages.length - 1}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Steps Overview */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">All Steps</h4>
                  <div className="space-y-2">
                    {navigationImages.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          index === currentStep
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === currentStep
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <p className={`text-sm ${
                            index === currentStep ? 'text-blue-900 font-medium' : 'text-gray-700'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}