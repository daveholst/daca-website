'use client'
import { useState } from 'react'
import fireBikesUte from '../public/img/fire-bikes-ute.jpeg'
import RoundPlay from '@/components/icons/RoundPlay'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'

export function VideoHero() {
  const [playVideo, setPlayVideo] = useState(false)

  return (
    <div className={'h-screen sticky bottom-0'}>
      <Image
        src={fireBikesUte}
        alt={'Men in desert around campfire'}
        className="object-cover"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        priority
      />
      <div className="h-screen flex space-y-5 items-center justify-center flex-col bg-black/50 relative z-10">
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
  )
}
