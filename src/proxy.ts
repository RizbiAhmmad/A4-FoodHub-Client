import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  // Not logged in
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  const isAdmin = role === Roles.admin;
  const isProvider = role === Roles.provider;
  const isCustomer = role === Roles.customer;

  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (isProvider && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/provider-dashboard", request.url));
  }
  if (isCustomer && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard") && !isProvider) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isCustomer && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
