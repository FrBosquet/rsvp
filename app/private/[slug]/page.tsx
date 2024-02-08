import { Manager } from './manager'

interface Route {
  params: {
    slug: string
  }
}

export default async function EventDashboardPage({ params }: Route) {
  return <Manager />
}
