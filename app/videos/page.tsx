import React from 'react'
import { Config } from 'sst/node/config'

interface Thumbnail {
  url: string
  width: number
  height: number
}

interface Thumbnails {
  default: Thumbnail
  medium: Thumbnail
  high: Thumbnail
}

interface VideoItem {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
  }
}

type YouTubeApiResponse = {
  items: VideoItem[]
}

const fetchVideos = async () => {
  const key = Config.YOUTUBE_API_KEY
  const channelId = 'UCXOI6O26IoRxDdrQlC5lR-Q'
  const maxResults = 25
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&key=${key}&channelId=${channelId}`,
    )
    const data: YouTubeApiResponse = await response.json()

    return (data.items = data.items.filter(
      (item) => item.id.kind === 'youtube#video',
    ))
  } catch (error) {
    console.error(error)

    return []
  }
}

export const dynamic = 'force-dynamic'

export default async function Videos() {
  const videos = await fetchVideos()

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <h2>{video.snippet.title}</h2>
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  )
}
