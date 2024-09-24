import { UserPrefs } from '@/types'

import { TooltipProvider } from '../ui/tooltip'
import { TranslatorProvider } from './translator'

type Props = {
  children: React.ReactNode
  prefs: UserPrefs
}

// TODO: Move here the clerk provider
export const RootProvider = ({ children, prefs }: Props) => {
  return (
    <TranslatorProvider defaultLanguage={prefs.language}>
      <TooltipProvider>{children}</TooltipProvider>
    </TranslatorProvider>
  )
}
