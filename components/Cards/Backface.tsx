'use client'

import { replyToInvitation } from '@/app/actions'
import { STATE } from '@/types'
import { type Guest } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'
import { Card } from './Card'

interface CoverProps { guest: Guest }
type Props = CoverProps & { isFlipped: boolean, onClick: (state: STATE) => void }

export const Backface = ({ guest, isFlipped, onClick }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const params = useParams<{ event: string, slug: string }>()

  const handleReject = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('eventSlug', params?.event ?? '')
      formData.append('slug', params?.slug ?? '')
      formData.append('state', STATE.rejected)

      await replyToInvitation(formData)

      onClick(STATE.rejected)
    } catch (e) {
      alert('Error al enviar la respuesta. Inténtelo de nuevo y si persiste póngase en contacto con su anfitrión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className={twMerge(
        'justify-end text-center gap-c50 p-c10',
        'text-zinc-700',
        isFlipped ? 'flipped-back' : 'flipped-non-back'
      )}
    >
      <p className='pb-c5 font-serif text-3xl uppercase leading-none tracking-xl'>Jana & Odette</p>
      <p className='px-c10 text-sm uppercase leading-6 text-zinc-500'>os invitan a la celebración de su boda el</p>
      <p className='font-serif text-xl uppercase tracking-2xl'>11.05.2024</p>
      <p className='text-sm uppercase leading-6 text-zinc-500'>
        A las 13:00 de la tarde<br />
        <span className='text-xs'>en</span>La Huerta de peñalen<br />
        <span className='text-xs'>Camí de l’Assagador, Vilarreal</span><br />
      </p>
      <p className='pt-c10 font-script text-lg text-red-950'>¿Contamos con vosotros?</p>
      <menu className='flex w-full justify-center gap-c100 p-c50'>
        <button disabled={loading} onClick={() => { onClick(STATE.accepting) }} className='button-fill-base flex-1 rounded-md bg-right font-serif text-sm font-light uppercase text-zinc-400 transition-all bg-color-emerald hover:button-fill-hover hover:text-zinc-700 disabled:pointer-events-none'>Sí</button>
        <button disabled={loading || guest.state === STATE.rejected} onClick={handleReject} className='button-fill-base relative flex-1 rounded-md font-serif text-sm font-light uppercase text-zinc-400 transition-all bg-color-rose hover:button-fill-hover hover:text-zinc-700 disabled:pointer-events-none'>
          {
            loading
              ? <Spinner className='mx-auto' />
              : <>
                No
                {
                  guest.state === STATE.rejected &&
                  <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-lg font-bold text-zinc-950'>X</span>
                }
              </>
          }

        </button>
      </menu>
    </Card>
  )
}
