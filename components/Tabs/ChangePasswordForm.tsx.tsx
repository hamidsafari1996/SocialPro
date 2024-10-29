import { useState } from "react";
import {
      EyeIcon,
      EyeSlashIcon
} from "@heroicons/react/16/solid";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and password update logic
    if (newPassword === confirmPassword) {
      console.log("Password updated successfully!");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-4 text-left">Change your password</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        See resolved goodness felicity shy civility domestic had but.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Current password"
            required
          />
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 text-left">
            New password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute bottom-0 top-6 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Confirm password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Confirm password"
            required
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}