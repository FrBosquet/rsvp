'use client'

import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { useGuest } from '@/components/hooks/use-guest'

import { Wrapper } from './wrapper'

interface Props {
  visible: boolean
}

export const Gift = ({ visible }: Props) => {
  const { guest, isSingle } = useGuest()

  if (!guest) return null

  const IBAN = 'ES47 2100 1981 3002 0063 7219' // TODO: Move to event config

  return (
    <Wrapper title="Regalo" visible={visible}>
      {isSingle ? (
        <>
          <p className="text-base">
            Te hemos invitado a nuestra boda porque eres importante; <br /> no
            esperamos nada a cambio.
          </p>
          <p className="text-base">
            Si aún así te apetece tener un detalle con nosotras, puedes hacerlo
            en este número de cuenta:
          </p>
        </>
      ) : (
        <>
          <p className="text-base">
            Os hemos invitado a nuestra boda porque sois importantes;
            <br /> no esperamos nada a cambio.
          </p>
          <p className="text-base">
            Si aún así os apetece tener un detalle con nosotras, podéis hacerlo
            en este número de cuenta:
          </p>
        </>
      )}
      <button
        className="flex items-center justify-center gap-4 text-sm font-semibold"
        onClick={async () => {
          await navigator.clipboard.writeText(IBAN)

          toast('Copiado al portapapeles')
        }}
      >
        <Copy />
        <span>{IBAN}</span>
      </button>
    </Wrapper>
  )
}
