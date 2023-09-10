import Image from 'next/image'
import { ToursInfo } from '@/src/schema/types'

// TODO how this going to work dynamically?
import tourImage from '../../public/img/golden-outback-911x1024.jpg'

export interface TourCardProps {
  tour: ToursInfo
}

export function TourCard({ tour }: TourCardProps) {
  const cheapestPrice = Math.min(
    ...tour.pricingOptions.map((option) => option.price),
  )

  return (
    <div className="flex flex-col bg-black">
      {/* TODO drive this off a prop... tour.id naming convention */}
      <Image
        // src={tourImage}
        src={`/img/tours/${tour.id}-hero.jpg`}
        alt="Man standing in Pilbara with dirtbike"
        layout="fixed"
        width={640}
        height={720}
      />
      <div className="m-4 flex grow flex-col justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-center font-sans2 text-3xl uppercase text-orange-500">
            {tour.title}
          </h3>
          <p className="text-center font-sans3 font-thin text-white ">
            {tour.hook}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-center font-sans3 font-bold uppercase text-white">
            {`${tour.loop ? 'Loop' : 'One-way'} / ${tour.distance}KM / ${
              tour.days
            } Days`}
          </p>
          <p className="text-1xl text-center font-sans3 font-thin text-white">
            {`From $${cheapestPrice}`}
          </p>
          <div className="flex flex-col gap-3 md:flex-row ">
            <button className="h-12 grow border-2 border-orange-300 text-orange-300">
              LEARN MORE
            </button>
            <button className="h-12 max-w-['6rem'] grow border-2 border-orange-500 text-orange-400">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
