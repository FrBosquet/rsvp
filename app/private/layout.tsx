import { PageTitle } from '@/components/header/page-title'
import { TooltipProvider } from '@/components/ui/tooltip'
import { UserButton } from '@clerk/nextjs'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>
    <main className="container mx-auto flex min-h-screen flex-col gap-3 p-4">
      <header className="flex w-full items-center justify-between gap-2 rounded-2xl py-4">
        <PageTitle />
        <UserButton afterSignOutUrl='/'
          showName />
      </header>

      {children}
    </main>
  </TooltipProvider>
}
