import React from "react";

export const EventBanner: React.FC = () => {
  return (
    <div className="event-banner bg-green-100 p-4 flex justify-between items-center rounded-md">
      <span>
        <strong>Upcoming event:</strong> The learning conference on Sep 19, 2024
      </span>
      <button className="bg-green-500 text-white py-1 px-3 rounded">View event</button>
    </div>
  );
};