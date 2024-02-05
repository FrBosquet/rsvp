'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Gift = ({ visible }: Props) => {
  const { guest } = useGuest()

  if (!guest) return null

  const IBAN = 'ES43 1465 0100 94 2055346756' // TODO: Move to event config

  return (<Wrapper title='Regalo'
    visible={visible}>
    <p className='text-base'>Si os hemos invitado a nuesta boda es porque sois importantes para nosostros. No esperamos nada a cambio.</p>
    <p className='text-base'>Si aun así os apetece tener un detalle con nosotros, puedes hacerlo en este número de cuenta:</p>
    <button className='flex items-center justify-center gap-4 text-sm font-semibold'
      onClick={async () => {
        await navigator.clipboard.writeText(
          IBAN
        )

        toast('Copiado al portapapeles')
      }}>
      <Copy />
      <span>{IBAN}</span>
    </button>
  </Wrapper>)
}
