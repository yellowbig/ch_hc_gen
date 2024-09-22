import { locales } from "@/lib/i18n";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const needI18NRouteRedirect = (path: string): boolean => {
  const excludedPatterns = [
    /^\/api\//,
    /^\/_next\/(static|image)\//,
    /\.(ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)$/
  ];
  return !excludedPatterns.some(pattern => pattern.test(path));
};

const matchedRoute = (path: string): boolean => {
  const routes = [
    "/dashboard(.*)",
    "/forum(.*)",
    "/workbench(.*)",
    "/_next(.*)",
    "/api(.*)",
    "/((?!.*\\.(?:ico|png|svg|jpg|jpeg|xml|txt)$).*)",
  ];
  return routes.some(route => new RegExp(route).test(path));
}

export function middleware(req: NextRequest) {
  console.log("req.url: ", req.url);

  console.log("auth pass!!");

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    console.log("return!");
    return;
  }
  console.log("needI18NRouteRedirect pass!!");

  const { pathname } = req.nextUrl;
  const defaultLocale = "en";

  const locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname.startsWith(`/${defaultLocale}/`)) {
    const newPathname = pathname.replace(`/${defaultLocale}/`, "/");
    return NextResponse.redirect(new URL(newPathname, req.url));
  }

  if (!locale) {
    console.log("does not contain locale, rewrite to /en: ", pathname);
    req.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  if (pathname === "/") {
    req.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  if (locale === defaultLocale && needI18NRouteRedirect(req.nextUrl.pathname)) {
    req.nextUrl.pathname = `/${locale}${req.nextUrl.pathname}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  if (!matchedRoute(req.nextUrl.pathname)) {
    req.nextUrl.pathname = "/404";
    return NextResponse.rewrite(req.nextUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)",
  ],
};

