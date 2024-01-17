'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { type User } from '@prisma/client'
import { Copy, Search } from 'lucide-react'

const UserSelector = ({ users }: { users: User[] }) => {
  return <Select>
    <SelectTrigger className="max-w-32">
      Invitado de
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectContent>
  </Select>
}

enum STATE {
  INVITED,
  ACCEPTED,
  REJECTED
}

const GuestRow = ({ host, guest }: { host: User, guest: { names: string[], slug: string, invited: number, isFamily: boolean, state: STATE, isContacted: boolean, accepted?: number } }) => {
  return <div className='flex w-full items-center gap-4'>
    <div className="flex aspect-square w-8 items-center justify-center gap-2 rounded-full bg-pink-400">
      {host.name.split(' ').map((name) => name[0])}
    </div>
    <div className="flex flex-1 flex-col">
      <p className="text-base font-semibold">{guest.names.join(' ')}</p>
      <p className="font-mono text-sm text-yellow-600">/{guest.slug}</p>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <p className="">{guest.accepted ?? '...'}/{guest.invited}</p>
      <Copy size={16} />
      <input type='checkbox' checked={guest.isContacted} />
    </div>

  </div>
}

export const Manager = () => {
  return (
    <>
      <article className="flex w-full items-center gap-2 rounded-2xl bg-slate-700 p-2 text-zinc-200 shadow-md">
        <UserSelector users={[]} />
        <Search />
        <input className="bg-transparent" placeholder="buscar..." />
        <p className='flex-1 text-sm font-semibold uppercase'>4 invitaciones / 9 invitados</p>
        <div className='flex gap-1'>
          <button className="aspect-square w-6 rounded-md bg-yellow-500 text-sm font-semibold text-slate-900 hover:bg-yellow-300">9</button>
          <button className="aspect-square w-6 rounded-md bg-green-500 text-sm font-semibold text-slate-900 hover:bg-green-300">0</button>
          <button className="aspect-square w-6 rounded-md bg-red-500 text-sm font-semibold text-slate-900 hover:bg-red-300">0</button>
        </div>
      </article>
      <article className="w-full flex-1 rounded-2xl bg-gradient-to-b from-olive-900 to-olive-950/10 p-4 text-slate-200">
        <GuestRow host={{ name: 'Fran Bosquet', id: 'a' } as any} guest={{ names: ['Juan', 'Tere'], slug: 'juanytere', invited: 2, isFamily: false, state: STATE.INVITED, isContacted: false, accepted: 2 }} />
      </article>
    </>
  )
}
