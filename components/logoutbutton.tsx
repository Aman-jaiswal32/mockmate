"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", { method: "POST" });
            const data = await res.json();

            if (!res.ok || !data.success) throw new Error(data.error || "Logout failed");

            toast.success("Logged out successfully!");
            router.push("/sign-in");
        } catch (err) {
            toast.error((err as Error).message);
        }
    };

    return (
        <Button onClick={handleLogout} variant="outline" className="text-sm font-semibold">
            Log Out
        </Button>
    );
}
