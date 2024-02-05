'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { AnimatedButton } from '../animated-button'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

const UseBus = ({ isSingle }: { isSingle: boolean }) => {
  return (
    <p className='text-base'>{
      isSingle
        ? 'Has indicado que utilizarás el autobús para desplazarte'
        : 'Habeis indicado que utilizareis el autobús para desplazaros'
    }. Mas adelante anunciaremos los horarios.</p>
  )
}

const DontUseBus = ({ isSingle }: { isSingle: boolean }) => {
  return (
    <p className='text-base'>{
      isSingle
        ? 'Has indicado que no utilizaras el autobús para desplazarte. Si cambias de opinión puedes actualizar tu elección:'
        : 'Habéis indicado que no utilizareis el autobús para desplazaros. Si cambiáis de opinión, podeis actualizar vuestra elección:'
    }</p>
  )
}

export const Commuting = ({ visible }: Props) => {
  const { guest, usesBus, isSingle, showAcceptance } = useGuest()

  if (!guest) return null

  return (<Wrapper title='transporte'
    visible={visible}>
    <p className='text-base'>La celebración tendrá lugar en <strong>La huerta de Peñalen</strong>. Se encuentra en Camí de l’Assagador, Vilarreal</p>
    {
      usesBus
        ? <UseBus isSingle={isSingle} />
        : <DontUseBus isSingle={isSingle} />
    }
    <AnimatedButton
      className='w-full p-3 text-lg bg-color-emerald'
      onClick={showAcceptance}
    >Cambiar numero de asistentes, alergias o autobus</AnimatedButton>

  </Wrapper>)
}
