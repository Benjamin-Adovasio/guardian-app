import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Shield, AlertCircle, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function MedicalProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    blood_type: "",
    allergies: "",
    medical_conditions: "",
    medications: "",
    emergency_contacts: []
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setFormData({
        blood_type: currentUser.blood_type || "",
        allergies: currentUser.allergies || "",
        medical_conditions: currentUser.medical_conditions || "",
        medications: currentUser.medications || "",
        emergency_contacts: currentUser.emergency_contacts || []
      });
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddContact = () => {
    setFormData(prev => ({
      ...prev,
      emergency_contacts: [...prev.emergency_contacts, { name: "", phone: "", relationship: "" }]
    }));
  };

  const handleRemoveContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.filter((_, i) => i !== index)
    }));
  };

  const handleContactChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.auth.updateMe(formData);
      toast.success("Medical profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Medical Profile</h1>
              <p className="text-gray-600">Bates College emergency information</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Why is this important?
                </p>
                <p className="text-sm text-blue-800">
                  In an emergency, this information can help medical responders provide you with appropriate care. Keep it accurate and updated.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>Information that emergency responders should know</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="blood_type">Blood Type</Label>
                  <Select
                    value={formData.blood_type}
                    onValueChange={(value) => handleChange('blood_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any known allergies (medications, food, environmental, etc.)"
                  value={formData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical_conditions">Medical Conditions</Label>
                <Textarea
                  id="medical_conditions"
                  placeholder="List any chronic conditions or important medical history"
                  value={formData.medical_conditions}
                  onChange={(e) => handleChange('medical_conditions', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="List any medications you are currently taking"
                  value={formData.medications}
                  onChange={(e) => handleChange('medications', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Emergency Contacts</CardTitle>
                  <CardDescription>Family members or friends to contact in case of emergency</CardDescription>
                </div>
                <Button
                  type="button"
                  onClick={handleAddContact}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.emergency_contacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No emergency contacts added yet</p>
                  <p className="text-sm mt-1">Click "Add Contact" to add your first emergency contact</p>
                </div>
              ) : (
                formData.emergency_contacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Contact {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => handleRemoveContact(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Contact Name</Label>
                        <Input
                          placeholder="Full name"
                          value={contact.name}
                          onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={contact.phone}
                          onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Input
                        placeholder="e.g., Parent, Spouse, Sibling"
                        value={contact.relationship}
                        onChange={(e) => handleContactChange(index, 'relationship', e.target.value)}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                This information is stored securely and will only be accessed by authorized medical personnel in emergency situations.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Medical Profile
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}