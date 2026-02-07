// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { motion, HTMLMotionProps } from "framer-motion"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                primary: "bg-pink-300 text-pink-900 hover:bg-pink-400 hover:shadow-glow",
                secondary: "bg-coral-100 text-coral-700 hover:bg-coral-200",
                ghost: "hover:bg-pink-50 text-pink-600",
                danger: "bg-red-100 text-red-600 hover:bg-red-200",
                outline: "border-2 border-pink-200 bg-transparent hover:bg-pink-50 text-pink-600",
            },
            size: {
                sm: "h-9 px-3 text-xs",
                md: "h-11 px-6",
                lg: "h-14 px-10 text-lg rounded-3xl",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// Animated version
export const AnimatedButton = motion(Button);
