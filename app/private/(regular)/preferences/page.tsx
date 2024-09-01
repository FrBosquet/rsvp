import { Select } from "@/components/form/select";
import { Languages } from "lucide-react";

export default async function PrivatePage() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-sans text-xl uppercase flex items-center gap-2 border-b-2"><Languages /> Idioma</h2>

      <Select values={[{
        value: 'en',
        label: 'English'
      }, {
        value: 'es',
        label: 'Español'
      }]} />

    </section>
  )
}
