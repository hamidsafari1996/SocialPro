import React, { useState } from "react";

const tabs = ["Top", "Local", "This week", "Online"];

export const EventTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Top");

  return (
    <div className="event-tabs flex space-x-4 border-b-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
        >
          {tab}
        </button>
      ))}
      <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">+ Create event</button>
    </div>
  );
};