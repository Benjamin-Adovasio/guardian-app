import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Building, Navigation, AlertCircle, X, Compass, Edit, Save, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import UserLocationMarker from "../components/UserLocationMarker";
import RoutePolyline from "../components/RoutePolyline";
import MapRotationController from "../components/MapRotationController";
import { toast } from "sonner";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker icon for AED locations
const aedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Path Drawing Component
function PathDrawer({ isDrawing, currentPath, onPathClick }) {
  useMapEvents({
    click: (e) => {
      if (isDrawing) {
        onPathClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return currentPath.length > 0 ? (
    <Polyline positions={currentPath} color="blue" weight={4} opacity={0.7} dashArray="5, 10" />
  ) : null;
}

export default function AEDLocations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAED, setSelectedAED] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [heading, setHeading] = useState(0);
  const [user, setUser] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [pathName, setPathName] = useState("");
  const queryClient = useQueryClient();

  const { data: locations, isLoading } = useQuery({
    queryKey: ['aed-locations'],
    queryFn: () => base44.entities.AEDLocation.list(),
    initialData: [],
  });

  const { data: campusPaths, isLoading: pathsLoading } = useQuery({
    queryKey: ['campus-paths'],
    queryFn: () => base44.entities.CampusPath.list(),
    initialData: [],
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const createPathMutation = useMutation({
    mutationFn: (pathData) => base44.entities.CampusPath.create(pathData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campus-paths'] });
      setCurrentPath([]);
      setPathName("");
      setIsDrawingMode(false);
      toast.success("Path saved successfully");
    },
  });

  const deletePathMutation = useMutation({
    mutationFn: (pathId) => base44.entities.CampusPath.delete(pathId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campus-paths'] });
      toast.success("Path deleted");
    },
  });

  const handleSelectAED = (location) => {
    setSelectedAED(location);
  };

  const handleClearRoute = () => {
    setSelectedAED(null);
  };

  const handlePathClick = (coords) => {
    setCurrentPath([...currentPath, coords]);
  };

  const handleSavePath = () => {
    if (currentPath.length < 2) {
      toast.error("Path must have at least 2 points");
      return;
    }
    if (!pathName.trim()) {
      toast.error("Please enter a path name");
      return;
    }
    createPathMutation.mutate({
      name: pathName,
      coordinates: currentPath,
      path_type: "sidewalk"
    });
  };

  const handleCancelDrawing = () => {
    setCurrentPath([]);
    setPathName("");
    setIsDrawingMode(false);
  };

  const isAdmin = user?.role === 'admin';

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Filter and sort locations by distance
  const filteredLocations = locations
    .filter(location =>
      location.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(location => ({
      ...location,
      distance: userPosition && location.latitude && location.longitude
        ? calculateDistance(userPosition[0], userPosition[1], location.latitude, location.longitude)
        : Infinity
    }))
    .sort((a, b) => a.distance - b.distance);

  // Bates College campus center coordinates
  const campusCenter = [44.1061, -70.2033];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">AED Locations</h1>
              <p className="text-gray-600">Automated External Defibrillators at Bates College</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  What is an AED?
                </p>
                <p className="text-sm text-blue-800">
                  An Automated External Defibrillator (AED) is a portable device that checks heart rhythm and can send an electric shock to the heart to restore a normal rhythm during cardiac arrest. AEDs are designed to be used by anyone.
                </p>
              </div>
            </div>
          </div>

          {/* Active Route Banner */}
          {selectedAED && userPosition && (
            <div className="bg-blue-600 text-white rounded-lg p-4 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg mb-1">Navigating to: {selectedAED.name}</p>
                  <p className="text-blue-100 text-sm">
                    Distance: {Math.round(selectedAED.distance)} meters
                  </p>
                </div>
                <Button
                  onClick={handleClearRoute}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {heading > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Compass className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-900 font-medium mb-1">
                    Compass Active
                  </p>
                  <p className="text-sm text-purple-800">
                    Map rotates to match your direction. Heading: {Math.round(heading)}°
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Admin Path Drawing Controls */}
          {isAdmin && !isDrawingMode && (
            <Button
              onClick={() => setIsDrawingMode(true)}
              className="mb-6 bg-purple-600 hover:bg-purple-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Draw Campus Paths
            </Button>
          )}

          {isDrawingMode && (
            <Card className="mb-6 bg-purple-50 border-purple-300">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-purple-900 font-semibold">
                    <Edit className="w-5 h-5" />
                    Drawing Mode Active
                  </div>
                  <p className="text-sm text-purple-800">
                    Click on the map to add points to your path. Create accurate walking routes between buildings.
                  </p>
                  <Input
                    placeholder="Path name (e.g., 'Commons to Library')"
                    value={pathName}
                    onChange={(e) => setPathName(e.target.value)}
                    className="bg-white"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSavePath}
                      disabled={currentPath.length < 2 || !pathName.trim() || createPathMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Path ({currentPath.length} points)
                    </Button>
                    <Button
                      onClick={handleCancelDrawing}
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by building name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* Interactive Map */}
        {isLoading ? (
          <Card className="shadow-lg mb-8">
            <CardContent className="p-0">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg mb-8 overflow-hidden">
            <CardContent className="p-0">
              <MapContainer 
                center={campusCenter} 
                zoom={15} 
                style={{ height: '500px', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Map Rotation Controller */}
                <MapRotationController heading={heading} />

                {/* User Location Marker */}
                <UserLocationMarker 
                  onPositionChange={setUserPosition}
                  onHeadingChange={setHeading}
                />

                {/* Campus Paths */}
                {campusPaths.map((path) => (
                  <Polyline
                    key={path.id}
                    positions={path.coordinates}
                    color="#10b981"
                    weight={3}
                    opacity={0.6}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-sm mb-2">{path.name}</h3>
                        {isAdmin && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePathMutation.mutate(path.id)}
                            className="w-full"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </Popup>
                  </Polyline>
                ))}

                {/* Path Drawing */}
                {isDrawingMode && (
                  <PathDrawer
                    isDrawing={isDrawingMode}
                    currentPath={currentPath}
                    onPathClick={handlePathClick}
                  />
                )}

                {/* Route Polyline */}
                {selectedAED && userPosition && (
                  <RoutePolyline
                    userPosition={userPosition}
                    destination={[selectedAED.latitude, selectedAED.longitude]}
                    campusPaths={campusPaths}
                  />
                )}
                
                {/* AED Location Markers */}
                {filteredLocations.map((location) => (
                  location.latitude && location.longitude && (
                    <Marker 
                      key={location.id} 
                      position={[location.latitude, location.longitude]}
                      icon={aedIcon}
                      eventHandlers={{
                        click: () => handleSelectAED(location)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{location.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{location.address}</p>
                          {location.distance !== Infinity && (
                            <p className="text-sm text-blue-600 font-medium mb-3">
                              {Math.round(location.distance)} meters away
                            </p>
                          )}
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              className="w-full bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleSelectAED(location)}
                            >
                              <Navigation className="w-4 h-4 mr-2" />
                              Show Route
                            </Button>
                            <Link to={`${createPageUrl("AEDLocationDetail")}?id=${location.id}`}>
                              <Button size="sm" variant="outline" className="w-full">
                                Indoor Navigation
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </CardContent>
          </Card>
        )}

        {/* Locations Grid - Sorted by Distance */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredLocations.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchQuery ? "No AED locations found matching your search" : "No AED locations available yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div>
            {userPosition && (
              <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Sorted by distance (closest first)
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location, index) => (
                <Card 
                  key={location.id} 
                  className={`shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 cursor-pointer ${
                    selectedAED?.id === location.id 
                      ? 'border-l-blue-600 ring-2 ring-blue-200' 
                      : 'border-l-red-500'
                  }`}
                  onClick={() => handleSelectAED(location)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          selectedAED?.id === location.id ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          <Building className={`w-5 h-5 ${
                            selectedAED?.id === location.id ? 'text-blue-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            {userPosition && index === 0 && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                Nearest
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg text-gray-900">
                            {location.name}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Navigation className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">{location.address}</p>
                    </div>
                    
                    {location.distance !== Infinity && (
                      <p className="text-sm text-blue-600 font-medium">
                        {Math.round(location.distance)} meters away
                      </p>
                    )}
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAED(location);
                        }}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        {selectedAED?.id === location.id ? 'Navigating...' : 'Show Route'}
                      </Button>
                      
                      <Link 
                        to={`${createPageUrl("AEDLocationDetail")}?id=${location.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" variant="outline" className="w-full">
                          Indoor Navigation
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}