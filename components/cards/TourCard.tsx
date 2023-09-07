import Image from 'next/image'
import { ToursInfo } from '@/src/schema/types'

// TODO how this going to work dynamically?
import tourImage from '../../public/img/golden-outback-911x1024.jpg'

export interface TourCardProps {
  tour: ToursInfo
}

export function TourCard({ tour }: TourCardProps) {
  const cheapestPrice = Math.min(
    ...tour.pricingOptions.map((option) => option.price)
  )

  return (
    <div className="bg-black flex-col flex ">
      {/* TODO drive this off a prop... tour.id naming convention */}
      <Image
        src={tourImage}
        alt="Man standing in Pilbara with dirtbike"
        layout="fixed"
        width={640}
        height={720}
      />
      <div>
        <div className="flex flex-col gap-2 m-4">
          <h3 className="font-sans2 text-3xl text-orange-500 uppercase text-center">
            {tour.title}
          </h3>
          <p className="text-white font-thin text-center font-sans3 ">
            {tour.hook}
          </p>
          <p className="font-sans3 font-bold uppercase text-white text-center">
            {`${tour.loop ? 'Loop' : 'One-way'} / ${tour.distance} / ${
              tour.days
            } Days`}
          </p>
          <p className="text-white text-center text-1xl font-sans3 font-thin">
            {`From $${cheapestPrice}`}
          </p>
          <div className="flex flex-col md:flex-row gap-3 ">
            <button className="border-2 border-orange-300 text-orange-300 h-12 grow">
              LEARN MORE
            </button>
            <button className="border-2 border-orange-500 text-orange-400 h-12 grow max-w-['6rem']">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
