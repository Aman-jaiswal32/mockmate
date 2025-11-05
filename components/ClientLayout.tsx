"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";

export default function ClientLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 900); // Adjust duration if needed
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {loading && <Loader />}
            {!loading && children}
        </>
    );
}
