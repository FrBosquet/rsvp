import { Languages } from 'lucide-react'

import { Select } from '@/components/form/select'

export default async function PrivatePage() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 border-b-2 font-sans text-xl uppercase">
        <Languages /> Idioma
      </h2>

      <Select
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
