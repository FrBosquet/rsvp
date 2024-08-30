'use client'

import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface Props {
  children: React.ReactNode
  className?: string
  action: unknown
}

export const Button = ({
  children,
  className
}: Pick<Props, 'children' | 'className'>) => {
  const { pending } = useFormStatus()

  return (
    <button
      aria-disabled={pending}
      className={twMerge(
        'uppercase text-xs bg-orange-900 text-zinc-200 p-2 rounded-2xl shadow-lg disabled:opacity-25 disabled:cursor-wait',
        className
      )}
      disabled={pending}
      type="submit"
    >
      {children}
    </button>
  )
}

export const Fieldset = ({
  children,
  className
}: Pick<Props, 'children' | 'className'>) => {
  const { pending } = useFormStatus()

  return (
    <fieldset className={twMerge('contents', className)} disabled={pending}>
      {children}
    </fieldset>
  )
}
