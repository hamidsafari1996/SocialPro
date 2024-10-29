
import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function NotificationTab() {
  const [enabledLikes, setEnabledLikes] = useState(true);
  const [enabledComments, setEnabledComments] = useState(true);
  const [enabledSubscriptions, setEnabledSubscriptions] = useState(false);
  const [enabledBirthdays, setEnabledBirthdays] = useState(false);
  const [enabledEvents, setEnabledEvents] = useState(true);
  const [enabledPush, setEnabledPush] = useState(true);
  const [enabledEmail, setEnabledEmail] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-left">Notification</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        Manage your notification settings below.
      </p>

      <div className="space-y-6">
        {/* Likes and Comments */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Likes and Comments</p>
            <p className="text-sm text-gray-500 text-left">Receive notifications for likes and comments.</p>
          </div>
          <Switch
            checked={enabledLikes}
            onChange={setEnabledLikes}
            className={`${enabledLikes ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledLikes ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Reply to My comments */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Reply to My comments</p>
            <p className="text-sm text-gray-500 text-left">Receive notifications when someone replies to your comments.</p>
          </div>
          <Switch
            checked={enabledComments}
            onChange={setEnabledComments}
            className={`${enabledComments ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledComments ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Subscriptions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Subscriptions</p>
            <p className="text-sm text-gray-500 text-left">Get notified when you receive new subscriptions.</p>
          </div>
          <Switch
            checked={enabledSubscriptions}
            onChange={setEnabledSubscriptions}
            className={`${enabledSubscriptions ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledSubscriptions ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Birthdays */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Birthdays</p>
            <p className="text-sm text-gray-500 text-left">Receive notifications for birthdays.</p>
          </div>
          <Switch
            checked={enabledBirthdays}
            onChange={setEnabledBirthdays}
            className={`${enabledBirthdays ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledBirthdays ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Events */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Events</p>
            <p className="text-sm text-gray-500 text-left">Stay updated with upcoming events.</p>
          </div>
          <Switch
            checked={enabledEvents}
            onChange={setEnabledEvents}
            className={`${enabledEvents ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledEvents ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Push notifications */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Push notifications</p>
            <p className="text-sm text-gray-500 text-left">Enable push notifications for updates.</p>
          </div>
          <Switch
            checked={enabledPush}
            onChange={setEnabledPush}
            className={`${enabledPush ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledPush ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Weekly account summary */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Weekly account summary <span className="inline-flex items-center rounded-md bg-blue-600 text-white px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">Pro only</span></p>
            <p className="text-sm text-gray-500 text-left">Receive a weekly summary of your account activities.</p>
          </div>
          <Switch
            checked={enabledEmail}
            onChange={setEnabledEmail}
            className={`${enabledEmail ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledEmail ? 'translate-x-6' : 'translate-x-1'}
              inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </div>

      {/* Save changes button */}
      <div className="mt-8 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save changes
        </button>
      </div>
    </div>
  );
}
