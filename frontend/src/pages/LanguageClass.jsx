import React, { useEffect, useState } from "react";
import { EventCard } from "../components/EventCard"; // the component we built

export default function LanguageClass() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your URL that returns JSON array of events
    fetch("http://localhost:8080/api/events")
      .then((r) => r.json())
      .then((data) => setEvents(data.data))
      .catch((err) => console.error("Failed to load events", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* Hero Section with Gray Background */}
      <section className="w-full min-h-[600px] bg-gray-200 flex flex-col justify-center items-center text-center px-4">
        <div className="bg-white/70 p-6 rounded-xl max-w-2xl">
          <h1 className="text-4xl font-black mb-4">Korean Language Class</h1>
          <p className="text-base text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="w-full px-4 py-20 text-center">
        <h2 className="text-2xl font-black mb-4">Current Schedule</h2>
        <p className="text-base mb-8 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="flex justify-center gap-6 flex-wrap max-w-5xl mx-auto ">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-24 h-10 bg-black"></div>
          ))}
        </div>

        <div className="flex justify-center gap-6 flex-wrap max-w-5xl mx-auto pt-10" style={{ display: "grid", gap: 12 }}>
          {events.map(ev => (
            <EventCard key={ev.id || ev.iCalUID} event={ev} />
          ))}
        </div>
        
      </section>
    </div>
  );
}
