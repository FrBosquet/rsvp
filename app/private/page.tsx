import { UserButton } from "@clerk/nextjs";

export default function PrivatePage() {
  return <section className="p-4">
    <menu className="w-full flex rounded-xl bg-zinc-900 p-2 gap-2 text-zinc-200 items-center">
      <UserButton />
      <h1 className="uppercase">Tu evento</h1>
    </menu>
  </section>
}