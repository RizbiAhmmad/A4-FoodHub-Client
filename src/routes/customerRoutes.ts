import { Route } from "@/types";

export const customerRoutes: Route[]= [
    {
      title: "Customer Management",
      
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "My Orders",
          url: "/customer-dashboard/myOrders",
        },
        {
          title: "My Reviews",
          url: "/customer-dashboard/myReviews",
        },
        {
          title: "Profile",
          url: "/customer-dashboard/profile",
        },
       
      ],
    },
  ]