import { SettingsPageContent } from './content'

export default async function SettingsPage({
  params
}: {
  params: { slug: string }
}) {
  return <SettingsPageContent />
}
