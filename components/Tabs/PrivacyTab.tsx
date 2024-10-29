import React from 'react';
import { PencilIcon, EyeIcon } from '@heroicons/react/16/solid';

export default function PrivacyTab() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-left">Privacy and safety</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        See information about your account, download an archive of your data, or learn about your account deactivation options
      </p>

      <div className="space-y-4">
        {/* Use two-factor authentication */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <div>
            <p className="text-sm font-semibold text-left">Use two-factor authentication</p>
            <p className="text-sm text-gray-500 text-left">
              Unaffected occasional thoroughly. Adieus it no wonders spirit houses.
            </p>
          </div>
          <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg text-sm flex">
            <PencilIcon className="h-5 w-5 inline-block mr-1" />
            Change
          </button>
        </div>

        {/* Login activity */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <div>
            <p className="text-sm font-semibold text-left">Login activity</p>
            <p className="text-sm text-gray-500 text-left">
              Select the language you use on social
            </p>
          </div>
          <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg text-sm flex">
            <EyeIcon className="h-5 w-5 inline-block mr-1" />
            View
          </button>
        </div>

        {/* Manage your data and activity */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <div>
            <p className="text-sm font-semibold text-left">Manage your data and activity</p>
            <p className="text-sm text-gray-500 text-left">Select a language for translation</p>
          </div>
          <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg text-sm flex">
            <PencilIcon className="h-5 w-5 inline-block mr-1" />
            Change
          </button>
        </div>

        {/* Search history */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <div>
            <p className="text-sm font-semibold text-left">Search history</p>
            <p className="text-sm text-gray-500 text-left">Choose to autoplay videos on social</p>
          </div>
          <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg text-sm flex">
            <PencilIcon className="h-5 w-5 inline-block mr-1" />
            Change
          </button>
        </div>

        {/* Permitted services */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
          <div>
            <p className="text-sm font-semibold text-left">Permitted services</p>
            <p className="text-sm text-gray-500 text-left">Choose if this feature appears on your profile</p>
          </div>
          <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg text-sm flex">
            <PencilIcon className="h-5 w-5 inline-block mr-1" />
            Change
          </button>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save changes
        </button>
      </div>
    </div>
  );
}