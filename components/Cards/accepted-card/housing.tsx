'use client'

import { CopyText } from '@/components/copy'
import { useGuest } from '@/components/hooks/use-guest'
import { PlaceLink } from '@/components/place-link'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Housing = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  return (<Wrapper title='hotel'
    visible={visible}>
    <p className='text-base'>Hemos acordado un descuento del 15% para nuestros invitados con:</p>
    <PlaceLink
      href="https://www.hoteljaimei.com/?gclid=CjwKCAiAq4KuBhA6EiwArMAw1B0Yx2_IyPh-MuBy0uiGn0l0oCdBkwg-yiDizb46wbd8UaQXF8f5ahoCBHgQAvD_BwE"
      title='Hotel Civis Jaume I'
      address='Ronda Mijares 67, Castellón de la Plana'
    />

    <p>Para acceder al descuento, utilizad el siguiente código:</p>
    <CopyText value='JANAYODETTE' />
  </Wrapper>)
}
