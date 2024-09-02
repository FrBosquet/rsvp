'use client'

import { useState } from 'react'

import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Props = {
  name: string
  className?: string
  values: { value: string; label: string }[]
  defaultValue?: string
  label?: string
  isDisabled?: boolean
}

export const Select = ({
  values,
  className,
  defaultValue,
  name,
  isDisabled
}: Props) => {
  const [value, setValue] = useState<string | undefined>(defaultValue)

  return (
    <>
      <input name={name} type="hidden" value={value} />
      <SelectRoot
        defaultValue={defaultValue}
        disabled={isDisabled}
        onValueChange={(newValue) => {
          setValue(newValue)
        }}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder="Elige una opción" />
        </SelectTrigger>
        <SelectContent>
          {values.map((value) => {
            return (
              <SelectItem key={value.value} value={value.value}>
                {value.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </SelectRoot>
    </>
  )
}
