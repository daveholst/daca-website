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
      <div className="xl:container md:flex-row mx-auto flex flex-col">
        <div className="md:w-1/2 text-center m-4 flex flex-col items-center justify-center gap-y-4">
          <h2 className="capitalize font-sans2 my-2 text-5xl font-bold text-orange-500">
            {tour.title}
          </h2>
          <hr className="w-56 h-0.5 bg-orange-500" />
          <p className="font-sans3 font-extrabold text-xl">{`${tour.days} DAY TOUR`}</p>
          <p className="font-sans3 font-bold text-lg">{tour.hook}</p>
          {tour.copy.map((copy, i) => (
            <p className="font-sans3" key={i}>
              {copy}
            </p>
          ))}
          {/* TODO make this feed off the db & maybe link to the calender */}
          <p className="font-sans3 font-bold text-xl">SEE TOUR CALENDER</p>
        </div>
        <div className="block md:w-1/2">
          <Image
            className="h-full object-cover"
            // TODO This works, but feels a bit suss
            src={require(`../../../public/img/${tourId}-911x1024.jpg`)}
            alt="bikes riding through desert"
          />
        </div>
      </div>
      {/* Itinerary  */}
      <div className="bg-amber-500  ">
        <div className="mx-auto p-4 max-w-3xl text-center flex flex-col gap-y-8 items-center">
          <h2 className="capitalize font-sans2 my-2 text-5xl font-bold text-white">
            ITINERARY
          </h2>
          <hr className="w-56 h-0.5 bg-white" />
          {tour.itinerary.map((itin, i) => (
            <div key={i}>
              <h3 className="mb-4 font-sans3 text-xl font-extrabold">
                <span className="text-white">{`DAY ${itin.day}: `}</span>
                <span>{itin.title?.toUpperCase()}</span>
              </h3>
              <div className="flex flex-col gap-y-4 ">
                {itin.description.map((copy, i) => (
                  <p className="font-sans3" key={i}>
                    {copy}
                  </p>
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
