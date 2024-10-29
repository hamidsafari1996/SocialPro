'use client'

import { useState } from 'react'
import Link from 'next/link';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline'
// import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

// const products = [
//   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]
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
              <img alt="" src="images/cart.png" className="h-8 w-auto" />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}
export default Header;