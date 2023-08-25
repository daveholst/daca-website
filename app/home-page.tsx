'use client'

import RoundPlay from '@/components/icons/RoundPlay'
import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import fireBikesUte from '../public/img/fire-bikes-ute.jpeg'
// TODO this needs to programatic
import goldenOutback from '../public/img/golden-outback-911x1024.jpg'
import Image from 'next/image'
import Link from 'next/link'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage() {
  const [playVideo, setPlayVideo] = useState(false)
  // console.log(test)
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
      {/* Orange section with all the cards */}
      <div className="bg-orange-400 flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 container max-w-3xl center my-6">
          {/* Card Start */}
          <div className="bg-black flex-col flex ">
            <Image
              src="/img/golden-outback-911x1024.jpg"
              alt="Man standing in pilbra with dirtbike"
              width={900}
              height={900}
            />
            <div>
              <div className="flex flex-col gap-2 m-4">
                <h3 className="font-sans2 text-3xl text-orange-500 uppercase text-center">
                  Golden Outback
                </h3>
                <p className="text-white font-thin text-center font-sans3 ">
                  {
                    'DACA tours “Golden Outback” adventure is extremely remote, and accesses parts of Australia rarely seen or driven.'
                  }
                </p>
                <p className="font-sans3 font-bold uppercase text-white text-center">
                  Loop / 1000 KM / 5 Days
                </p>
                <p className="text-white text-center text-1xl font-sans3 font-thin">
                  From $3850
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
          {/* Card Start */}
          <div className="bg-black flex-col flex ">
            <Image
              src="/img/golden-outback-911x1024.jpg"
              alt="Man standing in pilbra with dirtbike"
              width={900}
              height={900}
            />
            <div>
              <div className="flex flex-col gap-2 m-4">
                <h3 className="font-sans2 text-3xl text-orange-500 uppercase text-center">
                  Golden Outback
                </h3>
                <p className="text-white font-thin text-center font-sans3 ">
                  {
                    'DACA tours “Golden Outback” adventure is extremely remote, and accesses parts of Australia rarely seen or driven.'
                  }
                </p>
                <p className="font-sans3 font-bold uppercase text-white text-center">
                  Loop / 1000 KM / 5 Days
                </p>
                <p className="text-white text-center text-1xl font-sans3 font-thin">
                  From $3850
                </p>
                <div className="flex flex-col md:flex-row gap-3 ">
                  <button className="border-2 border-orange-500 text-orange-400 h-12 grow">
                    LEARN MORE
                  </button>
                  <button className="border-2 border-orange-500 text-orange-400 h-12 grow max-w-['6rem']">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
