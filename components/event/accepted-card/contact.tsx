'use client'

import Image from 'next/image'

import { useGuest } from '@/components/hooks/use-guest'
import WhatsAppImage from '@/public/whatsapp.svg'

import { AnimatedButton } from '../animated-button'
import { Wrapper } from './wrapper'

const hosts = [
  { name: 'Jana', phone: '+34629201756' },
  { name: 'Odette', phone: '+34625044726' }
]

interface Props {
  visible: boolean
}

export const Contact = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  return (
    <Wrapper title="Contacto" visible={visible}>
      <p className="pb-c20 text-base">
        Si tenéis alguna duda o consulta, mandadnos un WhatsApp:
      </p>
      {hosts.map((host, i) => (
        <AnimatedButton
          key={i}
          className="flex items-center gap-4 px-2 text-center font-serif text-xl bg-color-emerald"
          onClick={() => window.open(`https://wa.me/${host.phone}`, '_blank')}
        >
          <Image
            alt="Logo de whatsapp"
            height={24}
            src={WhatsAppImage}
            width={24}
          />
          <span>{host.name}</span>
        </AnimatedButton>
      ))}
    </Wrapper>
  )
}
