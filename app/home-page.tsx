'use client'

import RoundPlay from '@/components/icons/RoundPlay'
import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import fireBikesUte from '../public/img/fire-bikes-ute.jpeg'
// TODO this needs to programatic
import goldenOutback from '../public/img/golden-outback-911x1024.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { ToursInfo } from '@/src/schema/types'
import { TourCard } from '@/components/cards/TourCard'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
interface HomePageProps {
  //TODO I have the types, just need to validate and tidy up
  tours: ToursInfo[]
}

export default function HomePage({ tours }: HomePageProps) {
  const [playVideo, setPlayVideo] = useState(false)
  console.log(tours)
  return (
    <>
      {/* Video Intro & CTA */}
      {/* TODO: fix this to work in both local and prod :thinking: conditional with const isProd = process.env.NODE_ENV === 'production'?*/}
      <div
        style={{
          backgroundImage: `url(${fireBikesUte.src})`,
        }}
        className={'h-screen bg-cover bg-center'}
      >
        <div className="h-screen flex space-y-5 items-center justify-center flex-col bg-black/50">
          <h2 className="text-white font-sans2 text-5xl font-bold text-center">
            RAW ADVENTURE
          </h2>
          <p className="font-sans3 text-orange-100 text-3xl font-extralight text-center lg:w-1/3">
            AUSTRALIA’S MOST REMOTE EPIC OFF-ROAD TOURS.
          </p>
          {!playVideo && (
            <button
              className="flex flex-col space-y-3"
              onClick={() => setPlayVideo(true)}
            >
              <RoundPlay />
              <span className="font-sans3 text-white font-bold ">
                WATCH VIDEO
              </span>
            </button>
          )}
          {playVideo && (
            //TODO Maybe just take this out and host it on a CDN so I can get full control and kill the branding
            <div className="xl:container aspect-video w-full">
              <ReactPlayer
                width={'100%'}
                height={'100%'}
                // playing
                url="https://www.youtube.com/watch?v=-IoGj1orFVc"
                config={{
                  playerVars: { autoplay: 1, controls: 0, modestbranding: 1 },
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Orange section with the tour cards */}
      <div className="bg-orange-400 flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 container max-w-3xl center my-6">
          {tours.map((t) => (
            <TourCard tour={t} key={t.id} />
          ))}
        </div>
      </div>
    </>
  )
}
