'use client'

import { Guest } from '@/types'
import { Card } from './Card'

type CoverProps = { guest: Guest }
type Props = CoverProps & { isFlipped: boolean; onClick: () => void }

export const Backface = ({ guest, isFlipped, onClick }: Props) => {

  return (
    <Card
      className={isFlipped ? 'flipped-back' : 'flipped-non-back'}
    >
      backface


    </Card>
  )
}
