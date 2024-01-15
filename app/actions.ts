'use server'

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function createEvent(prevState: { error: string }, formData: FormData) {
  'use server'

  const name = formData.get('name')
  const slug = formData.get('slug')


  try {
    await prisma.event.create({
      data: {
        name: name as string,
        slug: slug as string,
      },
    })
  } catch (e: any) {
    return {
      error: e.message
    }
  }

  redirect('/private')
}

export async function deleteEvent(formData: FormData) {
  'use server'

  const id = formData.get('id') as string

  await prisma.event.delete({
    where: {
      id
    }
  })


  redirect('/private')
}