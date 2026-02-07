// src/components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-2xl border-2 border-pink-100 bg-white px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-pink-300 placeholder:font-handwritten focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-pink-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
