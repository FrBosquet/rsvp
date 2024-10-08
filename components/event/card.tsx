import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const Card = ({ children, onClick, className }: Props) => {
  return (
    <div
      className={cn(
        'bg-cover bg-[url(/paper/paper.webp)] bg-center absolute card size-card flex flex-col items-center justify-center backface-hidden shadow-2xl text-inset',
        // 'bg-card-debug rounded-xl',
        onClick ? 'cursor-pointer' : 'cursor-auto',
        className
      )}
      role="button"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
