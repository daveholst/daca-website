import Image from 'next/image';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <div className="top-0 fixed w-full bg-black ">
      <nav className="md:container flex justify-between mx-auto">
        <Image
          width={165}
          height={48}
          className="my-2"
          src="/dacaLogo.png"
          alt="Daca Tours Logo"
        />
        <ul className="flex flex-row items-center gap-4">
          <li className="text-white uppercase font-light text-sm hover:text-orange-400">
            <Link href="/">Home</Link>
          </li>
          <li className="text-white uppercase font-light text-sm hover:text-orange-400">
            <Link href="/about">About</Link>
          </li>
          <li className="text-white uppercase font-light text-sm hover:text-orange-400">
            Tours
          </li>
          <li className="text-white uppercase font-light text-sm hover:text-orange-400">
            Videos
          </li>
          <li className="text-white uppercase font-light text-sm hover:text-orange-400">
            Gallery
          </li>
          <li className="text-white uppercase font-light text-sm hover:text-orange-400">
            Contact
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
