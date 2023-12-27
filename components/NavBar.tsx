import Image from 'next/image'
import Link from 'next/link'
import dacaLogo from '../public/dacaLogo.png'
import HoverMenu from '@/components/HoverMenu.client'

interface props {
  tourLinks: {
    name: string
    href: string
  }[]
}

const NavBar = ({ tourLinks }: props) => {
  return (
    <header className="sticky top-0 z-10 w-full bg-black">
      <nav className="mx-auto flex justify-between md:container">
        <Image
          height={48}
          className="my-1"
          src={dacaLogo}
          alt="Daca Tours Logo"
        />
        <ul className="flex flex-row items-center gap-4">
          <li className="text-sm font-medium uppercase text-white hover:text-orange-400">
            <Link href="/">Home</Link>
          </li>
          <li className="text-sm font-medium uppercase text-white hover:text-orange-400">
            <Link href="/about">About</Link>
          </li>
          <HoverMenu links={tourLinks} />
          <li className="text-sm font-medium uppercase text-white hover:text-orange-400">
            <Link href="/videos">Videos</Link>
          </li>
          <li className="text-sm font-medium uppercase text-white hover:text-orange-400">
            Gallery
          </li>
          <li className="text-sm font-medium uppercase text-white hover:text-orange-400">
            Contact
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
