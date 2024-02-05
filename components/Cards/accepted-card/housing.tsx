'use client'

import { CopyText } from '@/components/copy'
import { useGuest } from '@/components/hooks/use-guest'
import { Pin } from 'lucide-react'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Housing = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  return (<Wrapper title='hotel'
    visible={visible}>
    <p className='text-base'>Hemos acordado con el hotel <strong>Civis Jaume I</strong> un descuento del 15% para nuestros invitados.</p>
    <a href="https://www.hoteljaimei.com/?gclid=CjwKCAiAq4KuBhA6EiwArMAw1B0Yx2_IyPh-MuBy0uiGn0l0oCdBkwg-yiDizb46wbd8UaQXF8f5ahoCBHgQAvD_BwE"
      className='mx-auto'
    >
      <div className='flex items-center gap-c75 text-lg text-olive-400'>
        <Pin /> Hotel Civis Jaume I
      </div>
      <p className='text-sm text-zinc-700'>
        ronda Mijares 67, Castellón de la Plana
      </p>
    </a>
    <p>Puedes utilizar el siguiente código a la hora de hacer la reserva para acceder al descuento:</p>
    <CopyText value='JANAYODETTE' />
  </Wrapper>)
}
