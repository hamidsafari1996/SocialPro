"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React, { useState } from 'react';
import Header from "../components/Header/Header";
import Sidebar_left from "../components/Main/sidebar-left";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-100`}>
        <Header toggleSidebar={toggleSidebar}/>
        <main className="max-w-full pt-32 pb-32 text-center min-h-screen">
          <div className="flex items-center justify-center flex-row">
            <div className="flex-1 w-1/3">
                <Sidebar_left isOpen={isSidebarOpen} />
            </div>
            <div className="w-full max-w-2xl mx-auto sidebar x-sidebar">
              {children}
            </div>
            <div className="flex-1 w-1/3"></div>
          </div>
        </main>
      </body>
    </html>
  );
}