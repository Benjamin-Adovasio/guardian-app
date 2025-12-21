import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, Shield, Heart, MessageSquare, Building, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmergencyContacts() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['emergency-contacts'],
    queryFn: () => base44.entities.EmergencyContact.list('priority'),
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
    } finally {
      setLoadingUser(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      campus_ems: Heart,
      police: Shield,
      counseling: MessageSquare,
      health_center: Building,
      personal: User,
      other: Phone
    };
    return icons[category] || Phone;
  };

  const getCategoryColor = (category) => {
    const colors = {
      campus_ems: "from-red-500 to-red-600",
      police: "from-blue-500 to-blue-600",
      counseling: "from-purple-500 to-purple-600",
      health_center: "from-green-500 to-green-600",
      personal: "from-orange-500 to-orange-600",
      other: "from-gray-500 to-gray-600"
    };
    return colors[category] || colors.other;
  };

  const getCategoryBadge = (category) => {
    const badges = {
      campus_ems: "bg-red-100 text-red-800 border-red-200",
      police: "bg-blue-100 text-blue-800 border-blue-200",
      counseling: "bg-purple-100 text-purple-800 border-purple-200",
      health_center: "bg-green-100 text-green-800 border-green-200",
      personal: "bg-orange-100 text-orange-800 border-orange-200",
      other: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return badges[category] || badges.other;
  };

  const personalContacts = user?.emergency_contacts || [];
  const allContacts = [
    ...contacts,
    ...personalContacts.map((contact, idx) => ({
      id: `personal-${idx}`,
      service_name: contact.name,
      phone_number: contact.phone,
      description: contact.relationship,
      category: 'personal',
      priority: 1000 + idx
    }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Emergency Contacts</h1>
              <p className="text-gray-600">Bates College medical and safety services</p>
            </div>
          </div>

          {/* 911 Banner */}
          <div className="bg-red-600 rounded-lg p-6 mb-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-lg mb-1">Life-Threatening Emergency</p>
                <p className="text-red-100 text-sm">Always call 911 first for serious emergencies</p>
              </div>
              <a href="tel:911">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 shadow-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 911
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        {isLoading || loadingUser ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
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
        ) : allContacts.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No emergency contacts available yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {allContacts.map((contact) => {
              const Icon = getCategoryIcon(contact.category);
              return (
                <Card key={contact.id} className="shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(contact.category)} shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{contact.service_name}</CardTitle>
                          <Badge className={`${getCategoryBadge(contact.category)} border`}>
                            {contact.category.replace(/_/g, ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contact.description && (
                      <p className="text-gray-700">{contact.description}</p>
                    )}

                    <div className="flex flex-wrap gap-4">
                      <a href={`tel:${contact.phone_number}`} className="flex-1 min-w-[200px]">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md">
                          <Phone className="w-4 h-4 mr-2" />
                          {contact.phone_number}
                        </Button>
                      </a>

                      {contact.availability && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 px-4 py-2 bg-gray-50 rounded-lg">
                          <Clock className="w-4 h-4" />
                          {contact.availability}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Additional Info */}
        <Card className="mt-8 shadow-lg border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Save these numbers in your phone for quick access</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">When calling, clearly state your location and the nature of the emergency</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Stay on the line until help arrives or until told to hang up</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Non-emergency questions can be directed to the Campus Health Center</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}