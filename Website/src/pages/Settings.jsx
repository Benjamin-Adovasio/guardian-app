import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Eye, User, LogOut, Trash2, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    notifications_enabled: true,
    location_sharing: true,
    emergency_alerts: true,
    high_contrast: false,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setSettings({
        notifications_enabled: currentUser.notifications_enabled ?? true,
        location_sharing: currentUser.location_sharing ?? true,
        emergency_alerts: currentUser.emergency_alerts ?? true,
        high_contrast: currentUser.high_contrast ?? false,
      });
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const handleSettingChange = async (key, value) => {
    try {
      setSettings({ ...settings, [key]: value });
      await base44.auth.updateMe({ [key]: value });
      toast.success("Settings updated");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your Guardian app preferences</p>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <Card className="shadow-lg mb-6 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account
            </CardTitle>
            <CardDescription>Your Bates College account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-500">Name</Label>
              <p className="text-lg font-semibold text-gray-900">{user?.full_name || "Not set"}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Email</Label>
              <p className="text-lg font-semibold text-gray-900">{user?.email || "Not set"}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Role</Label>
              <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role || "User"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="shadow-lg mb-6 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-500">Receive alerts and updates</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications_enabled}
                onCheckedChange={(checked) => handleSettingChange('notifications_enabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emergency-alerts" className="font-medium">Emergency Alerts</Label>
                <p className="text-sm text-gray-500">Critical campus safety notifications</p>
              </div>
              <Switch
                id="emergency-alerts"
                checked={settings.emergency_alerts}
                onCheckedChange={(checked) => handleSettingChange('emergency_alerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Section */}
        <Card className="shadow-lg mb-6 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Privacy & Location</CardTitle>
            <CardDescription>Control your data and location sharing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location" className="font-medium">Location Sharing</Label>
                <p className="text-sm text-gray-500">Allow access to your location for emergency features</p>
              </div>
              <Switch
                id="location"
                checked={settings.location_sharing}
                onCheckedChange={(checked) => handleSettingChange('location_sharing', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Section */}
        <Card className="shadow-lg mb-6 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Accessibility
            </CardTitle>
            <CardDescription>Customize your viewing experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast" className="font-medium">High Contrast Mode</Label>
                <p className="text-sm text-gray-500">Improve visibility with enhanced contrast</p>
              </div>
              <Switch
                id="high-contrast"
                checked={settings.high_contrast}
                onCheckedChange={(checked) => handleSettingChange('high_contrast', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions Section */}
        <Card className="shadow-lg border-red-200 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-red-900">Account Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              to={createPageUrl("PrivacyPolicy")} 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Shield className="w-4 h-4" />
              Privacy Policy
            </Link>
            <Link 
              to={createPageUrl("TermsOfService")} 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Terms of Service
            </Link>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Guardian v1.0.0</p>
          <p>Bates College Emergency Medical Services</p>
        </div>
      </div>
    </div>
  );
}