import { Fieldset } from '@/components/Form'
import { FormError } from '@/components/form/error'
import { Input } from '@/components/form/input'
import { InputList } from '@/components/form/input-list'
import { SubmitButton } from '@/components/SubmitButton'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function NewEventPage() {
  const action = async (formData: FormData) => {
    'use server'
    const clerkUser = await currentUser()

    if (!clerkUser) return

    const name = formData.get('name')
    const slug = formData.get('slug')

    const ownerEmail = clerkUser.emailAddresses[0].emailAddress
    const usersEmails = formData.getAll('user')

    if (!usersEmails.includes(ownerEmail)) {
      usersEmails.push(ownerEmail)
    }

    const userData = usersEmails.map((email) => {
      return {
        email: email as string,
        role: email === ownerEmail ? 'owner' : 'host'
      }
    })

    try {
      await prisma.event.create({
        data: {
          name: name as string,
          slug: slug as string,
          users: {
            createMany: {
              data: userData
            }
          }
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
        <InputList label="Participantes (email)"
          name='user'
          type="email"
          required />
      </Fieldset>
      <SubmitButton className='mt-4'>Crear</SubmitButton>
    </form>
  </section>
}
