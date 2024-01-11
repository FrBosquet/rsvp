import { twMerge } from 'tailwind-merge'

type Props = {
  children: React.ReactNode
  onClick?: () => void,
  className?: string,
}

export const Card = ({ children, onClick, className }: Props) => {
  return (
    <div aria-role='button' onClick={onClick} className={twMerge(
      'bg-cover bg-[url(/paper.webp)] bg-center absolute card flex flex-col items-center justify-center gap-c8 backface-hidden shadow-2xl',
      onClick ? 'cursor-pointer' : 'cursor-auto',
      className
    )}>
      {children}
    </div>
  )
}