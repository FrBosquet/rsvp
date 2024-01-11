'use client'

import { getGuestTypes } from '@/lib/guesttype'
import click from '@/public/click.png'
import { Guest } from '@/types'
import Image from 'next/image'
import { Card } from './Card'

type CoverProps = { guest: Guest }
type Props = CoverProps & { isFlipped: boolean; onClick: () => void }

const SingleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex flex-col items-center w-full leading-none text-huge font-script font-semibold'>
      <p>{name[0]}</p>
    </section>
  )
}
const CoupleCover = ({ guest: { name } }: CoverProps) => {
  return (
    <section className='flex flex-col items-center w-full leading-none text-huge font-script font-semibold'>
      <p>{name[0]}</p>
      <p className='text-orange-500 text-4xl'>
        +
      </p>
      <p>{name[1]}</p>
    </section>
  )
}
const FamilyCover = ({ guest: { name } }: CoverProps) => {
  const fullName = `${name[0]} y ${name[1]}`

  return (
    <section className='flex flex-col items-center w-full leading-none text-7xl font-script font-semibold'>
      <p className='text-4xl text-orange-500'>Familia de</p>
      <p>{fullName}</p>
    </section>
  )
}

export const Frontface = ({ guest, isFlipped, onClick }: Props) => {
  const { isSingle, isFamily, isCouple } = getGuestTypes(guest)

  return (
    <Card
      className={isFlipped ? 'flipped-front' : 'flipped-non-front'}
      onClick={onClick}
    >
      {isSingle && <SingleCover guest={guest} />}
      {isFamily && <FamilyCover guest={guest} />}
      {isCouple && <CoupleCover guest={guest} />}

      <div
        className='animate-click backface-hidden'
      >
        <div className='animate-fade-in'>
          <Image src={click} className='w-c10' alt="Haz click en la carta para voltearla" />
        </div>
      </div>
    </Card>
  )
}
