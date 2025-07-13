import React from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';




export default function Homepage() {
  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="w-full relative">
  <img
    src="/background.png"
    alt="Orlando Korea Culture Center"
    className="w-full h-auto object-contain"
  />
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
    <h2 className="text-4xl md:text-7xl font-normal leading-snug drop-shadow-xl whitespace-nowrap">
      안녕하세요,<br /> 올랜도 한국문화센터에 오신 것을 환영합니다.
    </h2>
    <p className="text-lg md:text-3xl mt-8 font-light drop-shadow">
      Hello, welcome to the Orlando Korea Culture Center.
    </p>
  </div>
</section>






      {/* Upcoming Events */}
      <section className="bg-white py-20 px-6 w-full">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-start gap-12">
          {/* Left Text Side */}
          <div className="md:w-1/2">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-black leading-tight">
              Upcoming Events
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="mt-8 border border-black px-6 py-3 text-base font-semibold hover:bg-black hover:text-white transition">
              Learn More
            </button>
          </div>

          {/* Right Image Side */}
           <img
    src="/upcomingEvent.jpg" // ← replace with your image path
    alt="Descriptive alt text"
    className="w-full md:max-w-[600px] aspect-video rounded-xl shadow-sm object-cover"
  />
        </div>
      </section>


      {/* Stay in Touch */}
      <section className="bg-[#B82525] text-white py-16 px-6 w-full">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Section */}
          <div className="md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Stay in Touch</h3>
            <p className="text-sm md:text-base text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p>
          </div>

          {/* Email Form */}
          <form className="md:w-1/2 w-full flex">
            <input
              type="email"
              placeholder="Enter Email..."
              className="flex-grow px-4 py-3 rounded-l-md bg-white text-black text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-r-md text-sm font-bold hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>


      {/* Programs */}
    <section className="py-20 px-4 max-w-7xl mx-auto text-center">
  <h3 className="text-4xl md:text-5xl font-black mb-6">Programs</h3>
  <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Program Card 1 */}
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
      style={{
        backgroundImage: "url('/koreanClass.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition group-hover:bg-black/60">
        <h4 className="font-semibold text-white text-2xl md:text-3xl">Korean Language Class</h4>
        <Link
          to="/classes/language-class"
          className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* Program Card 2 */}
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
      style={{
        backgroundImage: "url('/groupTutoring.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition group-hover:bg-black/60">
        <h4 className="font-semibold text-white text-2xl md:text-3xl">Group Tutoring</h4>
        <Link
          to="/classes/group-tutoring"
          className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* Program Card 3 */}
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
      style={{
        backgroundImage: "url('/travelClass.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition group-hover:bg-black/60">
        <h4 className="font-semibold text-white text-2xl md:text-3xl">Traveler Class</h4>
        <Link
          to="/classes/traveler-class"
          className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>



      <section className="py-5 px-4 max-w-7xl mx-auto text-center">
  <h3 className="text-4xl md:text-5xl font-black mb-6">Get Involved</h3>
  <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    {/* Program Card 1 */}
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
      style={{
        backgroundImage: "url('/attend.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition group-hover:bg-black/60">
        <h4 className="font-semibold text-white text-2xl md:text-3xl">Attend</h4>
        <Link
          to="/classes/language-class"
          className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* Program Card 2 */}
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
      style={{
        backgroundImage: "url('/volunteer.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition group-hover:bg-black/60">
        <h4 className="font-semibold text-white text-2xl md:text-3xl">Volunteer</h4>
        <Link
          to="/classes/group-tutoring"
          className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* Program Card 3 */}
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
      style={{
        backgroundImage: "url('/donate.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition group-hover:bg-black/60">
        <h4 className="font-semibold text-white text-2xl md:text-3xl">Donate</h4>
        <Link
          to="/classes/traveler-class"
          className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}

