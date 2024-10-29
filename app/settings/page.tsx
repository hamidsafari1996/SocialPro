"use client";
import { useState, useEffect } from 'react';
// import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';  // For redirection
import AccountTab from '@/components/Tabs/AccountTab';
import NotificationTab from "@/components/Tabs/NotificationTab";
import PrivacyTab from '@/components/Tabs/PrivacyTab';
import CommunicationsTab from '@/components/Tabs/CommunicationsTab';
import MessagingTab from '@/components/Tabs/MessagingTab';
import CloseAccountTab from '@/components/Tabs/CloseAccountTab';


// List of tabs
const tabs = [
  { id: 'account', label: 'Account', imageSrc: "/images/person-outline-filled.svg" },
  { id: 'notification', label: 'Notification', imageSrc: "/images/notification-outlined-filled.svg" },
  { id: 'privacy', label: 'Privacy and safety', imageSrc: "/images/shield-outline-filled.svg" },
  { id: 'communications', label: 'Communications', imageSrc: "/images/handshake-outline-filled.svg" },
  { id: 'messaging', label: 'Messaging', imageSrc: "/images/chat-alt-outline-filled.svg" },
  { id: 'close', label: 'Close account', imageSrc: "/images/trash-var-outline-filled.svg" },
];

// Content for each tab
const tabContent: { [key: string]: React.ReactNode } = {
  account: <AccountTab />,
  notification: <NotificationTab />,
  privacy: <PrivacyTab />,
  communications: <CommunicationsTab />,
  messaging: <MessagingTab />,
  close: <CloseAccountTab />,
};

export default function Settings() {
  //const { data: session, status } = useSession();  // Checking login status
  // const router = useRouter();  // To redirect the user
  const [activeTab, setActiveTab] = useState('account'); // Active tab state

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signin");
  //   }
  //   console.log("Session data:", session);
  // }, [status, session]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Horizontal Tabs */}
      {/* {session && (
        <h2 className="text-lg font-bold mb-4">
          Welcome, {session.user?.name}
        </h2>
      )} */}
      <div className="bg-white py-2 px-4 shadow-md rounded-lg">
        <ul className="flex flex-wrap justify-center items-start">
          {tabs.map((tab) => (
            <li className='inline-flex' key={tab.id}>
              <button
                className={`p-3 text-xs text-gray-500 hover:text-blue-600 border-b-2 font-medium flex items-center transition-all duration-300 ease-in-out transform flex-col  ${
                  activeTab === tab.id
                    ? 'font-semibold border-blue-600 text-blue-600 scale-105'
                    : 'text-gray-700 hover:text-blue-500 border-transparent'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className='text-center whitespace-nowrap overflow-hidden text-ellipsis transition-transform duration-300 ease-in-out group-hover:scale-110'>{tab.label}</span>
                <img src={tab.imageSrc} alt={tab.label} className='w-5 mt-3 transition-transform duration-300 ease-in-out group-hover:scale-110' />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab content */}
      <div className="flex-1 bg-white p-8 shadow-lg mt-4 rounded-lg mb-11">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}