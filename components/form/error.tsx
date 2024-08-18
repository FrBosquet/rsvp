'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface Props {
  errors: Record<string, string>
}

const logError = (type: string, errors: Record<string, string>) => {
  if (errors[type]) return errors[type]

  return 'Error desconocido'
}

export const FormError = ({ errors }: Props) => {
  const params = useSearchParams()

  const error = params.get('error')

  useEffect(() => {
    if (!error) return

    const type = error.split('::').pop()

    if (!type) return
    toast.error(logError(type, errors))
  }, [error])

  return null
}
