import React from 'react';

export default function TravelerClass() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero Section with Gray Background */}
      <section className="w-full min-h-[600px] bg-gray-200 flex flex-col justify-center items-center text-center px-4">
        <div className="bg-white/70 p-6 rounded-xl max-w-2xl">
          <h1 className="text-4xl font-black mb-4">Traveler's Korean Class</h1>
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

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
  {/* PRICE */}
  <div className="bg-[#333333] text-white p-6 rounded-md text-center space-y-2">
    <h3 className="text-lg font-bold tracking-wide">PRICE</h3>
    <p>Everything included for</p>
    <p className="text-xl font-semibold">$40</p>
  </div>

  {/* LOCATION */}
  <div className="bg-[#333333] text-white p-6 rounded-md text-center space-y-2">
    <h3 className="text-lg font-bold tracking-wide">LOCATION</h3>
    <p>7000 Winegard Rd</p>
    <p>Orlando, FL 32809</p>
  </div>

  {/* DATE */}
  <div className="bg-[#333333] text-white p-6 rounded-md text-center space-y-2">
    <h3 className="text-lg font-bold tracking-wide">DATE</h3>
    <p>February 1st, 2025</p>
    <p>Saturday</p>
  </div>

  {/* TIME */}
  <div className="bg-[#333333] text-white p-6 rounded-md text-center space-y-2">
    <h3 className="text-lg font-bold tracking-wide">TIME</h3>
    <p>11AM</p>
    <p>Approximately 2 hrs</p>
  </div>
</div>

      </section>
    </div>
  );
}
