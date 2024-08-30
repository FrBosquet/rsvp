'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from './ui/button'

interface Props {
  children: React.ReactNode
  className?: string
  variant?: ButtonProps['variant']
}

export const SubmitButton = ({ children, className, variant }: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button
      aria-disabled={pending}
      className={className}
      disabled={pending}
      type="submit"
      variant={variant}
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  )
}
