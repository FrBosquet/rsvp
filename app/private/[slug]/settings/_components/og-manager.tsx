import { prisma } from '@/lib/prisma'
import { SETTING } from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { ImageInput } from './image-input'
import { SubmitButton } from './submit-button'

interface Props {
  slug: string
}

export const OgManager = async ({ slug }: Props) => {
  const rawSettings = await prisma.setting.findMany({
    where: {
      slug
    }
  })

  const settings = rawSettings.reduce<Record<string, string>>((acc, setting) => {
    acc[setting.type] = setting.value
    return acc
  }, {})

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const title = formData.get('title')
    const description = formData.get('description')
    const image = formData.get('image')

    if (title) {
      await prisma.setting.upsert({
        where: {
          slug_type: {
            slug,
            type: SETTING.ogTitle
          }
        },
        update: {
          value: title as string
        },
        create: {
          slug,
          type: SETTING.ogTitle,
          value: title as string
        }
      })
    }

    if (description) {
      await prisma.setting.upsert({
        where: {
          slug_type: {
            slug,
            type: SETTING.ogDescription
          }
        },
        update: {
          value: description as string
        },
        create: {
          slug,
          type: SETTING.ogDescription,
          value: description as string
        }
      })
    }

    if (image) {
      await prisma.setting.upsert({
        where: {
          slug_type: {
            slug,
            type: SETTING.ogImage
          }
        },
        update: {
          value: image as string
        },
        create: {
          slug,
          type: SETTING.ogImage,
          value: image as string
        }
      })
    }

    revalidateTag(`guest:${slug}`)
    revalidatePath(`/private/${slug}/settings`)
  }

  return <article className="flex flex-col gap-1 rounded-2xl bg-slate-700 p-3 text-zinc-200 shadow-md">
    <h1 className="text-lg">Configuración Open Graph</h1>
    <p className="text-sm text-zinc-400">Open graph es el protocolo que permite mostrar previsualizaciones de una web al pegar el enlace en aplicaciones como WhatsApp, Twitter o Facebook</p>

    <form action={handleSubmit}
      className="grid gap-2">
      <label htmlFor="title">Título</label>
      <input className="border bg-transparent p-1"
        defaultValue={settings['og:title']}
        type="text"
        id="title"
        name="title" />
      <label htmlFor="description">Descripción</label>
      <input className="border bg-transparent p-1"
        defaultValue={settings['og:description']}
        type="text"
        id="description"
        name="description" />
      <p className='text-sm text-zinc-400'>Puedes utilizar la palabra clave <span className='font-mono text-orange-500'>{'<'}GUEST{'>'}</span> dentro de este campo. Se verá substituido por los nombres de los invitados separados por comas en la previsualización del enlace</p>

      <ImageInput resourceName={`og_image_${slug}`}
        defaultValue={settings['og:image']}
        name="image" />

      <SubmitButton >Guardar</SubmitButton>
    </form>
  </article>
}
