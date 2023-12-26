import { TourInfo } from '@/src/schema/types'
import { TourCard } from '@/components/cards/TourCard'
import { VideoHero } from '@/components/VideoHero'
import { getAllToursInfo } from '@/src/database/get-all-tours-info'
import { Suspense } from 'react'

// interface HomePageProps {
//   //TODO I have the types, just need to validate and tidy up
//   tours: ToursInfo[]
// }

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const tours = await getAllToursInfo()
  // console.log(tours)
  return (
    <>
      {/* Video Intro & CTA */}
      <VideoHero />
      {/* Orange section with the tour cards */}
      <div className="flex w-full justify-center bg-orange-400">
        <div className="center container my-6 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* TODO, I don't think this is actually doing anything :kek: */}
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
