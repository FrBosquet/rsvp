'use client'

import { useFormState, useFormStatus } from "react-dom"
import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode
  className?: string
  action: any
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

  return <fieldset disabled={pending} className={twMerge('flex', className)}>{children}</fieldset>
}

export const Form = ({ action, className, children }: Props) => {
  const [state, formAction] = useFormState(action, { error: '' })
  const { pending } = useFormStatus()


  return <form className={twMerge('flex gap-2', className)} action={formAction}>

    {children}
    {
      state?.error && !pending && <p className="text-red-500">{state.error}</p>
    }
  </form>
}