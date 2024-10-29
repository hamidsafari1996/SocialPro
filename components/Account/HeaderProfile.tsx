import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDataContext } from '../../contexts/UserContext'
import {
      BriefcaseIcon,
      MapPinIcon,
      CalendarIcon,
      PencilSquareIcon

} from '@heroicons/react/24/outline';
import Image from 'next/image';

const HeaderProfile = () => {
      const { firstName, lastName, avatarUrl, userAdditional, userName, userBirthday, allowAdd, phone, email, overview, location, imageUrl } = useDataContext();
      const [isLoading, setIsLoading] = useState(true);
      // const router = useRouter();

      return (
            <>
                  <div className="bg-white">
                        {imageUrl ? (
                              <div className="bg-cover bg-center h-64 rounded-t-lg" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                        ) : (
                              <div className="bg-cover bg-center h-64 rounded-t-lg" style={{ backgroundImage: `url('/images/bg.jpg')` }}></div>
                        )}
                        <div className="flex items-end space-x-4 justify-between px-5 pb-7 -mt-14">
                              <div className="flex items-end">
                                    {avatarUrl ? (
                                          <Image src={avatarUrl} alt={firstName} className="w-32 h-32 rounded-full border-4 border-white" />
                                    ) : (
                                          <Image src="images/07.jpg" alt={firstName} className="w-32 h-32 rounded-full border-4 border-white" />
                                    )}
                                    <div className="ml-5">
                                          <h1 className="text-lg font-bold text-left">{firstName} {lastName}</h1>
                                          <p className="text-sm text-gray-500 text-left">250 connections</p>
                                    </div>
                              </div>
                              <div className="">
                                    <Link href="/settings">
                                          <button className="flex bg-red-100 hover:bg-red-600 duration-700 text-red-600 hover:text-white px-4 py-2 rounded-sm"><PencilSquareIcon className="w-5 h-5 flex-shrink-0 mr-1" />Edit Profile</button>
                                    </Link>
                              </div>
                        </div>
                        <div className="flex items-center px-5">
                              <div className="text-sm text-gray-500 flex items-center"><BriefcaseIcon className="w-5 h-5 flex-shrink-0 mr-1" />{userAdditional}</div>
                              <p className="text-sm text-gray-500 flex items-center"><MapPinIcon className="w-5 h-5 flex-shrink-0 mr-1 ml-2" />{location}</p>
                              <p className="text-sm text-gray-500 flex items-center"><CalendarIcon className="w-5 h-5 flex-shrink-0 mr-1 ml-2" />Joined on Nov 26, 2019</p>
                        </div>
                  </div>
            </>
      );
};

export default HeaderProfile;