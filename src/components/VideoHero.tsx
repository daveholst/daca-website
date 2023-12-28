'use client'
import { useState } from 'react'
import fireBikesUte from '../public/img/fire-bikes-ute.jpg'
import RoundPlay from '@/src/components/icons/RoundPlay'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'

export function VideoHero() {
  const [playVideo, setPlayVideo] = useState(false)

  return (
    <div className={'sticky bottom-0 h-screen'}>
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
      <div className="relative z-10 flex h-screen flex-col items-center justify-center space-y-5 bg-black/50">
        <h2 className="text-center font-sans2 text-5xl font-bold text-white">
          RAW ADVENTURE
        </h2>
        <p className="text-center font-sans3 text-3xl font-extralight text-orange-100 lg:w-1/3">
          AUSTRALIA’S MOST REMOTE EPIC OFF-ROAD TOURS.
        </p>
        {!playVideo && (
          <button
            className="flex flex-col space-y-3"
            onClick={() => setPlayVideo(true)}
          >
            <RoundPlay />
            <span className="font-sans3 font-bold text-white ">
              WATCH VIDEO
            </span>
          </button>
        )}
        {playVideo && (
          //TODO Maybe just take this out and host it on a CDN so I can get full control and kill the branding
          <div className="aspect-video w-full xl:container">
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
