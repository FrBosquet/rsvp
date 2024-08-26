/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  name: string
  resourceName: string
  defaultValue?: string
}

export const ImageInput = ({
  resourceName,
  name,
  defaultValue
}: Props) => {
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

  return <>
    <label htmlFor="file"
      className="flex cursor-pointer flex-col gap-2">
      <h3>Imagen</h3>
      <img src={url ?? '/defimage.svg'}
        className={twMerge('size-72 rounded-xl object-cover object-center', loading ? ' animate-pulse' : '')}
        alt={resourceName} />
    </label>
    <input type="file"
      className='hidden'
      onChange={handleChange}
      accept="image/*"
      id="file"
    />
    {url && <input type='text'
      name={name}
      hidden
      value={url} />}
  </>
}
