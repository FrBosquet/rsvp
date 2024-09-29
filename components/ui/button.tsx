import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 flex",
        cta: "rounded-full bg-rose-500 px-8 py-3 text-lg font-medium transition-colors hover:bg-rose-600",
        menu: "bg-primary text-primary-foreground hover:bg-primary/90 flex",
        acceptance: "uppercase text-sm font-bold bg-orange-400 hover:bg-rose-400 text-zinc-800 p-2 rounded-2xl shadow-lg disabled:opacity-25 disabled:cursor-wait",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        sidebar: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-none w-full text-base justify-start",
      },
      size: {
        default: "h-10 px-4 py-2 gap-4",
        sm: "h-9 rounded-md px-2 gap-2",
        lg: "h-11 rounded-md px-8 gap-8",
        sidebar: "h-12 px-3 py-4 gap-2",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
