'use client'
import {
  isServer,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

let browserQueryClient: QueryClient | undefined = undefined

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60
      }
    }
  })
}

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient()
    }

    return browserQueryClient
  }
}

export const QueryProvider = ({ children }: Props) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  )
}
