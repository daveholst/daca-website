import Image from 'next/image'
import { getTour } from '@/src/database/getTour'

// import tourImage from '../../../public/img/golden-outback-911x1024.jpg'

interface Props {
  params: { 'tour-id': string }
}

export default async function Page({ params }: Props) {
  // get the tour from the db
  const tourId = params['tour-id']
  const [tour] = await getTour(tourId)

  return (
    <div className="bg-white">
      {/* Side-by-side (desktop) with info and tour hero image */}
      <div className="mx-auto flex flex-col xl:container lg:flex-row">
        <div className="m-4 flex flex-col items-center justify-center gap-y-4 text-center lg:w-1/2">
          <h2 className="my-2 font-sans2 text-5xl font-bold capitalize text-orange-500">
            {tour.title}
          </h2>
          <hr className="h-0.5 w-56 bg-orange-500" />
          <p className="font-sans3 text-xl font-extrabold">{`${tour.days} DAY TOUR`}</p>
          <p className="font-sans3 text-lg font-bold">{tour.hook}</p>
          {tour.copy.map((copy, i) => (
            <p className="font-sans3" key={i}>
              {copy}
            </p>
          ))}
          {/* TODO make this feed off the db & maybe link to the calender */}
          <p className="font-sans3 text-xl font-bold">SEE TOUR CALENDER</p>
        </div>
        <div className="relative block h-[450px] lg:h-auto lg:w-1/2">
          <Image
            className="object-cover"
            // TODO This works, but feels a bit suss
            src={`/img/tours/${tourId}-hero.jpg`}
            alt="bikes riding through desert"
            fill
          />
        </div>
      </div>
      {/* Itinerary  */}
      <div className="bg-amber-500  ">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-8 p-4 text-center">
          <h2 className="my-2 font-sans2 text-5xl font-bold capitalize text-white">
            ITINERARY
          </h2>
          <hr className="h-0.5 w-56 bg-white" />
          {tour.itinerary.map((itin, i) => (
            <div key={i}>
              <h3 className="mb-4 font-sans3 text-2xl font-extrabold">
                <span className="text-white">{`DAY ${itin.day}: `}</span>
                <span>{itin.title?.toUpperCase()}</span>
              </h3>
              <div className="flex flex-col gap-y-4 font-sans3">
                {itin.description.map((copy, i) => (
                  <p key={i}>{copy}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pricing Options */}
    </div>
  )
}
