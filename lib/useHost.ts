import { useBoolean } from '@chakra-ui/react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCallback, useEffect, useState } from 'react'

const cache: Record<string, number> = {}

export const useHostId = () => {
  const supabaseClient = useSupabaseClient()
  const [isLoading, loading] = useBoolean(false)
  const [hostId, setHostId] = useState<number | null>(null)
  const session = useSession()

  const fetchHostId = useCallback(async (email: string) => {
    if (cache[email]) {
      setHostId(cache[email])
      return
    }

    loading.on()

    const res = await supabaseClient
      .from('hosts')
      .select('id')
      .match({ email })
      .limit(1)
      .single()

    if (!res.data) throw new Error('Host not found')

    cache[email] = res.data.id

    loading.off()
    setHostId(res.data.id as number)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (session) void fetchHostId(session.user.email!)
  }, [session])

  return {
    isLoadingHostId: !session || isLoading,
    hostId
  }
}
