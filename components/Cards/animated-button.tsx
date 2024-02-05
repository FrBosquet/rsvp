import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'

interface Props {
  isMarked?: boolean
  onClick?: () => void
  loading?: boolean
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const AnimatedButton = ({ isMarked, onClick, loading, children, className }: Props) => {
  return <button
    disabled={loading}
    onClick={onClick}
    className={twMerge('button-fill-base rounded-md font-serif text-sm font-light uppercase text-zinc-700 transition-all hover:button-fill-hover hover:text-zinc-950 disabled:pointer-events-none', className)}>
    {
      loading
        ? <Spinner className='mx-auto' />
        : children
    }
    <span className={twMerge(
      'absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-c20 font-script text-lg font-bold text-zinc-950 opacity-0 transition-opacity duration-500',
      isMarked && 'opacity-100'
    )}>X</span>
  </button>
}
