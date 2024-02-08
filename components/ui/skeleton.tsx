import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted text-transparent w-fit select-none", className)}
      {...props}
    />
  )
}

export { Skeleton }
