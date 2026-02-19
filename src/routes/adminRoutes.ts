import { Route } from "@/types";

export const adminRoutes: Route[] = [
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
        title: "All orders",
        url: "/admin-dashboard/all-orders",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
      },

      // {
      //   title: "Categories",
      //   url: "/categories",
      // },
    ],
  },
];
