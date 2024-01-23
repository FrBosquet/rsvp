import { Disc3 } from 'lucide-react'

export const Spinner = ({ size }: { size?: number }) => {
  return <Disc3 size={size} className="animate-spin" />
}
