export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 text-zinc-300 size-screen">
      <h1 className="font-dancing text-6xl font-semibold md:text-9xl">
        ¡Oopsie!
      </h1>
      <p className="max-w-80 text-center text-md">
        No te hemos encontrado entre la lista de invitados. ¿podrías revisar tu
        enlace?
      </p>
    </section>
  )
}
