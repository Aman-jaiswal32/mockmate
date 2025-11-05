"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
            {/* Logo animation */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                    ease: "easeInOut",
                }}
            >
                <Image src="/logo.svg" alt="MockMate logo" width={60} height={60} />
            </motion.div>

            {/* Text animation */}
            <motion.p
                className="mt-4 text-lg font-semibold text-primary-100"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                    ease: "easeInOut",
                }}
            >
                Preparing MockMate...
            </motion.p>
        </div>
    );
}
