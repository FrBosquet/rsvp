import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

import { getUserPrefs } from '@/actions/prefs'

import { PreferencesContent } from './content'

export default async function PreferencesPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user-prefs'],
    queryFn: getUserPrefs
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreferencesContent />
    </HydrationBoundary>
  )
}
