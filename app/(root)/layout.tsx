/* import {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/action/auth.action";
import {redirect} from "next/navigation";

const Rootlayout = async ({children}: {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();

    if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className="root-layout">
      <nav>
        <Link  href="/" className="flex itmes-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32}/>
          <h2 className="text-primary-100">MockMate</h2>
        </Link>
      </nav>
        {children}
    </div>
  )
}

export default Rootlayout; */

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logoutbutton";
import { cookies } from "next/headers";

async function isAuthenticated() {
    const cookieStore = await cookies(); // <-- await is required
    const sessionCookie = cookieStore.get("session");
    return sessionCookie?.value ? true : false;
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const authenticated = await isAuthenticated();

    if (!authenticated) redirect("/sign-in");

    return (
        <div className="root-layout">
            <nav className="flex justify-between items-center p-4 border-b">
                <Link href="/home" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={38} height={32} />
                    <h2 className="text-primary-100">MockMate</h2>
                </Link>
                <LogoutButton />
            </nav>
            <main>{children}</main>
        </div>
    );
};

export default RootLayout;


