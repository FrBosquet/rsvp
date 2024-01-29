'use client'

import { useGuest } from '@/components/hooks/use-guest'
import WhatsAppImage from '@/public/whatsapp.svg'
import Image from 'next/image'
import { AnimatedButton } from '../animated-button'
import { Wrapper } from './wrapper'

const hosts = [
  { name: 'Jana', phone: '+34629201756' },
  { name: 'Odette', phone: '+35625044726' }
]

interface Props {
  visible: boolean
}

export const Contact = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  return (<Wrapper visible={visible}>
    <h1 className='w-full border-b-2 border-zinc-400 pb-3 text-center font-serif text-xl uppercase'>Contacto</h1>
    <p className='text-base'>Si tenéis alguna duda, podéis mandarnos un Whatsapp:</p>
    {
      hosts.map((host, i) => (
        <AnimatedButton
          onClick={() => window.open(`https://wa.me/${host.phone}`, '_blank')}
          key={i}
          className='flex items-center gap-4 px-2 text-center font-serif text-xl bg-color-emerald'>
          <Image alt="Logo de whatsapp"
            src={WhatsAppImage}
            width={24}
            height={24} />
          <span>{host.name}</span>
        </AnimatedButton>
      ))
    }
  </Wrapper>)
}
