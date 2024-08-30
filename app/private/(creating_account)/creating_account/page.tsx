'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CreatingAccountPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/private')
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [router])

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <Loader2 className="animate-spin" size={60} />
      <h1 className="text-xl">Estamos creando tu cuenta...</h1>
      <p>Podría tardar unos minutos</p>
    </section>
  )
}
