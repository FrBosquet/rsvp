import { TooltipProvider } from '../ui/tooltip'
import { QueryProvider } from './query'

type Props = {
  children: React.ReactNode
}

export const RootProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  )
}
