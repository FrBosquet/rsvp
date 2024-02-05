'use client'

import { useGuest } from '@/components/hooks/use-guest'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Gift = ({ visible }: Props) => {
  const { guest, isSingle } = useGuest()

  if (!guest) return null

  const IBAN = 'ES77 2100 1981 3502 0044 7866' // TODO: Move to event config

  return (<Wrapper title='Regalo'
    visible={visible}>
    {
      isSingle
        ? <><p className='text-base'>Si te hemos invitado a nuestra boda es porque eres importante para nosotras. No esperamos nada a cambio.</p>
          <p className='text-base'>Si aun así te apetece tener un detalle con nosotras, puedes hacerlo en este número de cuenta:</p></>
        : <><p className='text-base'>Si os hemos invitado a nuestra boda es porque sois importantes para nosotras. No esperamos nada a cambio.</p>
          <p className='text-base'>Si aun así os apetece tener un detalle con nosotras, podéis hacerlo en este número de cuenta:</p></>
    }
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
