import NavBar from '@/src/components/NavBar'
import './globals.css'
import { Metadata } from 'next'
import { Quicksand, Bungee, Montserrat } from 'next/font/google'
import { getAllToursInfo } from '@/src/database/tours/get-all-tours-info'

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
})

const bungee = Bungee({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-bungee',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

const getActiveTourLinks = async () => {
  const tours = await getAllToursInfo()
  return [
    {
      name: 'Tour Calender',
      href: '/tours',
    },
    ...tours
      .filter((t) => t.currentlyOffered)
      .map((t) => ({ name: t.title, href: `/tours/${t.id}` })),
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tourLinks = await getActiveTourLinks()

  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${bungee.variable} ${montserrat.variable}`}
    >
      <body>
        <NavBar tourLinks={tourLinks} />
        {children}
      </body>
    </html>
  )
}
