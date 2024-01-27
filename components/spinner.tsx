import { Disc3 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export const Spinner = ({ size, className }: { size?: number, className?: string }) => {
  return <Disc3 size={size} className={twMerge('animate-spin', className)} />
}
