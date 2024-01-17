'use client'

import { getGuestTypes } from '@/lib/guesttype'
import click from '@/public/click.png'
import { type Guest } from '@/types'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Card } from './Card'

interface CoverProps { guest: Guest }
type Props = CoverProps & { isFlipped: boolean, onClick: () => void }

const SingleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex w-full flex-col items-center font-serif text-3xl leading-none '>
      <p>{name[0]}</p>
    </section>
  )
}
const CoupleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex w-full flex-col items-center text-center font-serif text-3xl font-extralight leading-08'>
      <p className='uppercase'>{name[0]}</p>
      <p className='text-xl text-zinc-500'>
        &
      </p>
      <p className='uppercase'>{name[1]}</p>
    </section>
  )
}
const FamilyCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex w-full flex-col items-center text-center font-serif text-3xl font-extralight leading-08'>
      <p className='text-sm text-zinc-500'>Familia de</p>
      <p className='uppercase'>{name[0]}</p>
      <p className='text-xl text-zinc-500'>
        &
      </p>
      <p className='uppercase'>{name[1]}</p>
    </section>
  )
}

export const Frontface = ({ guest, isFlipped, onClick }: Props) => {
  const { isSingle, isFamily, isCouple } = getGuestTypes(guest)

  return (
    <Card
      className={twMerge(
        'text-zinc-700',
        isFlipped ? 'flipped-front' : 'flipped-non-front')}
      onClick={onClick}
    >
      {isSingle && <SingleCover guest={guest} />}
      {isFamily && <FamilyCover guest={guest} />}
      {isCouple && <CoupleCover guest={guest} />}

      <div
        className='mt-c20 animate-click backface-hidden'
      >
        <div className='animate-fade-in'>
          <Image src={click} className='w-c10 opacity-40' alt="Haz click en la carta para voltearla" />
        </div>
      </div>
    </Card>
  )
}
