import { revalidatePath, revalidateTag } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { SETTING } from '@/types'

import { FormTitle } from '../../form/title'
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

  const settings = rawSettings.reduce<Record<string, string>>(
    (acc, setting) => {
      acc[setting.type] = setting.value
      return acc
    },
    {}
  )

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const title = formData.get('title')
    const description = formData.get('description')
    const descriptionSingle = formData.get('descriptionSingle')
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

    if (descriptionSingle) {
      await prisma.setting.upsert({
        where: {
          slug_type: {
            slug,
            type: SETTING.ogDescriptionSingle
          }
        },
        update: {
          value: descriptionSingle as string
        },
        create: {
          slug,
          type: SETTING.ogDescriptionSingle,
          value: descriptionSingle as string
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

  return (
    <article className="flex flex-col gap-1">
      <FormTitle>Configuración Open Graph</FormTitle>
      <p className="text-sm text-zinc-400">
        Open graph es el protocolo que permite mostrar previsualizaciones de una
        web al pegar el enlace en aplicaciones como WhatsApp, Twitter o Facebook
      </p>

      <form action={handleSubmit} className="grid gap-2">
        <label htmlFor="title">Título</label>
        <input
          className="border bg-transparent p-1"
          defaultValue={settings['og:title']}
          id="title"
          name="title"
          type="text"
        />
        <label htmlFor="description">Descripción (plural)</label>
        <input
          className="border bg-transparent p-1"
          defaultValue={settings['og:description']}
          id="description"
          name="description"
          type="text"
        />
        <label htmlFor="descriptionSingle">Descripción (singular)</label>
        <input
          className="border bg-transparent p-1"
          defaultValue={settings[SETTING.ogDescriptionSingle]}
          id="descriptionSingle"
          name="descriptionSingle"
          type="text"
        />
        <p className="text-sm text-zinc-400">
          Puedes utilizar la palabra clave{' '}
          <span className="font-mono text-orange-500">
            {'<'}GUEST{'>'}
          </span>{' '}
          dentro de este campo. Se verá substituido por los nombres de los
          invitados separados por comas en la previsualización del enlace
        </p>

        <ImageInput
          defaultValue={settings['og:image']}
          name="image"
          resourceName={`og_image_${slug}`}
        />

        <SubmitButton>Guardar</SubmitButton>
      </form>
    </article>
  )
}
