import { TooltipProvider } from '@/components/ui/tooltip'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>
    <main className="min-h-screen bg-zinc-950">{children}</main>
  </TooltipProvider>
}
