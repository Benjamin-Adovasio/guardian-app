import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit2, Save, X, Phone, User, Heart, AlertCircle, Pill, Droplet, Wallet, Download } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

export default function GuardianCard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: "",
    blood_type: "",
    allergies: "",
    medications: "",
    medical_conditions: "",
    emergency_contacts: []
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setFormData({
        phone_number: currentUser.phone_number || "",
        blood_type: currentUser.blood_type || "",
        allergies: currentUser.allergies || "",
        medications: currentUser.medications || "",
        medical_conditions: currentUser.medical_conditions || "",
        emergency_contacts: currentUser.emergency_contacts || []
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await base44.auth.updateMe(formData);
      await loadUserData();
      setIsEditing(false);
      toast.success("Guardian Card updated successfully");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      phone_number: user.phone_number || "",
      blood_type: user.blood_type || "",
      allergies: user.allergies || "",
      medications: user.medications || "",
      medical_conditions: user.medical_conditions || "",
      emergency_contacts: user.emergency_contacts || []
    });
    setIsEditing(false);
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergency_contacts: [...formData.emergency_contacts, { name: "", phone: "", relationship: "" }]
    });
  };

  const updateEmergencyContact = (index, field, value) => {
    const updated = [...formData.emergency_contacts];
    updated[index][field] = value;
    setFormData({ ...formData, emergency_contacts: updated });
  };

  const removeEmergencyContact = (index) => {
    const updated = formData.emergency_contacts.filter((_, i) => i !== index);
    setFormData({ ...formData, emergency_contacts: updated });
  };

  const handleAddToWallet = async () => {
    setIsGenerating(true);
    try {
      const cardElement = document.getElementById('guardian-card-capture');
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Guardian-Card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success("Card downloaded! Save to Photos and add to Apple Wallet from the Photos app.");
      });
    } catch (error) {
      console.error("Error generating card:", error);
      toast.error("Failed to generate card image");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Guardian Card</h1>
              <p className="text-gray-600">Bates College Emergency Medical Information</p>
            </div>
          </div>
          
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Add to Apple Wallet Button */}
        {!isEditing && (
          <Button 
            onClick={handleAddToWallet} 
            disabled={isGenerating}
            className="w-full mb-6 bg-black hover:bg-gray-800 text-white h-12 text-base font-semibold"
          >
            {isGenerating ? (
              <>
                <Download className="w-5 h-5 mr-2 animate-pulse" />
                Generating Card...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5 mr-2" />
                Add to Apple Wallet
              </>
            )}
          </Button>
        )}

        {/* Card Capture Container */}
        <div id="guardian-card-capture" className="bg-white rounded-lg p-6 mb-6">
          {/* Wallet Card Design */}
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl p-6 text-white shadow-2xl mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Guardian Card</h2>
                  <p className="text-xs text-red-100">Bates College EMS</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Medical ID
              </Badge>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center pb-2 border-b border-white/20">
                <span className="text-red-100 text-sm">Name</span>
                <span className="font-semibold">{user?.full_name || "Not Set"}</span>
              </div>
              {formData.phone_number && (
                <div className="flex justify-between items-center pb-2 border-b border-white/20">
                  <span className="text-red-100 text-sm">Phone</span>
                  <span className="font-semibold">{formData.phone_number}</span>
                </div>
              )}
              {formData.blood_type && (
                <div className="flex justify-between items-center pb-2 border-b border-white/20">
                  <span className="text-red-100 text-sm">Blood Type</span>
                  <span className="font-semibold">{formData.blood_type}</span>
                </div>
              )}
              {formData.allergies && (
                <div className="pb-2 border-b border-white/20">
                  <span className="text-red-100 text-sm block mb-1">Allergies</span>
                  <span className="font-semibold text-sm">{formData.allergies}</span>
                </div>
              )}
              {formData.emergency_contacts.length > 0 && (
                <div>
                  <span className="text-red-100 text-sm block mb-2">Emergency Contact</span>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <p className="font-semibold text-sm">{formData.emergency_contacts[0].name}</p>
                    <p className="text-red-100 text-xs">{formData.emergency_contacts[0].phone}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-red-100">
              <span>For Emergency Use Only</span>
              <span>Call 911</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-4">
            <p className="font-medium text-gray-700 mb-1">How to add to Apple Wallet:</p>
            <ol className="text-left space-y-1 max-w-md mx-auto">
              <li>1. Download the card image above</li>
              <li>2. Open the image in your Photos app</li>
              <li>3. Screenshot or save the card</li>
              <li>4. Open Wallet app → tap "+" → Add to Photos</li>
            </ol>
          </div>
        </div>

        {/* EMS Notice */}
        <div className="bg-red-600 rounded-lg p-4 mb-6 shadow-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-semibold mb-1">For Emergency Personnel</p>
              <p className="text-red-100 text-sm">
                This card contains critical medical information. Review carefully before treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.full_name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.email || "Not provided"}</p>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone_number" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.full_name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{user?.email || "Not provided"}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.phone_number || <span className="text-gray-400">Not provided</span>}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Information Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
            <CardTitle className="flex items-center gap-2 text-red-900">
              <Heart className="w-5 h-5" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="blood_type" className="flex items-center gap-2 mb-2">
                    <Droplet className="w-4 h-4" />
                    Blood Type
                  </Label>
                  <Input
                    id="blood_type"
                    value={formData.blood_type}
                    onChange={(e) => setFormData({ ...formData, blood_type: e.target.value })}
                    placeholder="e.g., O+, A-, B+"
                  />
                </div>
                <div>
                  <Label htmlFor="allergies" className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Allergies
                  </Label>
                  <Input
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="e.g., Penicillin, Peanuts, Shellfish"
                  />
                </div>
                <div>
                  <Label htmlFor="medications" className="flex items-center gap-2 mb-2">
                    <Pill className="w-4 h-4" />
                    Current Medications
                  </Label>
                  <Input
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                    placeholder="e.g., Aspirin 81mg daily, Lisinopril 10mg"
                  />
                </div>
                <div>
                  <Label htmlFor="medical_conditions" className="mb-2">Medical Conditions</Label>
                  <Input
                    id="medical_conditions"
                    value={formData.medical_conditions}
                    onChange={(e) => setFormData({ ...formData, medical_conditions: e.target.value })}
                    placeholder="e.g., Asthma, Diabetes, Heart condition"
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Droplet className="w-4 h-4" />
                    Blood Type
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.blood_type || <span className="text-gray-400">Not provided</span>}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <AlertCircle className="w-4 h-4" />
                    Allergies
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.allergies || <span className="text-gray-400">None listed</span>}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Pill className="w-4 h-4" />
                    Current Medications
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.medications || <span className="text-gray-400">None listed</span>}
                  </p>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Medical Conditions</div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.medical_conditions || <span className="text-gray-400">None listed</span>}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                {formData.emergency_contacts.map((contact, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">Contact {index + 1}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeEmergencyContact(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={contact.name}
                        onChange={(e) => updateEmergencyContact(index, "name", e.target.value)}
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={contact.phone}
                        onChange={(e) => updateEmergencyContact(index, "phone", e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Input
                        value={contact.relationship}
                        onChange={(e) => updateEmergencyContact(index, "relationship", e.target.value)}
                        placeholder="e.g., Parent, Spouse, Friend"
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={addEmergencyContact} variant="outline" className="w-full">
                  Add Emergency Contact
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.emergency_contacts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No emergency contacts added</p>
                ) : (
                  formData.emergency_contacts.map((contact, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {contact.relationship}
                        </Badge>
                      </div>
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </a>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}