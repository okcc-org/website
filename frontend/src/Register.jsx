import React, { useState } from 'react';
import { FaBars, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    validatePassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.validatePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          validatePassword: formData.validatePassword,
          fullName: formData.fullName
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Registration failed');
      }

      const data = await res.json();
      setSuccess('Registered successfully!');
      console.log('Registered user:', data);
    } catch (err) {
      setError(err.message);
    }
    setTimeout(() => navigate('/'), 1000);
  }

  return (
    <div className="font-brandon overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 relative max-w-[1550px] mx-auto">
        <img
  src="/okcc-logo.jpg"
  alt="OKCC Logo"
  className="h-16 cursor-pointer hover:opacity-80 transition duration-200"
  onClick={() => navigate('/')}
  title="Go to homepage"
/>
        <nav className="hidden md:flex gap-16 items-center text-lg">
          <a href="#" className="text-lg font-normal">Programs</a>
          <a href="#" className="text-lg font-normal">Get Involved</a>
          <a href="#" className="text-lg font-normal">Festivals</a>
          <a href="#" className="text-lg font-normal">About Us</a>
        </nav>
        <button
          className="border-2 border-red-700 text-red-700 bg-white px-5 py-2.5 rounded-full text-base font-black hidden md:inline-block"
          onClick={() => setShowModal(!showModal)}
        >
          Sign In
        </button>
        <div className="md:hidden">
          <FaBars className="text-2xl text-red-700" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black py-4 z-10 flex flex-col items-center space-y-2 md:hidden">
            <a href="#" className="text-base font-black">Programs</a>
            <a href="#" className="text-base font-black">Get Involved</a>
            <a href="#" className="text-base font-black">Festivals</a>
            <a href="#" className="text-base font-black">About Us</a>
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-black"
              onClick={() => setShowModal(!showModal)}
            >
              Sign In
            </button>
          </div>
        )}
      </header>

      {/* Background + Form */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: `url('/registerBackground.jpg')` }}
      >
        <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md p-8 md:p-10 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="text-gray-500 text-sm mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              name="validatePassword"
              placeholder="Confirm Password"
              value={formData.validatePassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-3 rounded-full font-bold text-sm"
            >
              Register
            </button>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
          </form>

          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center border border-black py-3 rounded-full text-sm font-semibold gap-2">
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-10 text-sm px-4 font-normal">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:justify-between md:items-start gap-8">
            <div className="flex flex-col items-center w-full md:w-auto text-center">
              <img src="/okcc-logo-white.png" alt="OKCC Footer Logo" className="h-16 mb-4" />
              <div className="flex justify-center gap-4">
                <img src="/Facebook.png" alt="Facebook" className="h-6 w-6" />
                <img src="/Youtube.png" alt="YouTube" className="h-6 w-6" />
                <img src="/Instagram.png" alt="Instagram" className="h-6 w-6" />
              </div>
              <p className="mt-2 text-sm text-white">hello@okccenter.com</p>
            </div>
            <div className="mt-6 md:mt-0 flex-1 text-center">
              <h4 className="text-xl font-black">Stay Connected!</h4>
              <p className="text-base font-normal">Subscribe to our Newsletter</p>
              <div className="flex flex-col items-center">
                <input
                  type="email"
                  placeholder="Subscribe to the newsletter here!"
                  className="mt-4 mb-4 border-b border-white bg-transparent text-white text-center w-full max-w-xs focus:outline-none"
                />
                <button className="bg-red-700 px-6 py-2 rounded-full text-white font-black">
                  Subscribe
                </button>
              </div>
            </div>
            <ul className="space-y-2 mt-6 md:mt-0 text-center md:text-left w-full md:w-auto">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
