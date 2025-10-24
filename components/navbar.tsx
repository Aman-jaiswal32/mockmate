"use client";

import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/logoutbutton";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={38} height={32} />
                <h2 className="text-primary-100 font-bold">MockMate</h2>
            </Link>

            {/* Logout Button */}
            <LogoutButton />
        </nav>
    );
}
