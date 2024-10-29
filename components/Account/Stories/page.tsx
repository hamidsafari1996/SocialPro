import React, { useState } from 'react';

import {
  XMarkIcon,
} from '@heroicons/react/20/solid';
import Image from "next/image";
const Stories = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  // State to track if the upcoming event is visible or not
  const events = [
    { id: 1, name: "The learning conference", date: "Sep 19 2024" },
    { id: 2, name: "Tech Summit", date: "Oct 10 2024" },
  ];
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
  const [visibleEvents, setVisibleEvents] = useState<number[]>(events.map(event => event.id));
  // Function to hide the upcoming event when the close button is clicked
  const handleCloseUpcomingEvent = (id: number) => {
    setVisibleEvents(prevState => prevState.filter(eventId => eventId !== id)); // مخفی کردن رویداد با id مربوطه
  };
  
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files); // تبدیل به آرایه از فایل‌ها
      setSelectedImages(filesArray); // ذخیره فایل‌های انتخاب‌شده
    }
  };

  return (
    <div className="p-4">
      {/* Title and Create events button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Storie</h2>
        <button className="bg-blue-200 text-blue-600 px-4 py-2 rounded-sm hover:text-white hover:bg-blue-600 duration-700" onClick={openModal}>
          + Create Storie
        </button>
      </div>
      {/* Modal for creating events */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg h-5/6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Storie</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-600">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form for creating an event */}
            <form>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select images for your storie
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {selectedImages.map((image, index) => {
                    const imageUrl = URL.createObjectURL(image);
                    return (
                      <div key={index} className="relative">
                        <Image
                          src={imageUrl}
                          alt={`Selected image ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded-md"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Cancel and Create Buttons */}
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-200 text-red-600 hover:text-white duration-700 px-4 py-2 rounded-md hover:bg-red-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-200 text-green-600 hover:text-white duration-700 px-4 py-2 rounded-md hover:bg-green-600 text-sm"
                >
                  Create now
                </button>
              </div>
            </form>
          </div>
        </div>
      )
      }
      {events.map(event => (
        visibleEvents.includes(event.id) && (
          <div
            key={event.id}
            className="bg-green-100 text-green-900 p-4 rounded-lg flex justify-between items-center mb-4 border-green-500 border text-sm"
          >
            <div>
              <span className="font-bold">Upcoming event:</span> {event.name} on {event.date}
            </div>
            <div className="flex items-center">
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => handleCloseUpcomingEvent(event.id)}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      ))}
    </div >
  );
};

export default Stories;