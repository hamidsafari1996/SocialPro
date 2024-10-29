import React from 'react';
import Link from 'next/link';
import {
  BellIcon,
  CalendarIcon,
  CogIcon,
  NewspaperIcon,
  RssIcon,
  UsersIcon,
  VideoCameraIcon,
  UserGroupIcon
} from '@heroicons/react/16/solid';
interface SidebarProps {
  isOpen: boolean;
}
const Sidebar_left: React.FC<SidebarProps> = ({ isOpen }) => {
  const pages = [
    { name: "Feed", icon: <RssIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/" },
    { name: "Connections", icon: <UsersIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/account" },
    { name: "Latest News", icon: <NewspaperIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/" },
    { name: "Events", icon: <CalendarIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/event" },
    { name: "Groups", icon: <UserGroupIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/" },
    { name: "Notifications", icon: <BellIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/" },
    { name: "Settings", icon: <CogIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/settings" },
    { name: "Video", icon: <VideoCameraIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-black flex-shrink-0" />, link: "/" },
  ];
  return (
    <div
      className={`sidebar fixed top-0 left-0 mt-16 h-full text-white transition-all transform overflow-auto bg-white duration-500 ${isOpen ? 'translate-x-0 w-80' : 'translate-x-0 w-0'
        }`}
    >
      <div className="p-6 h-full">
        <ul className="flex flex-col h-full space-y-4">
          {pages.map((page, index) => (
            <li className="flex items-center pb-2.5" key={index}>
              <Link href={page.link}>
                <div className="flex items-center space-x-2">
                  {page.icon}
                  <span
                    className={`ml-2 text-black font-semibold hover:text-blue-600 whitespace-nowrap transition-all duration-500 overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    {page.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};
export default Sidebar_left;