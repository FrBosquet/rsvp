'use client'

import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
  action: unknown
}

export const Button = ({ children, className }: Pick<Props, 'children' | 'className'>) => {
  const { pending } = useFormStatus()

  return <button
    type="submit"
    aria-disabled={pending}
    disabled={pending}
    className={twMerge('uppercase text-xs bg-orange-900 text-zinc-200 p-2 rounded-2xl shadow-lg disabled:opacity-25 disabled:cursor-wait', className)}>
    {children}
  </button>
}

export const Fieldset = ({ children, className }: Pick<Props, 'children' | 'className'>) => {
  const { pending } = useFormStatus()

  return <fieldset disabled={pending}
    className={twMerge('contents', className)}>{children}</fieldset>
}
