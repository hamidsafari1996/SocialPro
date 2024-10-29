'use client'

import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline'

interface HeaderProps {
  toggleSidebar: () => void; // تعریف prop برای تابع toggleSidebar
}
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white w-full z-10 px-3">
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-1 lg:px-8">
        <div className="flex lg:flex-1">
          <div className="flex">
            <button onClick={toggleSidebar} className="mr-5">
              <Bars3BottomLeftIcon className="h-6 w-6 text-black flex-shrink-0" />
            </button>
          </div>
        </div>
        <div className="flex">
          <Link href="/">
            <div className="m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image alt="" src="/images/cart.png" className="h-8 w-auto" width={800} height={800}/>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}
export default Header;