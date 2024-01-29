'use client'

import { replyToInvitation } from '@/app/actions'
import { STATE } from '@/types'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState, type FormEvent, type MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { useGuest } from '../hooks/use-guest'
import { Spinner } from '../spinner'
import { Card } from './Card'

export const AcceptanceCard = () => {
  const { guest, isAcceptingCardVisible, hideAcceptance, updateGuest } = useGuest()
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const params = useParams<{ event: string, slug: string }>()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (guest) setAmount(guest.amount || guest.maxAmount)
  }, [guest])

  if (!guest) return null

  const { event, slug } = params!

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const updatedGuest = await replyToInvitation(formData)
      updateGuest(updatedGuest)
    } catch (e) {
      alert('Error al enviar la respuesta. Inténtelo de nuevo y si persiste póngase en contacto con su anfitrión.')
    } finally {
      setLoading(false)
      hideAcceptance()
    }
  }

  const handleGuestIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    const op = e.currentTarget.dataset.op

    setAmount(current => {
      if (op === 'plus' && guest.maxAmount > current) {
        return current + 1
      } else if (op === 'minus' && current > 1) {
        return current - 1
      }

      return current
    })
  }

  return <>
    <button
      className={twMerge(
        'fixed size-screen left-0 top-0 bg-black opacity-0 transition-opacity duration-1000 pointer-events-none',
        isAcceptingCardVisible && 'pointer-events-auto opacity-30'
      )}
      onClick={hideAcceptance}
    />
    <Card
      className={twMerge(
        'shadow-heavy amount-card',
        isAcceptingCardVisible && 'amount-card-visible'
      )}
    >
      <form onSubmit={handleSubmit}
        className='flex h-full flex-col items-center justify-start gap-4'>
        <input type="text"
          hidden
          name="eventSlug"
          defaultValue={event} />
        <input type="text"
          hidden
          name="slug"
          defaultValue={slug} />
        <input type="text"
          hidden
          name="state"
          defaultValue={STATE.accepted} />
        <h2 className='uppercase'>Cuantos sois</h2>
        <div className='flex items-center justify-center gap-c10'>
          <button type='button'
            disabled={amount <= 1}
            className='text-red-400 disabled:text-red-200'
            onClick={handleGuestIncrease}
            data-op="minus"><MinusCircleIcon /></button>
          <input
            value={amount}
            type='number'
            min={1}
            name="amount"
            id="amount"
            className='w-12 border-none bg-transparent text-center text-lg'
            onChange={(e) => {
              let v = parseInt(e.target.value)

              if (v < 1) v = 1
              if (v > guest.maxAmount) v = guest.maxAmount
              setAmount(v)
            }}
          />
          <button disabled={amount >= guest.maxAmount}
            type='button'
            className='text-olive-400 disabled:text-olive-200'
            onClick={handleGuestIncrease}
            data-op="plus"><PlusCircleIcon /></button>
        </div>

        <p className='text-xs font-thin text-zinc-400'>{
          guest.maxAmount === 1
            ? 'Esta invitación incluye una plaza para ti.'
            : `Esta invitación incluye ${guest.maxAmount} plazas.`
        }</p>

        <button disabled={loading}
          className='button-fill-base rounded-md bg-right p-2 font-serif text-sm font-light uppercase text-zinc-400 transition-all bg-color-emerald hover:button-fill-hover hover:text-zinc-700'
          onClick={() => { console.log('submit') }}>{loading ? <Spinner /> : 'Confirmar'}</button>
      </form>

    </Card>
  </>
}
