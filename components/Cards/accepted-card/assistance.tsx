'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { useRejectAssistance } from '@/components/hooks/use-reject-assistance'

import { AnimatedButton } from '../animated-button'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Assistance = ({ visible }: Props) => {
  const { guest, showAcceptance, hasAllergies, allergies } = useGuest()
  const { loading, handleReject } = useRejectAssistance()

  if (!guest) return null

  return (
    <Wrapper title="Asistencia" visible={visible}>
      <p className="mb-auto w-full text-left text-base ">
        {guest.amount! === 1
          ? 'Has indicado que solo asistirás tú al evento'
          : `Habéis indicado que vas a asistir ${guest.amount} personas`}
        .{' '}
        {hasAllergies ? (
          <>
            Además, habéis indicado que tenéis las siguientes alergias o
            intolerancias alimentarias:{' '}
            <em className="text-olive-600">{allergies}</em>
          </>
        ) : null}
      </p>
      <p className="text-sm text-zinc-700">
        ¿Cambio de planes? Podemos actualizar la lista de invitados hasta el 1
        de Mayo de 2024:
      </p>

      <AnimatedButton
        className="w-full p-3 text-lg bg-color-emerald"
        onClick={showAcceptance}
      >
        Cambiar número de asistentes, alergias o autobús
      </AnimatedButton>
      <AnimatedButton
        className="w-full p-3 text-lg bg-color-rose"
        loading={loading}
        onClick={handleReject}
      >
        Cancelar asistencia
      </AnimatedButton>
    </Wrapper>
  )
}
