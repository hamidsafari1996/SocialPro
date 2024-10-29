import React, { useState } from 'react';
import Image from 'next/image';
import {
  XMarkIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/20/solid';

const Events = () => {
  // State to track if the upcoming event is visible or not
  const [showUpcomingEvent, setShowUpcomingEvent] = useState(true);
  // State to control the visibility of the popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to hide the upcoming event when the close button is clicked
  const handleCloseUpcomingEvent = () => {
    setShowUpcomingEvent(false); // Set state to false to hide the event
  };

  return (
    <div className="p-4">
      {/* Title and Create events button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Discover Events</h2>
        <button className="bg-blue-200 text-blue-600 px-4 py-2 rounded-sm hover:text-white hover:bg-blue-600 duration-700" onClick={openModal}>
          + Create events
        </button>
      </div>
      {/* Modal for creating events */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg h-5/6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create event</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-600">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form for creating an event */}
            <form>
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm text-left font-medium text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Event name here"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm text-left font-medium text-gray-600 ">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Ex: topics, schedule, etc."
                  rows={3}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                ></textarea>
              </div>

              {/* Date, Time, and Duration */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-sm text-left font-medium text-gray-600">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm text-left font-medium text-gray-600">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm text-left font-medium text-gray-600">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    placeholder="1hr 23m"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-left text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Logansport, IN 46947"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                />
              </div>

              {/* Upload attachment */}
              <div className="mb-4">
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-600">
                  Upload attachment
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="space-y-1 flex flex-col items-center">
                    <DocumentTextIcon className="w-6 h-6 text-gray-400"/>
                    <div className="flex text-sm">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium"
                      >
                        <span className='text-center text-gray-400'>Drop presentation and document here or click to upload.</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancel and Create Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-200 text-red-600 hover:text-white duration-700 px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-200 text-green-600 hover:text-white duration-700 px-4 py-2 rounded-lg hover:bg-green-600 text-sm"
                >
                  Create now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Show the upcoming event only if showUpcomingEvent is true */}
      {showUpcomingEvent && (
        <div className="bg-green-100 text-green-900 p-4 rounded-lg flex justify-between items-center mb-4 border-green-500 border text-sm">
          <div>
            <span className="font-bold">Upcoming event:</span> The learning conference on Sep 19 2024
          </div>
          <div className="flex items-center">
            <button className="bg-green-500 text-white px-3 py-1 rounded-sm hover:bg-green-600 mr-4 duration-700">
              View event
            </button>
            {/* Close button to hide the upcoming event */}
            <button
              className="text-green-500 hover:text-green-700"
              onClick={handleCloseUpcomingEvent}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Event card */}
      <div className="flex items-center bg-white p-4 rounded-lg">
        {/* Event image */}
        <Image
          src="/images/event.jpg"
          alt="Event"
          className="w-16 h-16 rounded-lg mr-4"
        />
        {/* Event details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-left">Comedy on the green</h3>
          <div className="text-gray-500 text-sm flex items-center space-x-2 text-left">
            <span className='flex'><CalendarIcon className="w-5 h-5 mr-1" /> Mon, Sep 25, 2020 at 9:30 AM</span>
            <span className='flex'><MapPinIcon className="w-5 h-5 mr-1" /> San Francisco</span>
            <span className='flex'><UserGroupIcon className="w-5 h-5 mr-1" /> 77 going</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;