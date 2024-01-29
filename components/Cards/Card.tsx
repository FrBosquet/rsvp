import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const Card = ({ children, onClick, className }: Props) => {
  return (
    <div role='button' onClick={onClick} className={twMerge(
      'bg-cover bg-[url(/paper/paper.webp)] bg-center absolute card flex flex-col items-center justify-center backface-hidden shadow-2xl text-inset',
      onClick ? 'cursor-pointer' : 'cursor-auto',
      className
    )}>
      {children}
    </div>
  )
}
