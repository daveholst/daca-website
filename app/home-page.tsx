import { ToursInfo } from '@/src/schema/types'
import { TourCard } from '@/components/cards/TourCard'
import { VideoHero } from '@/components/VideoHero'
import { getToursInfo } from '@/src/database/getToursInfo'
import { Suspense } from 'react'

// interface HomePageProps {
//   //TODO I have the types, just need to validate and tidy up
//   tours: ToursInfo[]
// }

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const tours = await getToursInfo()
  // console.log(tours)
  return (
    <>
      {/* Video Intro & CTA */}
      <VideoHero />
      {/* Orange section with the tour cards */}
      <div className="bg-orange-400 flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 container max-w-3xl center my-6">
          <Suspense fallback={<span>Loading...</span>}>
            {tours.map((t) => (
              <TourCard tour={t} key={t.id} />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  )
}
