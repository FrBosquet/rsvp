'use client'

import {
  BusIcon,
  ChevronsRight,
  LucideIcon,
  NutOffIcon,
  Settings2Icon,
  UserIcon
} from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import np from 'nprogress'
import { useEffect, useState } from 'react'

import { useIntl } from '@/components/providers/translator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TranslationKey } from '@/lib/translator'
import { cn } from '@/lib/utils'

type Section = {
  value: string
  href: string
  key: TranslationKey
  Icon: LucideIcon
}

const sections: Section[] = [
  { value: 'guest', href: '', key: 'event.navigation.guests', Icon: UserIcon },
  { value: 'bus', href: '/bus', key: 'event.navigation.suttle', Icon: BusIcon },
  {
    value: 'allergies',
    href: '/allergies',
    key: 'event.navigation.allergies',
    Icon: NutOffIcon
  },
  {
    value: 'settings',
    href: '/settings',
    key: 'event.navigation.settings',
    Icon: Settings2Icon
  }
]

export const EventSidebar = () => {
  const [open, setOpen] = useState(false)
  const { t } = useIntl()
  const { push } = useRouter()
  const pathname = usePathname()
  const slug = useParams<{ slug: string }>().slug

  const buildHref = (href: string) => `/private/${slug}${href}`
  const handleValueChange = (value: string) => {
    const section = sections.find((section) => section.value === value)
    if (!section) return

    const nextPath = buildHref(section.href)
    if (nextPath === pathname) return

    np.start()
    push(buildHref(section.href))
  }

  useEffect(() => {
    // Use this to simulate a loading state
    np.done()
  }, [pathname])

  return (
    <>
      <section
        className={cn(
          // base styles
          'relative mr-4 w-56 border transition-all bg-white z-50 overflow-hidden max-lg:shadow-xl',
          // mobile styles
          'max-lg:fixed max-lg:left-0 max-sm:w-screen max-lg:h-full',
          // closed styles for mobile
          !open && 'max-lg:mr-0 max-lg:w-0 max-sm:w-0'
        )}
      >
        <div className="flex h-full flex-col max-lg:absolute max-lg:inset-0 ">
          <Accordion
            collapsible
            type="single"
            onValueChange={handleValueChange}
          >
            {sections.map(({ value, key, Icon, href }) => (
              <AccordionItem
                key={key}
                className={cn(buildHref(href) === pathname && 'bg-gray-200')}
                value={value}
              >
                <AccordionTrigger className="px-3">
                  <div className="flex items-center gap-2">
                    <Icon size={16} /> {t(key)}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col p-3">
                  {t(key)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Button
        className={cn(
          'fixed bottom-2 left-2 transition-all z-50 aspect-square size-12 rounded-full shadow-lg lg:hidden',
          open && 'left-0 bottom-0 rounded-none w-56 max-sm:w-screen'
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronsRight
          className={cn('transition-all', open && 'rotate-180')}
          size={16}
        />
      </Button>
    </>
  )
}
