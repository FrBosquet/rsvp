import { twMerge } from 'tailwind-merge'

export const Wrapper = ({ children, visible }: { children: React.ReactNode, visible: boolean }) => {
  return (
    <div className={
      twMerge('opacity-0 transition-opacity absolute inset-0 pointer-events-none justify-start gap-4 flex flex-col p-c20 delay-75 duration-500',
        visible && 'opacity-100 delay-200 pointer-events-auto'
      )
    }>
      {children}
    </div>
  )
}
