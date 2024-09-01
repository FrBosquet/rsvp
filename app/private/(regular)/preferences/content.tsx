'use client'

import { useQuery } from '@tanstack/react-query'
import { Languages } from 'lucide-react'

import { getUserPrefs } from '@/actions/prefs'
import { Select } from '@/components/form/select'

export const PreferencesContent = () => {
  const { data } = useQuery({
    queryKey: ['user-prefs'],
    queryFn: () => getUserPrefs()
  })

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 border-b-2 font-sans text-xl uppercase">
        <Languages /> Idioma
      </h2>

      <Select
        defaultValue={data?.language}
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
    </section>
  )
}
