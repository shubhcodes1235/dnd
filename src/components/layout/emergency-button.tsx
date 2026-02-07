// src/components/layout/emergency-button.tsx
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export function EmergencyButton() {
    return (
        <div className="fixed bottom-24 right-6 z-50 lg:bottom-10 lg:right-10">
            <Link href="/vault/emergency">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ rotate: { repeat: Infinity, duration: 2 } }}
                >
                    <Button
                        size="icon"
                        className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 shadow-glow border-4 border-white text-white"
                    >
                        <AlertCircle className="w-8 h-8" />
                    </Button>
                </motion.div>
            </Link>
        </div>
    )
}
