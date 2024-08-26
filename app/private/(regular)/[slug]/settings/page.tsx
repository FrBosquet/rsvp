import { OgManager } from './_components/og-manager'

export default async function SettingsPage({ params }: { params: { slug: string } }) {
  return <OgManager slug={params.slug} />
}
