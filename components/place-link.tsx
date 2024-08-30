import { Pin } from 'lucide-react'

interface Props {
  href: string
  title: string
  address: string
}

export const PlaceLink = ({ href, title, address }: Props) => {
  return (
    <a className="mx-auto" href={href} rel="noreferrer" target="_blank">
      <div className="flex items-center gap-c75 text-lg text-olive-400">
        <Pin /> {title}
      </div>
      <p className="text-sm text-zinc-700">{address}</p>
    </a>
  )
}
