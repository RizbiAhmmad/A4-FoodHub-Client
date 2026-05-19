import { Route } from "@/types";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Layers, 
  UserCircle,
  Home
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "All Orders",
        url: "/admin-dashboard/all-orders",
        icon: ShoppingBag,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
        icon: Layers,
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];
