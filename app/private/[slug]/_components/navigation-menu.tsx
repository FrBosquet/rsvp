import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'
import { BusIcon, Menu, NutOffIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const links = [
  { href: '', label: 'Invitados', Icon: UserIcon },
  { href: '/bus', label: 'Autobus', Icon: BusIcon },
  { href: '/allergies', label: 'Allergias', Icon: NutOffIcon }
]

export function NavigationMenu() {
  const params = useParams<{ slug: string }>()

  const slug = params?.slug

  return (
    <>
      <ul className='hidden gap-4 md:flex'>
        {
          links.map(({ href, label, Icon }) => {
            return (
              <li key={`${href}${label}`}>
                <Link className='flex items-center gap-2 text-md uppercase hover:text-emerald-500'
                  href={`/private/${slug}/${href}`}>
                  <Icon size={16} />
                  {
                    label
                  }</Link>
              </li>
            )
          })
        }
      </ul>
      <Menubar className='md:hidden'>
        <MenubarMenu>
          <MenubarTrigger className='cursor-pointer'><Menu size={18} /></MenubarTrigger>
          <MenubarContent>
            {
              links.map(({ href, label, Icon }) => {
                return (
                  <MenubarItem key={`${href}${label}`}
                    asChild>
                    <Link className='flex items-center gap-4 text-md uppercase hover:text-emerald-500'
                      href={`/private/${slug}/${href}`}>
                      <Icon size={18} />
                      {
                        label
                      }</Link>
                  </MenubarItem>
                )
              })
            }
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  )
}
