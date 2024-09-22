import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { Calendar, Camera, DollarSign, UsersIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getTranslator } from '@/lib/translator'

export default function HomePage() {
  const t = getTranslator('es')
  const price = '49.95'

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          alt="Wedding Ceremony"
          className="size-full object-cover object-center"
          height={1280}
          src="/party.webp"
          width={1920}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('home.title')}
          </h1>
          <p className="max-w-xl text-lg">{t('home.subtitle')}</p>
          <SignedIn>
            <Button asChild variant="cta">
              <Link href="/private">{t('home.cta.unsigned')}</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild variant="cta">
              <SignInButton mode="modal">{t('home.cta.signed')}</SignInButton>
            </Button>
          </SignedOut>
        </div>
      </div>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <Calendar className="size-12 text-rose-500" />
              <h3 className="text-xl font-bold">{t('home.features.simple')}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('home.features.simple.description')}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <DollarSign className="size-12 text-rose-500" />
              <h3 className="text-xl font-bold">
                {t('home.features.affordable')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('home.features.affordable.description', { price })}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <UsersIcon className="size-12 text-rose-500" />
              <h3 className="text-xl font-bold">
                {t('home.features.connected')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('home.features.connected.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-16 dark:bg-gray-800 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-start gap-4">
              <div className="inline-block rounded-full bg-rose-500 px-4 py-2 text-sm text-white">
                {t('home.testimonials')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('home.testimonials.title')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {t('home.testimonials.subtitle')}
              </p>
            </div>
            <div className="grid gap-6">
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                <blockquote className="text-lg font-medium leading-relaxed">
                  &quot;{t('home.testimonials.first.content')}&quot;
                </blockquote>
                <div className="mt-4 flex items-center gap-4">
                  <Image
                    alt="Avatar"
                    className="size-12 rounded-full object-cover"
                    height={200}
                    src="/crisyfran.webp"
                    width={200}
                  />
                  <div>
                    <div className="font-medium">
                      {t('home.testimonials.first.names')}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {t('home.testimonials.first.date')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                <blockquote className="text-lg font-medium leading-relaxed">
                  &quot;{t('home.testimonials.second.content')}&quot;
                </blockquote>
                <div className="mt-4 flex items-center gap-4">
                  <Image
                    alt="Avatar"
                    className="size-12 rounded-full object-cover"
                    height={200}
                    src="/janayodette.webp"
                    width={200}
                  />
                  <div>
                    <div className="font-medium">
                      {t('home.testimonials.second.names')}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {t('home.testimonials.second.date')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 py-8 text-white">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-gray-600">
              <Camera className="size-6 text-rose-500" />
              <span className="text-lg font-bold">
                <span className="text-rose-500">RSVP</span> by DeVaux
              </span>
            </div>
            <nav className="flex flex-col items-center gap-4 md:flex-row">
              <Link className="hover:underline" href="#">
                {t('footer.contact')}
              </Link>
              <Link className="hover:underline" href="#">
                {t('footer.policy')}
              </Link>
            </nav>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            {t('footer.disclaimer')}
          </div>
        </div>
      </footer>
    </>
  )
}
