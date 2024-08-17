import { TooltipProvider } from '@/components/ui/tooltip'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>
    <main className="min-h-screen">{children}</main>
  </TooltipProvider>
}
