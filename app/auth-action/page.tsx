"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/Firebase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function AuthActionHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);

    // ✅ Handle Email Verification
    useEffect(() => {
        if (mode === "verifyEmail" && oobCode) {
            setLoading(true);
            applyActionCode(auth, oobCode)
                .then(() => {
                    toast.success("Email verified successfully!");
                    setVerified(true);
                    setTimeout(() => router.push("/sign-in"), 2000);
                })
                .catch(() => {
                    toast.error("Invalid or expired verification link.");
                    router.push("/sign-in");
                })
                .finally(() => setLoading(false));
        }
    }, [mode, oobCode, router]);

    // ✅ Handle Password Reset
    const handleResetPassword = async () => {
        if (!oobCode) {
            toast.error("Invalid or expired password reset link.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            await confirmPasswordReset(auth, oobCode, password);
            toast.success("Password reset successfully!");
            router.push("/sign-in");
        } catch {
            toast.error("Failed to reset password. The link may have expired.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Loading or Verification Success Screen
    if (mode === "verifyEmail") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <div className="card-border lg:min-w-[500px] card py-8 px-10 text-center">
                    <div className="flex flex-row gap-2 justify-center mb-4">
                        <Image src="/logo.svg" alt="logo" height={32} width={38} />
                        <h2 className="text-primary-100 text-xl font-semibold">MockMate</h2>
                    </div>
                    {loading ? (
                        <h3 className="text-lg font-semibold text-center mb-6">
                            Verifying your email...
                        </h3>
                    ) : verified ? (
                        <h3 className="text-lg font-semibold text-center mb-6 text-green-400">
                            Your email has been verified! Redirecting to Sign In...
                        </h3>
                    ) : (
                        <h3 className="text-lg font-semibold text-center mb-6 text-red-400">
                            Invalid or expired link.
                        </h3>
                    )}
                </div>
            </div>
        );
    }

    // ✅ Password Reset UI
    if (mode === "resetPassword") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <div className="card-border lg:min-w-[500px] card py-8 px-10">
                    {/* Logo */}
                    <div className="flex flex-row gap-2 justify-center mb-4">
                        <Image src="/logo.svg" alt="logo" height={32} width={38} />
                        <h2 className="text-primary-100 text-xl font-semibold">MockMate</h2>
                    </div>

                    <h3 className="text-lg font-semibold text-center mb-6">
                        Reset Your Password
                    </h3>

                    {/* Password Fields */}
                    <div className="flex flex-col gap-5">
                        <div className="relative flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-300">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1C1C1C] text-white placeholder:text-gray-400 rounded-full px-4 py-3 border border-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#D6C8FF] transition-all"
                            />
                        </div>

                        <div className="relative flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-[#1C1C1C] text-white placeholder:text-gray-400 rounded-full px-4 py-3 border border-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#D6C8FF] transition-all"
                            />
                        </div>

                        <Button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="w-full mt-4 bg-[#D6C8FF] text-black font-semibold rounded-full py-3 hover:bg-[#c4b5fc] transition-all"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // ✅ Default (Invalid or No Mode)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="card-border lg:min-w-[500px] card py-8 px-10 text-center">
                <div className="flex flex-row gap-2 justify-center mb-4">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100 text-xl font-semibold">MockMate</h2>
                </div>
                <h3 className="text-lg font-semibold text-center mb-6">
                    Invalid or expired link
                </h3>
                <Button
                    onClick={() => router.push("/sign-in")}
                    className="w-full mt-4 bg-[#D6C8FF] text-black font-semibold rounded-full py-3 hover:bg-[#c4b5fc] transition-all"
                >
                    Go to Sign In
                </Button>
            </div>
        </div>
    );
}

// ✅ Wrap in Suspense for Next.js SearchParams
export default function AuthActionPage() {
    return (
        <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
            <AuthActionHandler />
        </Suspense>
    );
}
