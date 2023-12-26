import Image from 'next/image'
import Link from 'next/link'
import dacaLogo from '../public/dacaLogo.png'

const NavBar: React.FC = () => {
  return (
    <header className="sticky top-0 w-full bg-black z-10">
      <nav className="md:container flex justify-between mx-auto">
        <Image
          height={48}
          className="my-1"
          src={dacaLogo}
          alt="Daca Tours Logo"
        />
        <ul className="flex flex-row items-center gap-4">
          <li className="text-white uppercase font-medium text-sm hover:text-orange-400">
            <Link href="/">Home</Link>
          </li>
          <li className="text-white uppercase font-medium text-sm hover:text-orange-400">
            <Link href="/about">About</Link>
          </li>
          <li className="text-white uppercase font-medium text-sm hover:text-orange-400">
            <Link href="/tours/golden-outback">Tours</Link>
          </li>
          <li className="text-white uppercase font-medium text-sm hover:text-orange-400">
            Videos
          </li>
          <li className="text-white uppercase font-medium text-sm hover:text-orange-400">
            Gallery
          </li>
          <li className="text-white uppercase font-medium text-sm hover:text-orange-400">
            Contact
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
