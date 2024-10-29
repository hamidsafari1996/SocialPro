'use client'

import { useState } from 'react'
import Link from 'next/link';
import {
  HomeIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon

} from '@heroicons/react/24/outline'

const Footer = () => {
      const pages = [
            { id: "0", icon: <HomeIcon className="w-7 h-7 flex-shrink-0 text-slate-900" />, link: "/" },
            { id: "1", icon: <UserGroupIcon className="w-7 h-7 flex-shrink-0 text-slate-900" />, link: "/account" },
            { id: "2", icon: <AdjustmentsHorizontalIcon className="w-7 h-7 text-slate-900 flex-shrink-0" />, link: "/settings" },
      ];

  return (
    <footer className="bg-white p-3 fixed bottom-0 left-0 w-full z-10 flex justify-center shadow-[0_-10px_28px_0px_#59595930]">
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-1 lg:px-8">
            <ul className='flex justify-center items-center space-x-11'>
                  {pages.map((page, index) => (
                  <li key={page.id}>
                        <Link href={page.link}>
                              {page.icon}
                        </Link>
                  </li>
                  ))}
            </ul>
      </nav>
    </footer>
  )
}
export default Footer;