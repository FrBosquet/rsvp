import { getUserPrefs } from '@/actions/prefs'
import { PageTitle } from '@/components/header/page-title'
import { UserButton } from '@/components/header/user-button'
import { RootProvider } from '@/components/providers/root'

export default async function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userPrefs = await getUserPrefs()

  return (
    <RootProvider prefs={userPrefs}>
      <main className="container mx-auto flex min-h-screen flex-col p-4 max-lg:p-0">
        <header className="flex w-full items-center justify-between gap-2 py-4 max-lg:border-b max-lg:p-4">
          <PageTitle />
          <UserButton />
        </header>
        {children}
      </main>
    </RootProvider>
  )
}
