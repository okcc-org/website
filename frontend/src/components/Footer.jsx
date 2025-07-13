import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] py-10 text-base text-center text-black">
      {/* Nav + Logo */}
      <div className="flex flex-wrap justify-center items-center gap-12 mb-6">
        {/* Left Nav */}
        <div className="flex space-x-10 font-semibold text-lg">
          <a href="#">About</a>
          <a href="#">Programs</a>
          <a href="#">Events</a>
        </div>

        {/* Logo */}
        <img
          src="/okcc-logo-transparent.png"
          alt="OKCC Logo"
          className="h-14"
        />

        {/* Right Nav */}
        <div className="flex space-x-10 font-semibold text-lg">
          <a href="#">Support Us</a>
          <a href="#">Shop</a>
          <a href="#">Sign In</a>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full max-w-[800px] border-t border-gray-400 mx-auto" />

      {/* Social Icons */}
      <div className="flex justify-center gap-8 my-6">
        <a href="#" className="border border-black p-3 rounded-full hover:bg-black hover:text-white transition">
          <FaFacebookF className="h-6 w-6" />
        </a>
        <a href="#" className="border border-black p-3 rounded-full hover:bg-black hover:text-white transition">
          <FaYoutube className="h-6 w-6" />
        </a>
        <a href="#" className="border border-black p-3 rounded-full hover:bg-black hover:text-white transition">
          <FaInstagram className="h-6 w-6" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="text-base space-y-1">
        <p>7000 Winegard Rd, Orlando, FL 32809</p>
        <a href="tel:3214383443" className="underline">
          (321) 438-3443
        </a>
      </div>
    </footer>
  );
};

export default Footer;
