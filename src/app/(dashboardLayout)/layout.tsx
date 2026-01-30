import { AppSidebar } from "@/components/layouts/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const userInfo = data?.user;

  if (!userInfo) return null;

  let content;

  if (userInfo.role === Roles.admin) {
    content = admin;
  } else if (userInfo.role === Roles.provider) {
    content = provider;
  } else if (userInfo.role === Roles.customer) {
    content = customer;
  } else {
    content = <div>Unauthorized</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {content}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
