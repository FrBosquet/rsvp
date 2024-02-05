import { Pin } from 'lucide-react'

interface Props {
  href: string
  title: string
  address: string
}

export const PlaceLink = ({ href, title, address }: Props) => {
  return <a href={href}
    target='_blank'
    className='mx-auto'
    rel="noreferrer"
  >
    <div className='flex items-center gap-c75 text-lg text-olive-400'>
      <Pin /> {title}
    </div>
    <p className='text-sm text-zinc-700'>
      {address}
    </p>
  </a>
}
