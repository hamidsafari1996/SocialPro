import React from 'react';
import { useState } from "react";
import {
      Bars3BottomLeftIcon
} from '@heroicons/react/16/solid';

const RightSidebar = () => {
      const [isOpen, setIsOpen] = useState(false);

      const toggleSidebar = () => {
            setIsOpen(!isOpen);
      };

      const users = [
            { name: "John Doe", image: "/images/01.jpg" },
            { name: "Jane Smith", image: "/images/02.jpg" },
            { name: "Alex Johnson", image: "/images/04.jpg" },
            { name: "Emily Davis", image: "/images/05.jpg" },
            { name: "Emily Davis", image: "/images/09.jpg" },
      ];
      return (
            <div
                  className={`sidebar fixed top-0 right-0 mt-16 h-full text-white transition-all transform overflow-auto bg-white duration-500 ${isOpen ? 'translate-x-0 w-80' : 'translate-x-0 w-24'
                        }`}
            >
                  <div className="p-6 h-full text-left">
                        <div className="flex items-center mb-10">
                              <button className='mr-5' onClick={toggleSidebar}>
                                    <Bars3BottomLeftIcon className="h-6 w-6 text-black" />
                              </button>
                              <span className="text-black font-semibold whitespace-nowrap transition-all duration-500 overflow-hidden opacity-100">Shops</span>
                        </div>
                        <ul className="flex flex-col h-full space-y-4">
                              {users.map((user, index) => (
                                    <li key={index} className="py-1 bg-white text-black rounded">
                                          <a href="" className='flex items-center'>
                                                <img
                                                src={user.image}
                                                alt={user.name}
                                                className="h-10 w-10 rounded-full ease-out duration-300 flex-shrink-0 object-cover mr-3"
                                                />
                                                <span className='font-semibold hover:text-blue-600 whitespace-nowrap transition-all duration-500 overflow-hidden opacity-100'>{user.name}</span>
                                          </a>
                                    </li>
                              ))}
                        </ul>

                  </div>
            </div>
      );
};
export default RightSidebar;