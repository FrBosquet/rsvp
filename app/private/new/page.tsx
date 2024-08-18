import { Fieldset } from '@/components/Form'
import { FormError } from '@/components/form/error'
import { Input } from '@/components/form/input'
import { SubmitButton } from '@/components/SubmitButton'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default function NewEventPage() {
  const action = async (formData: FormData) => {
    'use server'
    const name = formData.get('name')
    const slug = formData.get('slug')

    try {
      await prisma.event.create({
        data: {
          name: name as string,
          slug: slug as string
        }
      })
    } catch (e) {
      console.log('>> e:', e)
      let error = 'generic'
      const message = (e as { message: string }).message

      if (message.includes('Unique constraint failed on the fields: (`slug`)')) {
        error = 'used_slug'
      }

      return redirect(`/private/new?error=${Date.now()}::${error}`)
    }

    redirect('/private')
  }

  return <section className='flex flex-col gap-4'>
    <FormError errors={{
      generic: 'Ocurrió un error inesperado al crear el evento',
      used_slug: 'El slug ya está en uso. Utiliza un slug diferente'
    }} />
    <form className='flex flex-col gap-2'
      action={action}>
      <Fieldset>
        <Input label="Nombre"
          required
          name='name' />
        <Input label="Slug"
          name='slug'
          required />
      </Fieldset>
      <SubmitButton className='mt-4'>Crear</SubmitButton>
    </form>
  </section>
}
