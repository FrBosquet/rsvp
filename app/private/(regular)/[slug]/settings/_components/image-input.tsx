/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  name: string
  resourceName: string
  defaultValue?: string
}

export const ImageInput = ({ resourceName, name, defaultValue }: Props) => {
  const [url, setUrl] = React.useState<string | null>(defaultValue ?? null)
  const [loading, setLoading] = React.useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setLoading(true)
    const file = e.target.files?.[0]
    if (file) {
      const response = await fetch(`/api/files?filename=${resourceName}`, {
        method: 'POST',
        body: file
      })

      const newBlob = await response.json()
      setUrl(newBlob.url as string)
    }

    setLoading(false)
  }

  return (
    <>
      <label className="flex cursor-pointer flex-col gap-2" htmlFor="file">
        <h3>Imagen</h3>
        <img
          alt={resourceName}
          className={twMerge(
            'size-72 rounded-xl object-cover object-center',
            loading ? ' animate-pulse' : ''
          )}
          src={url ?? '/defimage.svg'}
        />
      </label>
      <input
        accept="image/*"
        className="hidden"
        id="file"
        type="file"
        onChange={handleChange}
      />
      {url && <input hidden name={name} type="text" value={url} />}
    </>
  )
}
