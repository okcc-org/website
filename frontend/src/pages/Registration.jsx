import React, { useState } from 'react';
import useTitle from '../hooks/useTitle';

const Registration = () => {
  useTitle('Class Registration - OKCC');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    class: '',
    firstTime: '',
    discovery: '',
    focus: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data - no backend integration yet
    console.log('Registration form data:', formData);
    alert('Registration form submitted! (Data logged to console)');
  };

  return (
    <>
      <style>
        {`
          .registration-form input::placeholder,
          .registration-form textarea::placeholder {
            color: #474748 !important;
          }
        `}
      </style>
      <div 
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: 'url(/stockKoreanClass.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Class Registration</h1>
            <p className="text-xl text-gray-600">Register for our Korean language classes and programs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 registration-form">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700 mb-3">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Class Dropdown */}
            <div>
              <label htmlFor="class" className="block text-lg font-medium text-gray-700 mb-3">
                Select Class *
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Choose a class...</option>
                <option value="korean-language-class">Korean Language Class</option>
                <option value="group-tutoring">Group Tutoring</option>
                <option value="traveler-class">Traveler Class</option>
              </select>
            </div>

            {/* First Time Dropdown */}
            <div>
              <label htmlFor="firstTime" className="block text-lg font-medium text-gray-700 mb-3">
                Is this the first time you've taken a class with us? *
              </label>
              <select
                id="firstTime"
                name="firstTime"
                value={formData.firstTime}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select an option...</option>
                <option value="yes">Yes, this is my first time</option>
                <option value="no">No, I've taken classes before</option>
              </select>
            </div>

            {/* Discovery Text Box */}
            <div>
              <label htmlFor="discovery" className="block text-lg font-medium text-gray-700 mb-3">
                How did you discover our school?
              </label>
              <textarea
                id="discovery"
                name="discovery"
                value={formData.discovery}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us how you found out about OKCC..."
              />
            </div>

            {/* Focus Text Box */}
            <div>
              <label htmlFor="focus" className="block text-lg font-medium text-gray-700 mb-3">
                Is there anything specific you'd like to focus on during the class?
              </label>
              <textarea
                id="focus"
                name="focus"
                value={formData.focus}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Share any specific learning goals or areas of interest..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 text-xl rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Submit Registration
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-500">
              * Required fields
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Registration;
