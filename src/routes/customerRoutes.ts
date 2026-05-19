import { Route } from "@/types";
import { 
  Home, 
  ShoppingBag, 
  Star, 
  UserCircle 
} from "lucide-react";

export const customerRoutes: Route[] = [
  {
    title: "Customer Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "My Orders",
        url: "/customer-dashboard/myOrders",
        icon: ShoppingBag,
      },
      {
        title: "My Reviews",
        url: "/customer-dashboard/myReviews",
        icon: Star,
      },
      {
        title: "Profile",
        url: "/customer-dashboard/profile",
        icon: UserCircle,
      },
    ],
  },
];