'use client'

import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type FormEvent, type MouseEvent, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { replyToInvitation } from '@/app/actions'
import { STATE } from '@/types'

import { useGuest } from '../hooks/use-guest'
import { Spinner } from '../spinner'
import { AnimatedButton } from './animated-button'
import { Card } from './Card'

export const AcceptanceCard = () => {
  const {
    guest,
    isAcceptingCardVisible,
    hideAcceptance,
    updateGuest,
    allergies,
    usesBus
  } = useGuest()
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const params = useParams<{ event: string; slug: string }>()

  useEffect(() => {
    if (guest) setAmount(guest.amount || guest.maxAmount)
  }, [guest])

  if (!guest) return null

  const { event, slug } = params

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const updatedGuest = await replyToInvitation(formData)
      updateGuest(updatedGuest)
    } catch (e) {
      alert(
        'Error al enviar la respuesta. Inténtelo de nuevo y si persiste póngase en contacto con su anfitrión.'
      )
    } finally {
      setLoading(false)
      hideAcceptance()
    }
  }

  const handleGuestIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    const op = e.currentTarget.dataset.op

    setAmount((current) => {
      if (op === 'plus' && guest.maxAmount > current) {
        return current + 1
      } else if (op === 'minus' && current > 1) {
        return current - 1
      }

      return current
    })
  }

  return (
    <>
      <button
        className={twMerge(
          'fixed size-screen left-0 top-0 bg-black opacity-0 transition-opacity duration-1000 pointer-events-none z-30',
          isAcceptingCardVisible && 'pointer-events-auto opacity-30'
        )}
        onClick={hideAcceptance}
      />
      <Card
        className={twMerge(
          'shadow-heavy acceptance-card border border-zinc-700/30 z-40',
          isAcceptingCardVisible && 'acceptance-card-visible'
        )}
      >
        <form
          className="flex size-full flex-col items-center justify-start gap-4"
          onSubmit={handleSubmit}
        >
          <input hidden defaultValue={event} name="eventSlug" type="text" />
          <input hidden defaultValue={slug} name="slug" type="text" />
          <input
            hidden
            defaultValue={STATE.accepted}
            name="state"
            type="text"
          />

          {/* plazas */}
          <h2 className="uppercase">Cuantos sois</h2>
          <div className="flex items-center justify-center gap-c10">
            <button
              className="text-red-400 disabled:text-red-200"
              data-op="minus"
              disabled={amount <= 1}
              type="button"
              onClick={handleGuestIncrease}
            >
              <MinusCircleIcon />
            </button>
            <input
              className="w-12 border-none bg-transparent text-center text-lg"
              id="amount"
              min={1}
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => {
                let v = parseInt(e.target.value)

                if (v < 1) v = 1
                if (v > guest.maxAmount) v = guest.maxAmount
                setAmount(v)
              }}
            />
            <button
              className="text-olive-400 disabled:text-olive-200"
              data-op="plus"
              disabled={amount >= guest.maxAmount}
              type="button"
              onClick={handleGuestIncrease}
            >
              <PlusCircleIcon />
            </button>
          </div>

          <p className="font-thin text-zinc-400">
            {guest.maxAmount === 1
              ? 'Esta invitación incluye una plaza para ti.'
              : `Esta invitación incluye ${guest.maxAmount} plazas.`}
          </p>

          {/* alergias */}
          <h2 className="pt-c40 uppercase">Alergias o intolerancias</h2>
          <textarea
            className=" w-full resize-none border bg-transparent p-c100 px-c20 text-center"
            defaultValue={allergies}
            name="allergies"
            placeholder="Describe aquí si alguno de los invitados tiene alguna alergia o intolerancia alimentaria."
          />

          {/* autobus */}
          <h2 className="pt-c40 uppercase">Autobús</h2>
          <article className="flex w-full justify-center gap-c80">
            <input
              className="accent-olive-400"
              defaultChecked={usesBus}
              id="bus"
              name="bus"
              type="checkbox"
              value="bus"
            />
            <label className="font-light text-zinc-900" htmlFor="bus">
              Marca esta casilla si vais a hacer uso del autobus
            </label>
          </article>

          <AnimatedButton className="mb-c40 mt-auto text-lg" disabled={loading}>
            {loading ? <Spinner /> : 'Confirmar'}
          </AnimatedButton>
        </form>
      </Card>
    </>
  )
}
