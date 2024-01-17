import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { type User } from '@prisma/client'
import { Search } from 'lucide-react'

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

export const Manager = () => {
  return (
    <>
      <article className="flex w-full gap-2 rounded-2xl bg-slate-700 p-2 text-zinc-200 shadow-md">
        <Search />
        <input className="bg-transparent" placeholder="buscar..." />
        <UserSelector users={[]} />
      </article>
    </>
  )
}
