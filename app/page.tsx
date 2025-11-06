"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <main className="relative min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
            {/* ===== GLOBAL BACKGROUND GLOW ===== */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#a3a9ff33] to-transparent blur-[160px] opacity-50" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#a3a9ff44] to-[#ff9bd644] blur-[180px] opacity-60 animate-pulse-slow" />
                <div className="absolute bottom-[-300px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-t from-[#ff9bd633] to-transparent blur-[150px] opacity-40" />
            </div>

            {/* ===== NAVBAR ===== */}
            <nav className="flex justify-between items-center px-40 py-6 border-b border-[#1a1a1a] relative z-20">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="MockMate Logo" width={38} height={38} />
                    <h1 className="text-xl font-semibold text-[#d6c8ff]">MockMate</h1>
                </div>

                {/* Sign In / Get Started */}
                <div className="flex gap-4">
                    <Link href="/sign-in" className="rounded-full">
                        <Button
                            asChild
                            className="bg-transparent border border-[#2a2a2a] text-gray-300 hover:bg-[#1a1a1a] hover:text-[#d6c8ff] transition-all rounded-full px-6"
                        >
                            <span>Sign In</span>
                        </Button>
                    </Link>

                    <Link href="/sign-up" className="rounded-full">
                        <Button
                            asChild
                            className="bg-[#d6c8ff] text-black hover:bg-[#c4b5fc] font-semibold rounded-full px-6 transition-all"
                        >
                            <span>Get Started</span>
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section className="relative flex flex-col items-center justify-center text-center flex-grow px-10 pt-16 md:pt-20 pb-4 overflow-hidden z-10">
                {/* Background Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 -translate-y-10">
                    <div className="relative w-[750px] h-[750px] md:w-[900px] md:h-[900px]">
                        <Image
                            src="/ai-avatar.png"
                            alt="AI Background"
                            fill
                            className="object-contain opacity-70 mix-blend-screen scale-110"
                        />
                    </div>
                </div>

                {/* Hero Text */}
                <h1 className="text-[2.5rem] md:text-[3.5rem] px-100 leading-[1.15] font-bold mb-3 bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text relative z-10">
                    Master Your Skills with AI-Powered Interviews
                </h1>

                <p className="text-gray-400 max-w-2xl mb-4 text-lg md:text-xl leading-relaxed relative z-10">
                    Transform your career with personalized mock interviews and real-time AI feedback.
                    Practice confidently, learn smarter, and ace every interview with MockMate.
                </p>

                {/* CTA */}
                <div className="flex gap-5 mt-8 flex-wrap justify-center mb-10 relative z-10">
                    <Link href="/sign-up" className="rounded-full">
                        <Button
                            asChild
                            className="bg-[#d6c8ff] text-black font-semibold rounded-full px-8 py-3 text-lg hover:bg-[#c4b5fc] transition-all"
                        >
                            <span>Start Practicing Free →</span>
                        </Button>
                    </Link>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-40 text-center border-t border-[#1a1a1a] bg-transparent relative z-10 backdrop-blur-[2px]">
                <div>
                    <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        100+
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">Interview Templates</p>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        50+
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">Job Categories</p>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        100%
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">AI-Driven Insights</p>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        24/7
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">Practice Anytime</p>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-[#1a1a1a] py-2 text-center text-gray-500 text-sm bg-transparent relative z-10 backdrop-blur-[2px]">
                © {new Date().getFullYear()} MockMate — All rights reserved.
            </footer>
        </main>
    );
}
