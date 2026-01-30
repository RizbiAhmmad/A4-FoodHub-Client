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
          url: "/users",
        },
        {
          title: "Orders",
          url: "/orders",
        },
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Categories",
          url: "/categories",
        },
      ],
    },
  ]