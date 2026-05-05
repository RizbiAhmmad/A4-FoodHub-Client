"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export function UpdateProfileModal({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    if (!name.trim()) return toast.error("Name is required");

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-full">
          <Edit size={14} /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white" 
            onClick={handleUpdate} 
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
