"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <main className="relative min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[700px] h-[400px] sm:h-[600px] md:h-[700px] bg-gradient-to-b from-[#a3a9ff33] to-transparent blur-[120px] sm:blur-[140px] opacity-50" />
                <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] md:w-[900px] h-[600px] sm:h-[800px] md:h-[900px] bg-gradient-to-r from-[#a3a9ff44] to-[#ff9bd644] blur-[160px] opacity-60 animate-pulse-slow" />
                <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[700px] h-[400px] sm:h-[600px] md:h-[700px] bg-gradient-to-t from-[#ff9bd633] to-transparent blur-[120px] opacity-40" />
            </div>
            
            <nav className="flex justify-between items-center flex-wrap px-6 sm:px-10 md:px-20 lg:px-40 py-5 border-b border-[#1a1a1a] relative z-20">
                {/* Logo */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Image src="/logo.svg" alt="MockMate Logo" width={34} height={34} />
                    <h1 className="text-lg sm:text-xl font-semibold text-[#d6c8ff]">
                        MockMate
                    </h1>
                </div>

                {/* Sign In / Get Started */}
                <div className="flex gap-2 sm:gap-3 items-center mt-3 sm:mt-0 ml-auto">
                    <Link href="/sign-in" className="rounded-full">
                        <Button className="bg-transparent border border-[#2a2a2a] text-gray-300 hover:bg-[#1a1a1a] hover:text-[#d6c8ff] transition-all rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base">
                            Sign In
                        </Button>
                    </Link>

                    <Link href="/sign-up" className="rounded-full">
                        <Button className="bg-[#d6c8ff] text-black hover:bg-[#c4b5fc] font-semibold rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base transition-all">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* ===== HERO SECTION ===== */}
            <section className="relative flex flex-col items-center justify-center text-center flex-grow px-6 sm:px-10 md:px-16 pt-12 md:pt-16 pb-4 overflow-hidden z-10">
                {/* Background Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 -translate-y-6 sm:-translate-y-10">
                    <div className="relative w-[300px] sm:w-[500px] md:w-[750px] lg:w-[900px] h-[300px] sm:h-[500px] md:h-[750px] lg:h-[900px]">
                        <Image
                            src="/ai-avatar.png"
                            alt="AI Background"
                            fill
                            className="object-contain opacity-70 mix-blend-screen scale-110"
                        />
                    </div>
                </div>

                {/* Hero Text */}
                <h1 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.2] font-bold px-10 mb-8 bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text relative z-10">
                    Master Your Skills with AI-Powered Interviews
                </h1>

                <p className="text-gray-400 max-w-xl sm:max-w-2xl mb-3 text-base sm:text-lg md:text-xl leading-relaxed relative z-10">
                    Transform your career with personalized mock interviews and real-time
                    AI feedback. Practice confidently, learn smarter, and ace every
                    interview with MockMate.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 flex-wrap justify-center mb-8 relative z-10">
                    <Link href="/sign-up" className="rounded-full w-full sm:w-auto">
                        <Button className="bg-[#d6c8ff] text-black font-semibold rounded-full px-7 py-3 text-base sm:text-lg hover:bg-[#c4b5fc] transition-all w-full sm:w-auto">
                            Start Practicing Free →
                        </Button>
                    </Link>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8 sm:py-10 px-8 sm:px-16 md:px-32 lg:px-40 text-center border-t border-[#1a1a1a] bg-transparent relative z-10 backdrop-blur-[2px]">
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        100+
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        Interview Templates
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        50+
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        Job Categories
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        100%
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        AI-Driven Insights
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#ff9bd6] via-[#c4b5fc] to-[#a3a9ff] text-transparent bg-clip-text">
                        24/7
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
                        Practice Anytime
                    </p>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-[#1a1a1a] py-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm bg-transparent relative z-10 backdrop-blur-[2px]">
                © {new Date().getFullYear()} MockMate — All rights reserved.
            </footer>
        </main>
    );
}
