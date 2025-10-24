// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Create a response
        const response = NextResponse.json({ success: true });

        // Delete the cookie
        response.cookies.set({
            name: "session",
            value: "",
            maxAge: 0,       // this expires the cookie
            path: "/",       // important: match the path of the cookie
        });

        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
    }
}
