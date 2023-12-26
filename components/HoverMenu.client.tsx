'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface props {
  links: {
    name: string
    href: string
  }[]
}

const HoverMenu = ({ links }: props) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <li
      className="relative text-sm font-medium uppercase text-white hover:text-orange-400"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href="/tours/golden-outback">Tours</Link>
      {isHovering && (
        // <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="absolute -left-4 bg-black">
          <div
            className="mt-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block w-48 p-4 text-sm font-medium uppercase text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-700"
                role="menuitem"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}

export default HoverMenu
