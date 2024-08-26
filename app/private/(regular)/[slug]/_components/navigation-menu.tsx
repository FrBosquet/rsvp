import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'
import { BusIcon, Menu, NutOffIcon, Settings2Icon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const links = [
  { href: '', label: 'Invitados', Icon: UserIcon },
  { href: '/bus', label: 'Autobus', Icon: BusIcon },
  { href: '/allergies', label: 'Allergias', Icon: NutOffIcon },
  { href: '/settings', label: 'Configurar', Icon: Settings2Icon }
]

export function NavigationMenu() {
  const params = useParams<{ slug: string }>()
  const pathname = usePathname()

  const slug = params?.slug

  return (
    <>
      <ul className='hidden gap-4 md:flex'>
        {
          links.map(({ href, label, Icon }) => {
            const linkHref = `/private/${slug}${href}`
            const isSelected = pathname === linkHref

            return (
              <li key={`${href}${label}`}>
                <Link className='flex items-center gap-2 text-md uppercase transition hover:text-emerald-500 aria-disabled:pointer-events-none aria-disabled:opacity-25'
                  aria-disabled={isSelected}
                  href={linkHref}>
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
          <MenubarContent align='end'>
            {
              links.map(({ href, label, Icon }) => {
                const linkHref = `/private/${slug}${href}`
                const isSelected = pathname === linkHref

                return (
                  <MenubarItem key={`${href}${label}`}
                    asChild>
                    <Link className='flex items-center gap-4 text-md uppercase hover:text-emerald-500 aria-disabled:pointer-events-none aria-disabled:opacity-25'
                      href={linkHref}
                      aria-disabled={isSelected}
                    >
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
