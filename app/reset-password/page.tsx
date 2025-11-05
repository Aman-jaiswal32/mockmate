"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/Firebase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const oobCode = searchParams.get("oobCode");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to reset password. The link may have expired.");
        } finally {
            setLoading(false);
        }
    };

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
                <div className="w-full space-y-5 form">
                    {/* New Password */}
                    <div className="relative flex flex-col gap-1">
                        <label>
                            New Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1C1C1C] text-white placeholder:text-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6C8FF] transition-all pr-10 border border-[#2C2C2C]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[42px] text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#1C1C1C] text-white placeholder:text-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6C8FF] transition-all pr-10 border border-[#2C2C2C]"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-[42px] text-gray-400 hover:text-white"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Reset Password Button */}
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
