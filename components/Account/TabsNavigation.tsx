"use client";
import React, { useState } from 'react';
import Posts from './Posts/page';
import Stories from './Stories/page';
import Events from './Events/page';
import About from './About/page';

const TabsNavigation = () => {
      const [activeTab, setActiveTab] = useState('Posts');

      const tabs = [
            { name: 'Posts', component: <Posts /> },
            { name: 'Stories', component: <Stories /> },
            { name: 'Events', component: <Events /> },
            { name: 'About', component: <About /> },
      ];

      return (
            <>
                  <div className="bg-white shadow-md pt-7 px-4 rounded-b-lg">
                        <ul className="flex space-x-4 justify-start">
                              {tabs.map((tab, index) => (
                                    <li key={index}>
                                          <button
                                                className={`text-gray-700 px-2 py-2 text-sm hover:text-blue-600 ${activeTab === tab.name ? 'text-blue-600 border-b-2 border-blue-600' : ''
                                                      }`}
                                                onClick={() => setActiveTab(tab.name)}
                                          >
                                                {tab.name}
                                          </button>
                                    </li>
                              ))}
                        </ul>
                  </div>
                  <div className="mt-6 bg-white shadow-md py-7 px-4 rounded-b-lg mb-5">
                        {tabs.find((tab) => tab.name === activeTab)?.component}
                  </div>
            </>
      );
};

export default TabsNavigation;