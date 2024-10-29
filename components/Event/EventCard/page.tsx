import React from "react";
import { Event } from "../../../types/types";
import Image from 'next/image';
interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<{ event: any }> = ({ event }) => {
  return (
    <div className="event-card border rounded-lg p-4 mb-4 shadow-lg">
      <Image src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md" />
      <div className="p-2">
        <span className="badge bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{event.category}</span>
        <h3 className="font-semibold text-lg mt-2">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
        <button className="mt-2 bg-green-500 text-white py-1 px-4 rounded">Interested</button>
      </div>
    </div>
  );
};