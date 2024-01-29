import { replyToInvitation } from '@/app/actions'
import { STATE } from '@/types'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useGuest } from './use-guest'

export const useRejectAssistance = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { updateGuest } = useGuest()
  const params = useParams<{ event: string, slug: string }>()

  const handleReject = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('eventSlug', params?.event ?? '')
      formData.append('slug', params?.slug ?? '')
      formData.append('state', STATE.rejected)

      const updatedGuest = await replyToInvitation(formData)

      updateGuest(updatedGuest)
    } catch (e) {
      alert('Error al enviar la respuesta. Inténtelo de nuevo y si persiste póngase en contacto con su anfitrión.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, handleReject }
}
