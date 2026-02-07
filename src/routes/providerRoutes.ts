import { Route } from "@/types";

export const providerRoutes: Route[]= [
    {
      title: "Provider Management",
      
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Create Restaurant Profile",
          url: "/provider-dashboard/create-providerprofile",
        },
        {
          title: "Create Category",
          url: "/provider-dashboard/create-category",
        },
        {
          title: "Create Meal",
          url: "/provider-dashboard/create-meal",
        },
        {
          title: "My Meals",
          url: "/provider-dashboard/my-meals",
        },
        {
          title: "View Orders",
          url: "/provider-dashboard/orders",
        },
        {
          title: "Profile",
          url: "/provider-dashboard/profile",
        },
       
      ],
    },
  ]