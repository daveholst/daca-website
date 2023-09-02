import HomePage from './home-page'
import { getToursInfo } from '@/src/database/getToursInfo'

export default async function Page() {
  const tours = await getToursInfo()
  return <HomePage tours={tours} />
}
