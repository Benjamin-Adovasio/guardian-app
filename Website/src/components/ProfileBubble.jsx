import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { User, LogOut, LogIn, Edit2, Upload, ZoomIn } from "lucide-react";
import { toast } from "sonner";

export default function ProfileBubble() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    profile_picture: ""
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await base44.auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        setFormData({
          full_name: currentUser.full_name || "",
          email: currentUser.email || "",
          phone_number: currentUser.phone_number || "",
          profile_picture: currentUser.profile_picture || ""
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  };

  const handleLogin = () => {
    base44.auth.redirectToLogin();
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setTempImage(event.target.result);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setIsCropOpen(true);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCropSave = async () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 300;

    canvas.width = size;
    canvas.height = size;

    const scale = zoom;
    const img = imageRef.current;
    
    ctx.drawImage(
      img,
      position.x,
      position.y,
      img.width * scale,
      img.height * scale
    );

    canvas.toBlob(async (blob) => {
      try {
        setIsLoading(true);
        const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setFormData({ ...formData, profile_picture: file_url });
        setIsCropOpen(false);
        toast.success("Image uploaded");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsLoading(false);
      }
    }, 'image/jpeg', 0.9);
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      await base44.auth.updateMe({
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        profile_picture: formData.profile_picture
      });
      await checkAuth();
      setIsEditOpen(false);
      toast.success("Profile updated");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={handleLogin} variant="outline" size="sm">
        <LogIn className="w-4 h-4 mr-2" />
        Log In
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt={user.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <User className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-2">
            <p className="font-semibold text-gray-900">{user?.full_name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEditProfile}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isCropOpen} onOpenChange={setIsCropOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crop Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div 
              className="relative w-[300px] h-[300px] mx-auto bg-gray-100 rounded-full overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {tempImage && (
                <img
                  src={tempImage}
                  alt="Crop preview"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transformOrigin: 'top left',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  className="absolute"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                Zoom
              </Label>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={0.5}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCropOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCropSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
                {formData.profile_picture ? (
                  <img
                    src={formData.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-picture-upload"
                />
                <Label htmlFor="profile-picture-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </span>
                  </Button>
                </Label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}