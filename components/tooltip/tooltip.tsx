import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger
} from '../ui/tooltip'

type Props = {
  children: React.ReactNode
  content: React.ReactNode
  delay?: number
}

export const Tooltip = ({ children, content, delay = 100 }: Props) => {
  return (
    <TooltipRoot delayDuration={delay}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipRoot>
  )
}
