import React, { useState } from "react";

export default function DeleteAccount() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-left">Delete account</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
        Unaffected at ye of compliment alteration to.
      </p>

      <h3 className="text-md font-semibold mb-4 text-left">Before you go...</h3>
      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 mb-6 text-left">
        <li>
          Take a backup of your data{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Here
          </a>
        </li>
        <li>If you delete your account, you will lose your all data.</li>
      </ul>

      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-sm text-gray-700">
            Yes, I'd like to delete my account
          </span>
        </label>
      </div>

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-green-100 text-green-600 font-semibold rounded-md hover:bg-green-200"
          onClick={() => alert("Account kept")}
        >
          Keep my account
        </button>
        <button
          className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 ${!isChecked ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!isChecked}
          onClick={() => alert("Account deleted")}
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}
