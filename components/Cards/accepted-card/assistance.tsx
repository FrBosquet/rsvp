'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { useRejectAssistance } from '@/components/hooks/use-reject-assitance'
import { AnimatedButton } from '../animated-button'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Assistance = ({ visible }: Props) => {
  const { guest, showAcceptance } = useGuest()
  const { loading, handleReject } = useRejectAssistance()

  if (!guest) return null

  return (<Wrapper visible={visible}>
    <h1 className='w-full border-b-2 border-zinc-400 pb-3 text-center font-serif text-xl uppercase'>Asistencia</h1>
    <p className='mb-auto w-full text-left text-base '>{
      guest.amount! === 1
        ? 'Has indicado que solo asistirás tú al evento.'
        : `Habeis indicado que asistireis ${guest.amount} personas al evento.`
    }
    </p>
    <p className='text-sm text-zinc-700'>¿Cambio de planes? Podemos actualizar la lista de invitados sin mayor repercusión hasta el 1 de Mayo de 2024:</p>

    <AnimatedButton
      className='w-full p-3 text-lg bg-color-emerald'
      onClick={showAcceptance}
    >Cambiar numero de asistentes</AnimatedButton>
    <AnimatedButton
      loading={loading}
      className='w-full p-3 text-lg bg-color-rose'
      onClick={handleReject}
    >Cancelar asistencia</AnimatedButton>
  </Wrapper>)
}
