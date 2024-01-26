'use client'

import { STATE } from '@/types'
import { type Guest } from '@prisma/client'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from './Card'

interface Props {
  guest: Guest
  state: STATE
  onCancel: () => void
}

export const AcceptanceCard = ({ guest, state, onCancel }: Props) => {
  const [amount, setAmount] = useState(guest.maxAmount)
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
    <div className={twMerge('absolute inset-0 bg-black opacity-0 transition-opacity duration-1000 pointer-events-none', state === STATE.accepting && 'pointer-events-auto opacity-30')} onClick={onCancel} />
    <Card
      className={twMerge(
        'flex gap-4 flex-col justify-start shadow-heavy transition-all amount-card',
        state === STATE.accepting && 'amount-card-visible'
      )}
    >
      <h2 className='uppercase'>Cuantos sois</h2>
      <div className='flex items-center justify-center gap-c10'>
        <button type='button' disabled={amount <= 1} className='text-red-400 disabled:text-red-200' onClick={handleGuestIncrease} data-op="minus"><MinusCircleIcon /></button>
        <input
          value={amount}
          type='number'
          min={1}
          name="guests"
          id="guests"
          className='w-12 border-none bg-transparent text-center text-lg'
          onChange={(e) => {
            let v = parseInt(e.target.value)

            if (v < 1) v = 1
            if (v > guest.maxAmount) v = guest.maxAmount
            setAmount(v)
          }}
        />
        <button disabled={amount >= guest.maxAmount} type='button' className='text-olive-400 disabled:text-olive-200' onClick={handleGuestIncrease} data-op="plus"><PlusCircleIcon /></button>
      </div>

      <button className='button-fill-base rounded-md bg-right p-2 font-serif text-sm font-light uppercase text-zinc-400 transition-all bg-color-emerald hover:button-fill-hover hover:text-zinc-700' onClick={() => { console.log('submit') }}>Confirmar</button>

    </Card>
  </>
}
