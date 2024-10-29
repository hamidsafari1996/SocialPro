// contexts/UserContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataContextType {
  firstName: string;
  lastName: string;
  userAdditional: string;
  userName: string;
  userBirthday: string;
  allowAdd: boolean;
  phone: string;
  email: string;
  overview: string;
  location: string;
  avatarUrl: string | null;  // اضافه کردن URL آواتار
  imageUrl: string | null;

  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setAvatarUrl: (url: string) => void;
  setUserAdditional: (additional: string) => void;
  setUserName: (userName: string) => void;
  setUserBirthday: (birthday: string) => void;
  setAllowAdd: (allow: boolean) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setOverview: (overview: string) => void;
  setLocation: (location: string) => void;
  setImageUrl: (url: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userAdditional, setUserAdditional] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userBirthday, setUserBirthday] = useState<string>('');
  const [allowAdd, setAllowAdd] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [overview, setOverview] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // استفاده از useEffect برای خواندن اطلاعات از Local Storage
  useEffect(() => {
    const savedFirstName = localStorage.getItem('firstName');
    const savedLastName = localStorage.getItem('lastName');
    const savedAvatarUrl = localStorage.getItem('avatarUrl');
    const savedUserAdditional = localStorage.getItem('userAdditional');
    const savedUserName = localStorage.getItem('userName');
    const savedUserBirthday = localStorage.getItem('userBirthday');
    const savedAllowAdd = localStorage.getItem('allowAdd'); 
    const savedPhone = localStorage.getItem('phone');
    const savedEmail = localStorage.getItem('email');
    const savedOverview = localStorage.getItem('overview');
    const savedlocation = localStorage.getItem('location');
    const savedImageUrl = localStorage.getItem('imageUrl');
    
    if (savedFirstName) setFirstName(savedFirstName);
    if (savedLastName) setLastName(savedLastName);
    if (savedAvatarUrl) setAvatarUrl(savedAvatarUrl);
    if (savedUserAdditional) setUserAdditional(savedUserAdditional);
    if (savedUserName) setUserName(savedUserName);
    if (savedUserBirthday) setUserBirthday(savedUserBirthday);
    if (savedAllowAdd !== null) { setAllowAdd(savedAllowAdd === 'true'); } 
    if (savedPhone) setPhone(savedPhone);
    if (savedEmail) setEmail(savedEmail);
    if (savedOverview) setOverview(savedOverview);
    if (savedlocation) setLocation(savedlocation);
    if (savedImageUrl) setImageUrl(savedImageUrl);
  }, []);

  useEffect(() => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('userAdditional', userAdditional);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userBirthday', userBirthday);
    localStorage.setItem('allowAdd', JSON.stringify(allowAdd));
    localStorage.setItem('phone', phone);
    localStorage.setItem('email', email);
    localStorage.setItem('overview', overview);
    localStorage.setItem('location', location);

    if (avatarUrl) {
      localStorage.setItem('avatarUrl', avatarUrl);
    }
    if (imageUrl) {
      localStorage.setItem('imageUrl', imageUrl);
    }
  }, [firstName, lastName, userAdditional, avatarUrl, userName, userBirthday, allowAdd, phone, email, overview, location, imageUrl]);

  return (
    <DataContext.Provider value={{ firstName, lastName, avatarUrl, userAdditional, userName, userBirthday, allowAdd, phone, email, overview, location, imageUrl,
    setFirstName, setLastName, setAvatarUrl, setUserAdditional, setUserName, setUserBirthday, setAllowAdd, setPhone, setEmail, setOverview, setLocation, setImageUrl }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};