'use client'

import { type Guest } from '@prisma/client'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import click from '@/public/click.png'

import { useGuest } from '../hooks/use-guest'
import { Card } from './card'

interface CoverProps {
  guest: Guest
}

const SingleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className="flex w-full flex-col items-center font-dancing leading-none text-card-big">
      <p>{name}</p>
    </section>
  )
}
const CoupleCover = ({ guest: { name } }: CoverProps) => {
  const names = name.split(',').map((n) => n.trim())

  return (
    <section className="flex w-full flex-col items-center text-center font-dancing text-4xl font-extralight leading-08">
      <p>{names[0]}</p>
      <p className="text-xl text-zinc-500">&</p>
      <p>{names[1]}</p>
    </section>
  )
}
const FamilyCover = ({ guest: { name } }: CoverProps) => {
  const names = name.split(',').map((n) => n.trim())

  return (
    <section className="flex w-full flex-col items-center text-center font-dancing text-3xl font-extralight leading-08">
      <p className="text-sm text-zinc-500">Familia de</p>
      <p>{names[0]}</p>
      <p className="text-xl text-zinc-500">&</p>
      <p>{names[1]}</p>
    </section>
  )
}

export const Frontface = () => {
  const { guest, isFlipped, flip, isSingle, isFamily, isCouple } = useGuest()

  if (!guest) return null

  return (
    <Card
      className={twMerge(
        'text-zinc-700',
        isFlipped ? 'flipped-front' : 'flipped-non-front'
      )}
      onClick={flip}
    >
      {isSingle && <SingleCover guest={guest} />}
      {isFamily && <FamilyCover guest={guest} />}
      {isCouple && <CoupleCover guest={guest} />}

      <div className="mt-c20 animate-click backface-hidden">
        <div className="animate-fade-in">
          <Image
            alt="Haz click en la carta para voltearla"
            className="w-c10 opacity-40"
            src={click}
          />
        </div>
      </div>
    </Card>
  )
}
