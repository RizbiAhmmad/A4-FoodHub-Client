import { Route } from "@/types";
import { 
  Home, 
  Store, 
  PlusCircle, 
  Utensils, 
  ClipboardList, 
  UserCircle,
  LayoutDashboard
} from "lucide-react";

export const providerRoutes: Route[] = [
  {
    title: "Provider Management",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Restaurant Profile",
        url: "/provider-dashboard/create-providerprofile",
        icon: Store,
      },
      {
        title: "Create Category",
        url: "/provider-dashboard/create-category",
        icon: PlusCircle,
      },
      {
        title: "Create Meal",
        url: "/provider-dashboard/create-meal",
        icon: Utensils,
      },
      {
        title: "My Meals",
        url: "/provider-dashboard/my-meals",
        icon: LayoutDashboard,
      },
      {
        title: "View Orders",
        url: "/provider-dashboard/orders",
        icon: ClipboardList,
      },
      {
        title: "Profile",
        url: "/provider-dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];