'use client';
import { useDataContext } from '../../../contexts/UserContext';
import {
  CalendarDateRangeIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const { firstName, lastName, avatarUrl, userAdditional, userName, userBirthday, allowAdd, phone, email, overview, location, imageUrl,
    setFirstName, setLastName, setAvatarUrl, setUserAdditional, setUserName, setUserBirthday, setAllowAdd, setPhone, setEmail, setOverview, setLocation, setImageUrl } = useDataContext();



  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-left">About</h1>
      <p className="text-gray-600 text-left">{overview}</p>
      <ul className='mt-4'>
        <li className='flex items-center text-slate-500 text-sm'><CalendarDateRangeIcon className="w-5 h-5 flex-shrink-0 mr-1" />Born: {userBirthday}</li>
        <li className='flex items-center mt-2 text-slate-500 text-sm'><PhoneIcon className="w-5 h-5 flex-shrink-0 mr-1" />Phone: {phone}</li>
        <li className='flex items-center mt-2 text-slate-500 text-sm'><EnvelopeIcon className="w-5 h-5 flex-shrink-0 mr-1" />Email: {email}</li>
      </ul>
    </div>
  );
};

export default AboutPage;