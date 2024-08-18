'use client'

import { type InputProps, Input as ShadcnInput } from '@/components/ui/input'
import { Delete, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

const generateUniqueId = () => {
  return 'id-' + Math.random().toString(36).slice(2, 9)
}

export const InputList = ({ label, name, type, ...props }: InputProps & { label: string }) => {
  const [ids, setIds] = useState<string[]>([generateUniqueId()])

  const handleDelete = (id: string) => {
    setIds(ids.filter((i) => i !== id))
  }

  const handleAdd = () => {
    setIds([...ids, generateUniqueId()])
  }

  return <label
    className='flex flex-col gap-2'>
    <h3 className='font-sans font-semibold uppercase'>{label}</h3>
    <ul className='contents'>

      {
        ids.map((id) => {
          return <li key={id}
            className='flex items-center gap-2'>
            <ShadcnInput type={type}
              name={name}
              id={id}
              {...props}
            />
            <Button className='aspect-square p-0'
              type="button"
              variant={'destructive'}
              onClick={() => { handleDelete(id) }}
            ><Delete size={14} /></Button>
          </li>
        })
      }
    </ul>
    <Button size='icon'
      type='button'
      onClick={handleAdd}
      className='self-end'><Plus /></Button>
  </label>
}
