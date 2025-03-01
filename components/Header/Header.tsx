'use client' // Marks this as a client-side component

// Import necessary dependencies
import { useState } from 'react'
import Link from 'next/link';              // Next.js link component for client-side navigation
import Image from 'next/image';            // Next.js optimized image component
import {
  Bars3BottomLeftIcon,                    // Hamburger menu icon from Heroicons
} from '@heroicons/react/24/outline'

// TypeScript interface for component props
interface HeaderProps {
  toggleSidebar: () => void;              // Function to toggle sidebar visibility
}

// Header component with TypeScript typing
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  // State for mobile menu visibility (currently unused)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    // Header container with white background and z-index for layering
    <header className="bg-white w-full z-10 px-3 fixed top-0 left-0">
      {/* Navigation bar with responsive padding and flex layout */}
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-1 lg:px-4">
        {/* Left section containing sidebar toggle button */}
        <div className="flex lg:flex-1">
          <div className="flex">
            {/* Sidebar toggle button with hamburger icon */}
            <button onClick={toggleSidebar} className="mr-5">
              <Bars3BottomLeftIcon className="h-6 w-6 text-black flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Center section containing logo/company image */}
        <div className="flex">
          <Link href="/">
            <div className="m-1.5 p-1.5">
              {/* Hidden text for screen readers */}
              <span className="sr-only">Your Company</span>
              {/* Company logo image with Next.js Image optimization */}
              <Image 
              alt="" 
              src="/logo.svg" 
              className="h-8 w-auto" 
              width={800} 
              height={800}
              priority
              />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;