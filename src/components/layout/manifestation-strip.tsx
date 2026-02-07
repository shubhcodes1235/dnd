// src/components/layout/manifestation-strip.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"

export function ManifestationStrip() {
    const messages = [
        "Mujhe ek din bhot bada designer banna hai, ki sab mujhe dhoondhe. ✨",
        "Ek din kuch aisa hoga — aur tu dekhna, main karungi. 🎥",
        "Inse hi movie poster banana hai. Sab dhoondhenge. 🎞️",
        "Aaj slow ho, par hum saath hain. Har chhota step count hota hai. 🤝",
        "Jo bana rahe ho, wahi tumhe banayega. Trust the process. 🎨",
        "Someone believes in you today. (Keep going) ❤️"
    ]

    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length)
        }, 25000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full bg-primary/10 border-b border-primary/20 overflow-hidden py-4 whitespace-nowrap shadow-inner">
            <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="w-full text-center"
            >
                <span className="font-handwritten text-xl text-night-900 tracking-widest px-6 font-bold italic">
                    {messages[index]}
                </span>
            </motion.div>
        </div>
    )
}
