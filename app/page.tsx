import { TourCard } from '@/src/components/cards/TourCard'
import { VideoHero } from '@/src/components/VideoHero'
import { getAllToursInfo } from '@/src/database/tours/get-all-tours-info'
import { Suspense } from 'react'

// interface HomePageProps {
//   //TODO I have the types, just need to validate and tidy up
//   tours: ToursInfo[]
// }

/**
 * ! What I think is going on with 'force-dynamic'
 * For some reason, when using the the dynamo client, It always tries to do a static build
 * I have to add this to force this route to be SSR... seems less than ideal...
 * I think this is due to the dynamo calls use fetch under the hood which next is trying to intercept
 * next tries to cache them. For some reason It is determining that the route is static, doing a 'permanent
 * cache' in the form of a static render. It will be worth turning this off at some point to se what is happening.
 *
 * The other option is to force the getToursInfo into a server action.
 */
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
