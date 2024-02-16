'use client'

import { Spinner } from '@/components/spinner'
import { useFormStatus } from 'react-dom'

interface Props {
  children: React.ReactNode
}

export const SubmitButton = ({ children }: Props) => {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='flex justify-center rounded-md bg-gradient-to-br from-olive-500 to-olive-600 p-2 font-semibold text-slate-200 shadow-md disabled:opacity-50'
      disabled={pending}
    >
      {pending ? <Spinner /> : children}
    </button>
  )
}
