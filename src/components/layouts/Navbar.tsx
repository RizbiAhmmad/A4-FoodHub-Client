"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

// Navbar er jonno User type
interface UserType {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://brand.foodhub.com/images/png/foodhub_vertical_new.png",
    alt: "logo",
    title: "",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  const user = data?.user ?? null;
  const loading = isPending;

  // Logout handler
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login"); // redirect, reload na kore
  };

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3", className)}>
      <div className="container max-w-7xl mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center lg:flex">
          <div className="flex items-center w-1/4">
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={120}
                height={32}
                className="max-h-8 w-auto dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
          </div>

          <div className="flex items-center justify-center flex-1 w-2/4">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex w-1/4 justify-end gap-2 items-center">
            <ModeToggle></ModeToggle>
            {!loading &&
              (user ? (
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-md">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                </>
              ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                width={120}
                height={32}
                className="max-h-8 w-auto dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        width={120}
                        height={32}
                        className="max-h-8 w-auto dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    <ModeToggle></ModeToggle>
                    {!loading &&
                      (user ? (
                        <Button onClick={handleSignOut} variant="outline">
                          Sign Out
                        </Button>
                      ) : (
                        <>
                          <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-md">
                            <Link href={auth.login.url}>
                              {auth.login.title}
                            </Link>
                          </Button>
                        </>
                      ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => (
  <NavigationMenuItem key={item.title}>
    <NavigationMenuLink
      asChild
      className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
    >
      <Link href={item.url}>{item.title}</Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const renderMobileMenuItem = (item: MenuItem) => (
  <Link key={item.title} href={item.url} className="text-md font-semibold">
    {item.title}
  </Link>
);

export { Navbar };
