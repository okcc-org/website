import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] py-10 text-sm text-center text-black">
      {/* Nav + Logo */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
        {/* Left Nav */}
        <div className="flex space-x-6 font-medium">
          <a href="#">About</a>
          <a href="#">Programs</a>
          <a href="#">Events</a>
        </div>

       {/* Logo */}
        <img
        src="/okcc-logo-transparent.png"
        alt="OKCC Logo"
        className="h-10"
        />


        {/* Right Nav */}
        <div className="flex space-x-6 font-medium">
          <a href="#">Support Us</a>
          <a href="#">Shop</a>
          <a href="#">Sign In</a>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full max-w-[800px] border-t border-gray-400 mx-auto" />

      {/* Social Icons */}
      <div className="flex justify-center gap-6 my-6">
        <a href="#" className="border border-black p-2 rounded-full hover:bg-black hover:text-white transition">
          <FaFacebookF className="h-5 w-5" />
        </a>
        <a href="#" className="border border-black p-2 rounded-full hover:bg-black hover:text-white transition">
          <FaYoutube className="h-5 w-5" />
        </a>
        <a href="#" className="border border-black p-2 rounded-full hover:bg-black hover:text-white transition">
          <FaInstagram className="h-5 w-5" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="text-sm">
        <p>7000 Winegard Rd, Orlando, FL 32809</p>
        <a href="tel:3214383443" className="underline">
          (321) 438-3443
        </a>
      </div>
    </footer>
  );
};

export default Footer;
