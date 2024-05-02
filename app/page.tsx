/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tVajKoYutsw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button'
import { Calendar, Camera, DollarSign, UsersIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <Image alt="Wedding Ceremony"
          className="size-full object-cover object-center"
          src="/party.webp"
          width={1920}
          height={1280}
          layout='cover' />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Tus invitaciones, sin esfuerzo</h1>
          <p className="max-w-xl text-lg">
            Gestione las invitaciones de su día especial con nuestra completa aplicación de reserva de bodas.
          </p>
          <Button variant="cta"
            asChild>
            <Link href="/private">
              Crea tu invitación ahora
            </Link>
          </Button>
        </div>
      </div>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <Calendar className="size-12 text-rose-500" />
              <h3 className="text-xl font-bold">Sencillo</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Genera tu invitación en minutos con nuestras plantillas personalizables.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <DollarSign className="size-12 text-rose-500" />
              <h3 className="text-xl font-bold">Económico</h3>
              <p className="text-gray-500 dark:text-gray-400">Tu evento para cualquier cantidad de invitados por solo 49,99€</p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              <UsersIcon className="size-12 text-rose-500" />
              <h3 className="text-xl font-bold">Conectado</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Gestiona tu lista de invitados y recibe confirmaciones de asistencia en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-16 dark:bg-gray-800 md:py-24">
        <div className="container mx-auto max-w-screen-lg px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-start gap-4">
              <div className="inline-block rounded-full bg-rose-500 px-4 py-2 text-sm text-white">Testimonios</div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lo que dicen nuestras parejas</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Escuche a parejas reales que han utilizado nuestra aplicación para planificar la boda de sus sueños.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                <blockquote className="text-lg font-medium leading-relaxed">
                  &quot;La aplicación de reserva de bodas hizo que planear nuestra boda fuera pan comido. Muy recomendable.&quot;
                </blockquote>
                <div className="mt-4 flex items-center gap-4">
                  <Image alt="Avatar"
                    className="size-12 rounded-full object-cover"
                    src="/crisyfran.webp"
                    width={200}
                    height={200}
                    layout='cover' />
                  <div>
                    <div className="font-medium">Cris y Fran</div>
                    <div className="text-gray-500 dark:text-gray-400">Casados en 2023</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                <blockquote className="text-lg font-medium leading-relaxed">
                  &quot;Esta aplicación cambia las reglas del juego de la organización de bodas. No podríamos haberlo hecho sin ella.&quot;
                </blockquote>
                <div className="mt-4 flex items-center gap-4">
                  <Image alt="Avatar"
                    className="size-12 rounded-full object-cover"
                    src="/janayodette.webp"
                    width={200}
                    height={200}
                    layout='cover' />
                  <div>
                    <div className="font-medium">Jan y Odette</div>
                    <div className="text-gray-500 dark:text-gray-400">Casadas en 2024</div>
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
              <span className="text-lg font-bold"><span className='text-rose-500'>RSVP</span> by DeVaux</span>
            </div>
            <nav className="flex flex-col items-center gap-4 md:flex-row">
              <Link className="hover:underline"
                href="#">
                Contacto
              </Link>
              <Link className="hover:underline"
                href="#">
                Política de privacidad
              </Link>
            </nav>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">© 2024 Cristina de Vaux. Todos los derechos reservados.</div>
        </div>
      </footer>
    </>
  )
}
