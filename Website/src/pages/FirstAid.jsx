import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, AlertTriangle, Heart, Droplet, Flame, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FirstAid() {
  const [searchQuery, setSearchQuery] = useState("");

  const firstAidGuides = [
    {
      id: "cpr",
      title: "CPR (Cardiopulmonary Resuscitation)",
      category: "Critical",
      icon: Heart,
      color: "red",
      steps: [
        "Check for responsiveness - tap shoulders and shout 'Are you okay?'",
        "Call 911 immediately or have someone else call",
        "Place person on firm, flat surface",
        "Position hands: Place heel of one hand on center of chest, other hand on top",
        "Push hard and fast: Compress chest at least 2 inches deep, 100-120 compressions per minute",
        "Continue until help arrives or person shows signs of life"
      ],
      warning: "Only perform CPR if you are trained. Incorrect technique can cause injury."
    },
    {
      id: "choking",
      title: "Choking (Heimlich Maneuver)",
      category: "Critical",
      icon: AlertTriangle,
      color: "red",
      steps: [
        "Ask 'Are you choking?' - if they can't speak or cough, they need help",
        "Call 911",
        "Stand behind the person and wrap arms around their waist",
        "Make a fist with one hand, place it just above the navel",
        "Grasp fist with other hand and give quick, upward thrusts",
        "Repeat until object is dislodged or person becomes unconscious",
        "If unconscious, begin CPR"
      ],
      warning: "For pregnant women or obese individuals, perform chest thrusts instead of abdominal thrusts."
    },
    {
      id: "bleeding",
      title: "Severe Bleeding",
      category: "Critical",
      icon: Droplet,
      color: "red",
      steps: [
        "Call 911 for severe bleeding",
        "Wear gloves if available to protect against bloodborne pathogens",
        "Apply direct pressure to wound with clean cloth or bandage",
        "Maintain pressure continuously for at least 5 minutes",
        "If blood soaks through, add more material on top (don't remove original)",
        "Elevate injured area above heart if possible",
        "Apply pressure to pressure points if direct pressure isn't enough"
      ],
      warning: "Do not remove objects embedded in wounds. Stabilize them and seek immediate medical help."
    },
    {
      id: "burns",
      title: "Burns",
      category: "Moderate",
      icon: Flame,
      color: "orange",
      steps: [
        "Remove person from heat source",
        "For minor burns: Cool burn with cool (not ice-cold) running water for 10-20 minutes",
        "Remove jewelry and tight clothing before swelling begins",
        "Cover burn with sterile, non-stick bandage or clean cloth",
        "Take over-the-counter pain reliever if needed",
        "For severe burns (large area, charred skin, or deep): Call 911 immediately",
        "Do not apply ice, butter, or ointments to severe burns"
      ],
      warning: "Seek immediate medical care for burns larger than 3 inches, on face/joints, or third-degree burns."
    },
    {
      id: "shock",
      title: "Shock",
      category: "Critical",
      icon: Zap,
      color: "red",
      steps: [
        "Call 911 immediately",
        "Lay person down on back",
        "Elevate legs about 12 inches (unless injury prevents this)",
        "Keep person warm with blanket or coat",
        "Do not give anything to eat or drink",
        "Monitor breathing and pulse",
        "Turn person on side if vomiting"
      ],
      warning: "Shock can be life-threatening. Always seek immediate medical attention."
    },
    {
      id: "seizure",
      title: "Seizures",
      category: "Moderate",
      icon: AlertTriangle,
      color: "orange",
      steps: [
        "Stay calm and stay with the person",
        "Time the seizure - call 911 if it lasts more than 5 minutes",
        "Clear area of hard or sharp objects",
        "Place something soft under their head",
        "Turn person on their side to keep airway clear",
        "Do NOT restrain or put anything in their mouth",
        "After seizure, stay with them until fully conscious"
      ],
      warning: "Call 911 if: seizure lasts more than 5 minutes, person is injured, pregnant, or has diabetes."
    },
    {
      id: "allergic",
      title: "Severe Allergic Reaction (Anaphylaxis)",
      category: "Critical",
      icon: AlertTriangle,
      color: "red",
      steps: [
        "Call 911 immediately",
        "Use person's epinephrine auto-injector (EpiPen) if available",
        "Inject into outer thigh, hold for 10 seconds",
        "Have person lie down with legs elevated (unless breathing difficulty)",
        "Monitor breathing and pulse",
        "Give second dose after 5-15 minutes if no improvement and available",
        "Stay with person until emergency help arrives"
      ],
      warning: "Anaphylaxis is life-threatening. Even if symptoms improve after epinephrine, emergency care is needed."
    },
    {
      id: "fracture",
      title: "Fractures (Broken Bones)",
      category: "Moderate",
      icon: AlertTriangle,
      color: "orange",
      steps: [
        "Do not move person unless absolutely necessary",
        "Immobilize injured area - don't try to realign the bone",
        "Apply ice packs to reduce swelling and pain",
        "Treat for shock if needed",
        "For open fractures: cover wound with sterile bandage, don't push bone back in",
        "Call 911 or take to emergency room",
        "Monitor for signs of shock"
      ],
      warning: "Never try to straighten a broken bone. Immobilize in the position found."
    }
  ];

  const filteredGuides = firstAidGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (color) => {
    const colors = {
      red: "bg-red-100 text-red-800 border-red-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[color] || colors.orange;
  };

  const getIconBg = (color) => {
    const colors = {
      red: "bg-red-500",
      orange: "bg-orange-500"
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">First Aid Guide</h1>
              <p className="text-gray-600">Bates College emergency reference</p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 font-medium mb-1">
                  Important Disclaimer
                </p>
                <p className="text-sm text-yellow-800">
                  This guide is for informational purposes only. Always call 911 for serious emergencies. Consider taking a certified first aid and CPR course for proper training.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search first aid procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* First Aid Procedures */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Emergency Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredGuides.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No procedures found matching your search</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredGuides.map((guide) => {
                  const Icon = guide.icon;
                  return (
                    <AccordionItem key={guide.id} value={guide.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getIconBg(guide.color)}`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{guide.title}</p>
                            <Badge className={`${getCategoryColor(guide.color)} mt-1 border`}>
                              {guide.category}
                            </Badge>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4 pl-12 space-y-4">
                          {guide.warning && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <p className="text-sm text-red-800">
                                <strong>⚠️ Warning: </strong>{guide.warning}
                              </p>
                            </div>
                          )}
                          
                          <div>
                            <p className="font-medium text-gray-900 mb-2">Steps to follow:</p>
                            <ol className="space-y-2">
                              {guide.steps.map((step, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="font-bold text-blue-600 flex-shrink-0">
                                    {index + 1}.
                                  </span>
                                  <span className="text-gray-700">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="mt-6 shadow-lg border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Training Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">American Red Cross: Offers first aid and CPR certification courses</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Campus Health Center: Check for free or discounted training sessions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">Online courses available through various certified organizations</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}