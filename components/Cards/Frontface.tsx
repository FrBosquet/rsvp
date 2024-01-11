'use client'

import { getGuestTypes } from '@/lib/guesttype'
import click from '@/public/click.png'
import { Guest } from '@/types'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Card } from './Card'

type CoverProps = { guest: Guest }
type Props = CoverProps & { isFlipped: boolean; onClick: () => void }

const SingleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex flex-col items-center w-full text-3xl leading-none text-huge font-serif '>
      <p>{name[0]}</p>
    </section>
  )
}
const CoupleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex flex-col items-center w-full text-3xl text-huge font-serif text-center font-extralight leading-[0.8]'>
      <p className='uppercase'>{name[0]}</p>
      <p className='text-zinc-500 text-xl'>
        &
      </p>
      <p className='uppercase'>{name[1]}</p>
    </section>
  )
}
const FamilyCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex flex-col items-center w-full leading-[0.8] text-3xl font-serif text-center font-extralight'>
      <p className='text-sm text-zinc-500'>Familia de</p>
      <p className='uppercase'>{name[0]}</p>
      <p className='text-zinc-500 text-xl'>
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
        className='animate-click backface-hidden mt-c20'
      >
        <div className='animate-fade-in'>
          <Image src={click} className='w-c10 opacity-40' alt="Haz click en la carta para voltearla" />
        </div>
      </div>
    </Card>
  )
}
