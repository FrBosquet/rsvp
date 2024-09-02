'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Languages } from 'lucide-react'
import { toast } from 'sonner'

import { getUserPrefs, setUserPrefs } from '@/actions/prefs'
import { Select } from '@/components/form/select'
import { Button } from '@/components/ui/button'

export const PreferencesContent = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['user-prefs'],
    queryFn: () => getUserPrefs()
  })

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) => setUserPrefs(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-prefs'] })
      toast.success('Preferencias guardadas')
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
          <Languages /> Idioma
        </h2>

        <Select
          defaultValue={data?.language}
          isDisabled={isPending}
          name="language"
          values={[
            {
              value: 'en',
              label: 'English'
            },
            {
              value: 'es',
              label: 'Español'
            }
          ]}
        />

        <section>
          <Button disabled={isPending} type="submit" variant="default">
            Guardar
          </Button>
        </section>
      </form>
    </section>
  )
}
