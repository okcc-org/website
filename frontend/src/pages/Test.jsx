import React from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';




export default function Homepage() {
  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="w-full">
        <img
          src="/background.png"
          alt="Orlando Korea Culture Center"
          className="w-full h-auto object-contain"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black leading-relaxed drop-shadow-lg">
            안녕하세요,<br />올랜도 한국문화센터에 오신 것을 환영합니다.
          </h2>
          <p className="text-base md:text-xl mt-4 font-normal drop-shadow">
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
          <div className="md:w-1/2 flex justify-end">
            <div className="bg-gray-200 w-full md:max-w-[600px] aspect-video rounded-xl shadow-sm" />
          </div>
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
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-black mb-2">Programs</h3>
        <p className="text-gray-600 text-base mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Program Card 1 */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="bg-gray-300 aspect-video rounded mb-4" />
            <h4 className="font-semibold text-lg">Korean Language Class</h4>
            <Link
              to="/classes/language-class"
              className="mt-3 inline-block text-sm underline font-medium text-black hover:text-red-700 hover:underline cursor-pointer transition duration-200"
            >
              Learn More
            </Link>


          </div>
          {/* Program Card 2 */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="bg-gray-300 aspect-video rounded mb-4" />
            <h4 className="font-semibold text-lg">Group Tutoring</h4>
            <Link
              to="/classes/group-tutoring"
              className="mt-3 inline-block text-sm underline font-medium text-black hover:text-red-700 hover:underline cursor-pointer transition duration-200"
            >
              Learn More
            </Link>


          </div>
          {/* Program Card 3 */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="bg-gray-300 aspect-video rounded mb-4" />
            <h4 className="font-semibold text-lg">Traveler Class</h4>
            <Link
              to="/classes/traveler-class"
              className="mt-3 inline-block text-sm underline font-medium text-black hover:text-red-700 hover:underline cursor-pointer transition duration-200"
            >
              Learn More
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}

