import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Home, MapPin, BookOpen, User, Phone, Bot, Settings } from "lucide-react";
import ProfileBubble from "@/components/ProfileBubble";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Emergency",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "AED Locations",
    url: createPageUrl("AEDLocations"),
    icon: MapPin,
  },
  {
    title: "Guardian AI",
    url: createPageUrl("GuardianAI"),
    icon: Bot,
  },
  {
    title: "First Aid",
    url: createPageUrl("FirstAid"),
    icon: BookOpen,
  },
  {
    title: "Contacts",
    url: createPageUrl("EmergencyContacts"),
    icon: Phone,
  },
  {
    title: "Guardian Card",
    url: createPageUrl("GuardianCard"),
    icon: User,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await base44.auth.me();
        const firstName = user.full_name ? user.full_name.split(' ')[0] : "";
        setUserName(firstName);
      } catch (error) {
        setUserName("");
      }
    };
    loadUser();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-red-50 via-white to-blue-50">
        <Sidebar className="border-r border-red-100">
          <SidebarHeader className="border-b border-red-100 p-4 bg-gradient-to-r from-red-600 to-red-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691a5cd4786269efb44c871d/7a8d8e90c_ChatGPTImageNov162025at06_30_16PM.png" 
                  alt="Guardian Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">Guardian</h2>
                <p className="text-xs text-red-100">Emergency Services</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-red-50 hover:text-red-700 transition-colors duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url ? 'bg-red-50 text-red-700 font-semibold' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-4 mx-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-red-800 font-medium mb-2">⚠️ Emergency Notice</p>
              <p className="text-xs text-red-600">
                For life-threatening emergencies, always call 911 first.
              </p>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
                <h1 className="text-xl font-bold text-red-600 md:hidden">Guardian</h1>
              </div>
              <div className="flex items-center gap-4">
                {userName && (
                  <p className="text-gray-700 hidden sm:block">
                    Hey <span className="font-semibold">{userName}</span>, nice to see you!
                  </p>
                )}
                <ProfileBubble />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}