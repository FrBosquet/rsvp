'use client'

import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
}

export const SubmitButton = ({ children, className }: Props) => {
  const { pending } = useFormStatus()

  return <button
    aria-disabled={pending}
    disabled={pending}
    className={twMerge('uppercase text-sm font-bold bg-orange-400 hover:bg-rose-400 text-zinc-800 p-2 rounded-2xl shadow-lg disabled:opacity-25 disabled:cursor-wait', className)}
    type="submit">
    {children}
  </button>
}
