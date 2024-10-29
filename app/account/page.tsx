'use client'
import { useEffect, useState } from 'react';
import HeaderProfile from '@/components/Account/HeaderProfile';
import TabsNavigation from '@/components/Account/TabsNavigation';
import { useDataContext } from '../../contexts/UserContext'

const AccountPage = () => {
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderProfile />
      <TabsNavigation />
    </div>
  );
};

export default AccountPage;