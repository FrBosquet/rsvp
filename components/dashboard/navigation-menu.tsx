import {
  BusIcon,
  LucideIcon,
  Menu,
  NutOffIcon,
  Settings2Icon,
  UserIcon
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'
import { TranslationKey } from '@/lib/translator'

import { useIntl } from '../providers/translator'

type Links = {
  href: string
  key: TranslationKey
  Icon: LucideIcon
}

const links: Links[] = [
  { href: '', key: 'event.navigation.guests', Icon: UserIcon },
  { href: '/bus', key: 'event.navigation.suttle', Icon: BusIcon },
  { href: '/allergies', key: 'event.navigation.allergies', Icon: NutOffIcon },
  { href: '/settings', key: 'event.navigation.settings', Icon: Settings2Icon }
]

export function NavigationMenu() {
  const { t } = useIntl()
  const params = useParams<{ slug: string }>()
  const pathname = usePathname()

  const slug = params?.slug

  return (
    <>
      <ul className="hidden gap-4 md:flex">
        {links.map(({ href, key, Icon }) => {
          const linkHref = `/private/${slug}${href}`
          const isSelected = pathname === linkHref

          return (
            <li key={`${href}${key}`}>
              <Link
                aria-disabled={isSelected}
                className="flex items-center gap-2 text-md uppercase transition hover:text-emerald-500 aria-disabled:pointer-events-none aria-disabled:opacity-25"
                href={linkHref}
              >
                <Icon size={16} />
                {t(key)}
              </Link>
            </li>
          )
        })}
      </ul>

      <Menubar className="md:hidden">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <Menu size={18} />
          </MenubarTrigger>
          <MenubarContent align="end">
            {links.map(({ href, key, Icon }) => {
              const linkHref = `/private/${slug}${href}`
              const isSelected = pathname === linkHref

              return (
                <MenubarItem key={`${href}${key}`} asChild>
                  <Link
                    aria-disabled={isSelected}
                    className="flex items-center gap-4 text-md uppercase hover:text-emerald-500 aria-disabled:pointer-events-none aria-disabled:opacity-25"
                    href={linkHref}
                  >
                    <Icon size={18} />
                    {t(key)}
                  </Link>
                </MenubarItem>
              )
            })}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  )
}
