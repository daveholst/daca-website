'use client'

import RoundPlay from '@/components/icons/RoundPlay'
import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage() {
  const [playVideo, setPlayVideo] = useState(false)
  // console.log(test)
  return (
    <>
      {/* Video Intro & CTA */}
      <div className="h-screen bg-cover bg-center bg-[url('/img/fire-bikes-ute.jpeg')] ">
        <div className="h-screen flex items-center justify-center flex-col bg-black/50">
          <h2 className="text-white font-sans2 text-5xl font-bold ">
            RAW ADVENTURE
          </h2>
          <p className=" font-sans3 text-orange-100 mt-3 text-3xl font-extralight text-center lg:w-1/3">
            AUSTRALIA’S MOST REMOTE EPIC OFF-ROAD TOURS.
          </p>
          {!playVideo && (
            <button onClick={() => setPlayVideo(true)}>
              <RoundPlay />
              <span className="font-sans3 text-white font-bold">
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
                url="https://www.youtube.com/watch?v=38LLPkpbOXs"
                config={{
                  playerVars: { autoplay: 1, controls: 0, modestbranding: 1 },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
