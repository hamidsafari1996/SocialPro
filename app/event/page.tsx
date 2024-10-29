"use client";

import React from "react";
import { EventBanner } from "../../components/Event/EventBanner/page";
import { EventTabs } from "../../components/Event/EventTabs/page";
import { EventCard } from "../../components/Event/EventCard/page";
import { eventsData } from "../../components/Event/eventsData";

const EventsPage: React.FC = () => {
  return (
    <div className="events-page">
      <EventBanner />
      <EventTabs />
      <div className="event-cards">
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;