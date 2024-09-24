'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Languages } from 'lucide-react'
import { toast } from 'sonner'

import { getUserPrefs, setUserPrefs } from '@/actions/prefs'
import { Select } from '@/components/form/select'
import { useIntl } from '@/components/providers/translator'
import { Button } from '@/components/ui/button'

export const PreferencesContent = () => {
  const { t } = useIntl()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['user-prefs'],
    queryFn: () => getUserPrefs()
  })

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) => setUserPrefs(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-prefs'] })
      toast.success(t('preferences.success'))
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    mutate(formData)
  }

  return (
    <section className="flex flex-col gap-4">
      <form className="contents" onSubmit={handleSubmit}>
        <h2 className="flex items-center gap-2 border-b-2 font-sans text-xl uppercase">
          <Languages /> {t('preferences.language')}
        </h2>

        <Select
          defaultValue={data?.language}
          isDisabled={isPending}
          name="language"
          values={[
            {
              value: 'en',
              label: t('preferences.language.en')
            },
            {
              value: 'es',
              label: t('preferences.language.es')
            }
          ]}
        />

        <section>
          <Button disabled={isPending} type="submit" variant="default">
            {t('preferences.save')}
          </Button>
        </section>
      </form>
    </section>
  )
}
