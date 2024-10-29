
import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function MessagingTab() {

  const [enabledNotifications, setEnabledNotifications] = useState(true);
  const [enabledNetwork, setEnabledNetwork] = useState(true);
  const [enabledGroup, setenabledGroup] = useState(false);
  const [enabledComments, setEnabledComments] = useState(false);
  const [enabledChannel, setEnabledChannel] = useState(true);
  const [enabledPage, setEnabledPage] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-left">Messaging privacy settings</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mention perhaps attempt pointed suppose. Unknown ye chamber of warrant of Norland arrived.
      </p>

      <div className="space-y-6">
        {/* Likes and Comments */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Enable message request notifications</p>
          </div>
          <Switch
            checked={enabledNotifications}
            onChange={setEnabledNotifications}
            className={`${enabledNotifications ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledNotifications ? 'translate-x-4' : 'translate-x-1'}
              inline-block h-3 w-3 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Reply to My comments */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Invitations from your network</p>
          </div>
          <Switch
            checked={enabledNetwork}
            onChange={setEnabledNetwork}
            className={`${enabledNetwork ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledNetwork ? 'translate-x-4' : 'translate-x-1'}
              inline-block h-3 w-3 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Subscriptions */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Allow connections to add you on group</p>
          </div>
          <Switch
            checked={enabledGroup}
            onChange={setenabledGroup}
            className={`${enabledGroup ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledGroup ? 'translate-x-4' : 'translate-x-1'}
              inline-block h-3 w-3 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Birthdays */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Reply to comments</p>
          </div>
          <Switch
            checked={enabledComments}
            onChange={setEnabledComments}
            className={`${enabledComments ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledComments ? 'translate-x-4' : 'translate-x-1'}
              inline-block h-3 w-3 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Events */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Messages from activity on my page or channel</p>
          </div>
          <Switch
            checked={enabledChannel}
            onChange={setEnabledChannel}
            className={`${enabledChannel ? 'bg-blue-600' : 'bg-gray-200'}
            relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledChannel ? 'translate-x-4' : 'translate-x-1'}
              inline-block h-3 w-3 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Push notifications */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-left">Personalise tips for my page</p>
          </div>
          <Switch
            checked={enabledPage}
            onChange={setEnabledPage}
            className={`${enabledPage ? 'bg-blue-600' : 'bg-gray-200'}
  relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${enabledPage ? 'translate-x-4' : 'translate-x-1'}
    inline-block h-3 w-3 transform bg-white rounded-full transition-transform`}
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