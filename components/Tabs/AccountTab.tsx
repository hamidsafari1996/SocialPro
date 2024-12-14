'use client';
import React, { useState, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import { useDataContext } from '../../contexts/UserContext';  // Import the context
import ChangePasswordForm from './ChangePasswordForm.tsx';  // Importing the ChangePasswordForm component
import Swal, { SweetAlertResult } from 'sweetalert2';  // Import SweetAlert2
import Image from 'next/image';
import {
      HandThumbUpIcon
} from '@heroicons/react/24/solid';


export default function AccountTab() {
      const { firstName, lastName, avatarUrl, userAdditional, userName, userBirthday, allowAdd, phone, email, overview, location, imageUrl,
            setFirstName, setLastName, setAvatarUrl, setUserAdditional, setUserName, setUserBirthday, setAllowAdd, setPhone, setEmail, setOverview, setLocation, setImageUrl } = useDataContext();
      const [firstNameInput, setFirstNameInput] = useState('');
      const [lastNameInput, setLastNameInput] = useState('');
      const [userAdditionalInput, setUserAdditionalInput] = useState(userAdditional);
      const [userNameInput, setUserNameInput] = useState(userName);
      const [userBirthdayInput, setUserBirthdayInput] = useState(userBirthday);
      const [allowAddInput, setAllowAddInput] = useState(allowAdd);
      const [phoneInput, setPhoneInput] = useState(phone);
      const [emailInput, setEmailInput] = useState(email);
      const [overviewInput, setOverviewInput] = useState(overview);
      const [locationInput, setLocationInput] = useState(location);
      const [isSaved, setIsSaved] = useState(false);  // Use the context here
      const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
      const [imagePreview, setImagePreview] = useState<string | null>(imageUrl);

      useEffect(() => {
            setFirstNameInput(firstName);
            setLastNameInput(lastName);
            setAvatarPreview(avatarUrl);
            setImagePreview(imageUrl);
            setUserAdditionalInput(userAdditional);
            setUserNameInput(userName);
            setUserBirthdayInput(userBirthday);
            setAllowAddInput(allowAdd);
            setPhoneInput(phone);
            setEmailInput(email);
            setOverviewInput(overview);
            setLocationInput(location);
      }, [firstName, lastName, avatarUrl, imageUrl, userAdditional, userName, userBirthday, allowAdd, phone, email, overview, location]);

      const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();

                  reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                              setAvatarUrl(reader.result);  // Only update avatarUrl
                              setAvatarPreview(reader.result);  // Update preview for avatar
                        }
                  };
                  reader.readAsDataURL(file);
            }
      };

      // Handle Image Change
      const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();

                  reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                              setImageUrl(reader.result);  // Only update imageUrl
                              setImagePreview(reader.result);  // Update preview for image
                        }
                  };
                  reader.readAsDataURL(file);
            }
      };

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();

            setFirstName(firstNameInput);
            setLastName(lastNameInput);
            setUserAdditional(userAdditionalInput);
            setUserName(userNameInput);
            setUserBirthday(userBirthdayInput);
            setAllowAdd(allowAddInput);
            setPhone(phoneInput);
            setEmail(emailInput);
            setOverview(overviewInput);
            setLocation(locationInput);
            localStorage.setItem('allowAdd', allowAddInput.toString());
            setIsSaved(true);

            let timerInterval: NodeJS.Timeout | undefined;

            const iconHtmlString = ReactDOMServer.renderToString(
                  <HandThumbUpIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-green-600 flex-shrink-0" />
            );

            Swal.fire({
                  title: '',
                  html: `
    <div style="display: flex; align-items: center;">
      ${iconHtmlString}
      <div style="margin-left: 10px;">Your information was successfully saved!</div>
    </div>
  `,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: () => {
                        const timer = Swal.getHtmlContainer()?.querySelector('b');
                        timerInterval = setInterval(() => {
                              if (timer) {
                                    timer.textContent = `${Swal.getTimerLeft()}`;
                              }
                        }, 100);
                  },
                  willClose: () => {
                        if (timerInterval) {
                              clearInterval(timerInterval);
                        }
                  },
                  position: 'bottom-left',
                  customClass: {
                        timerProgressBar: 'bg-blue-600'
                  }
            }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer');
                  }
            });
      };

      return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
                  <h1 className="text-2xl font-bold mb-4 text-left">Account Settings</h1>
                  <p className="text-gray-600 mb-6 text-left">
                        He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
                        Unaffected at ye of compliment alteration to.
                  </p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-4">
                              {avatarPreview ? (
                                    <Image src={avatarPreview} alt="Avatar" className="w-16 h-16 rounded-full object-cover" width={800} height={800}/>
                              ) : (
                                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                                          <span className="text-gray-500">No Avatar</span>
                                    </div>
                              )}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 text-left">Upload Avatar</label>
                                    <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleAvatarChange}
                                          className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                              </div>
                        </div>

                        {/* Image Upload */}
                        <div className="flex items-center space-x-4">
                              {imagePreview ? (
                                    <Image src={imagePreview} alt="Uploaded" className="w-16 h-16 object-cover rounded-md" width={800} height={800}/>
                              ) : (
                                    <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                                          <span className="text-gray-500">No Image</span>
                                    </div>
                              )}
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 text-left">Upload Image</label>
                                    <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageChange}
                                          className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                              </div>
                        </div>
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                    <label className="block text-sm font-medium text-left text-slate-700">
                                          First name
                                    </label>
                                    <input
                                          type="text"
                                          name="firstName"
                                          value={firstNameInput}
                                          onChange={(e) => setFirstNameInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium text-left text-slate-700">
                                          Last name
                                    </label>
                                    <input
                                          type="text"
                                          name="lastName"
                                          value={lastNameInput}
                                          onChange={(e) => setLastNameInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium text-left text-slate-700">
                                          Your Job
                                    </label>
                                    <input
                                          type="text"
                                          name="userAdditional"
                                          value={userAdditionalInput}
                                          onChange={(e) => setUserAdditionalInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                        </div>

                        {/* Username and Birthday */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                    <label className="block text-sm font-medium text-left text-slate-700">
                                          User name
                                    </label>
                                    <input
                                          type="text"
                                          name="userName"
                                          value={userNameInput}
                                          onChange={(e) => setUserNameInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium text-left text-slate-700">
                                          Birthday
                                    </label>
                                    <input
                                          type="date"
                                          name="userBirthday"
                                          value={userBirthdayInput}
                                          onChange={(e) => setUserBirthdayInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                        </div>
                        <div>
                              <label className="block text-sm font-medium text-left text-slate-700">
                                    Location
                              </label>
                              <input
                                    type="text"
                                    name="location"
                                    value={locationInput}
                                    onChange={(e) => setLocationInput(e.target.value)}
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                              />
                        </div>
                        {/* Checkbox */}
                        <div className="flex items-start">
                              <div className="flex items-center h-5">
                                    <input
                                          id="allowAdd"
                                          name="allowAdd"
                                          type="checkbox"
                                          checked={allowAddInput}
                                          onChange={(e) => setAllowAddInput(e.target.checked)}
                                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                              </div>
                              <div className="ml-3 text-sm">
                                    <label htmlFor="allowAdd" className="font-medium text-gray-700">
                                          Allow anyone to add you to their team
                                    </label>
                              </div>
                        </div>

                        {/* Phone number and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 text-left">Phone number</label>
                                    <input
                                          type="text"
                                          name="phone"
                                          value={phoneInput}
                                          onChange={(e) => setPhoneInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                              <div>
                                    <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                                    <input
                                          type="email"
                                          name="email"
                                          value={emailInput}
                                          onChange={(e) => setEmailInput(e.target.value)}
                                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    />
                              </div>
                        </div>

                        {/* Overview */}
                        <div>
                              <label className="block text-sm font-medium text-gray-700 text-left">Overview</label>
                              <textarea
                                    name="overview"
                                    rows={4}
                                    value={overviewInput}
                                    onChange={(e) => setOverviewInput(e.target.value)}
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                              />
                              <p className="mt-2 text-sm text-gray-500 text-left">Character limit: 300</p>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                              <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                    Save changes
                              </button>
                        </div>
                  </form>
                  {/* <ChangePasswordForm /> Add the change password form here */}
            </div>
      );
} 