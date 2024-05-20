import axios from "axios";

import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = request.cookies.get("USER_TOKEN");
  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/signin", request.url));
  await axios.get('is_auth')

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user_management/:path*", "/"],
};
