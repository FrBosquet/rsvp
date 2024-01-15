'use client'

import { useFormStatus } from "react-dom"
import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode
  className?: string
}

export const SubmitButton = ({ children, className }: Props) => {
  const { pending } = useFormStatus()

  return <button
    aria-disabled={pending}
    disabled={pending}
    className={twMerge('uppercase text-xs bg-orange-900 text-zinc-200 p-2 rounded-2xl shadow-lg disabled:opacity-25 disabled:cursor-wait', className)}
    type="submit">
    {children}
  </button>
}