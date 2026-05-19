"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LogOut, 
  ChevronRight, 
  UtensilsCrossed 
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { customerRoutes } from "@/routes/customerRoutes";

type SidebarUser = {
  role: string;
  name?: string;
  email?: string;
  image?: string | null;
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: SidebarUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.provider:
      routes = providerRoutes;
      break;
    case Roles.customer:
      routes = customerRoutes;
      break;
    default:
      routes = [];
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Sidebar 
      className="border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-2xl shadow-gray-200/50 dark:shadow-none" 
      {...props}
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
            <UtensilsCrossed className="text-white size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">FoodHub</h1>
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest leading-none mt-0.5">Control Center</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Avatar className="size-10 border-2 border-white dark:border-gray-800 shadow-md">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name || "User"}</p>
            <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-2">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="mb-6">
            <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className={`h-11 px-4 rounded-2xl transition-all duration-200 group ${
                          isActive 
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:text-white" 
                            : "text-gray-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600"
                        }`}
                      >
                        <Link href={item.url} className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            {item.icon && <item.icon className={`size-5 ${isActive ? "text-white" : "group-hover:text-orange-600"}`} />}
                            <span className="font-bold text-sm">{item.title}</span>
                          </div>
                          {isActive && <ChevronRight className="size-4 opacity-70" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-gray-50 dark:border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full h-12 px-5 rounded-2xl bg-gray-50 dark:bg-gray-900 text-gray-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-all duration-200 group font-bold text-sm border border-transparent hover:border-red-100 dark:hover:border-red-500/20"
        >
          <LogOut className="size-5 group-hover:rotate-12 transition-transform" />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
