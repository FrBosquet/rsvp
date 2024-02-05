import { useGuest } from '@/components/hooks/use-guest'
import { X } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { AnimatedButton } from '../animated-button'

export const Wrapper = ({ children, visible, title }: { children: React.ReactNode, visible: boolean, title: string }) => {
  const { hideAcceptedCard } = useGuest()

  return (
    <div className={
      twMerge('opacity-0 transition-opacity absolute inset-0 pointer-events-none justify-start gap-4 flex flex-col p-c40 delay-75 duration-500 z-50 pointer-events-[initial]',
        visible && 'opacity-100 delay-200 pointer-events-auto'
      )
    }>
      <h1 className='w-full border-b-2 border-zinc-400 pb-3 text-center font-serif text-xl uppercase'>{title}</h1>
      <div className='flex flex-1 flex-col gap-c30 overflow-y-auto'>{children}</div>
      <AnimatedButton className='flex w-full items-center justify-center p-c50 font-serif text-lg uppercase'
        onClick={hideAcceptedCard}><p>cerrar</p><X size={16} /></AnimatedButton>
    </div>
  )
}
