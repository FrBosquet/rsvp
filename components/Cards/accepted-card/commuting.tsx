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
        : 'Habéis indicado que utilizareis el autobús para desplazaros'
    }. Mas adelante anunciaremos los horarios.</p>
  )
}

const DontUseBus = ({ isSingle }: { isSingle: boolean }) => {
  return (
    <p className='text-base'>{
      isSingle
        ? 'Has indicado que no utilizaras el autobús para desplazarte. Si cambias de idea, puedes actualizar tu elección:'
        : 'Habéis indicado que no utilizareis el autobús para desplazaros. Si cambiáis de idea, podéis actualizar vuestra elección:'
    }</p>
  )
}

export const Commuting = ({ visible }: Props) => {
  const { guest, usesBus, isSingle, showAcceptance } = useGuest()

  if (!guest) return null

  return (<Wrapper title='transporte'
    visible={visible}>
    <p className='text-base'>Como sabemos que quizás acabáis en condiciones de hacer cualquier cosa menos conducir, hemos contratado un servicio de autobuses que os garantizará un traslado seguro.</p>
    <section className='flex flex-col gap-c80'>
      <h3 className='text-center text-lg text-emerald-700'>Horarios: </h3>
      <div>
        <strong>Ida:</strong>
        <ul className='pl-c80'>
          <li>Hotel Civis Jaume I, 12:15h</li>
          <li>Plaza María Agustina, 12:00h</li>
        </ul>
      </div>
      <div>
        <strong>Vuelta (al origen):</strong>
        <ul className='pl-c80'>
          <li>Primera salida, 22:00h</li>
          <li>Última salida, 00:15</li>
        </ul>
      </div>
    </section>
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
