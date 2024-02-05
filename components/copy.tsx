import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export const CopyText = ({ value, className }: { value: string, className?: string }) => {
  return (
    <button className={twMerge('flex items-center justify-center gap-4 text-sm font-semibold', className)}
      onClick={async () => {
        await navigator.clipboard.writeText(
          value
        )

        toast('Copiado al portapapeles')
      }}>
      <Copy />
      <span>{value}</span>
    </button>
  )
}
