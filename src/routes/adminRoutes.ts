import { Route } from "@/types";

export const adminRoutes: Route[]= [
    {
      title: "Admin Management",
      
      items: [
        
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Users",
          url: "/admin-dashboard/users",
        },
        {
          title: "Profile",
          url: "/admin-dashboard/profile",
        },
        
        {
          title: "Categories",
          url: "/categories",
        },
      ],
    },
  ]