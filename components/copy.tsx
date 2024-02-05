import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

interface Props {
  value: string
  className?: string
  onlyIcon?: boolean
  iconSize?: number
}

export const CopyText = ({ value, className, onlyIcon, iconSize }: Props) => {
  return (
    <button className={twMerge('flex items-center justify-center gap-4 text-sm font-semibold', className)}
      onClick={async () => {
        await navigator.clipboard.writeText(
          value
        )

        toast('Copiado al portapapeles')
      }}>
      <Copy size={iconSize} />
      {!onlyIcon && <span>{value}</span>}
    </button>
  )
}
