import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Login failed');
      }

      const data = await res.json();
      console.log('Logged in:', data);
      setLoginSuccess('Login successful!');

      setTimeout(() => {
        setShowModal(false);
        setLoginEmail('');
        setLoginPassword('');
        setLoginSuccess('');

        if (window.location.pathname === '/') {
          window.location.reload();
        } else {
          navigate('/');
        }
      }, 1000);

    } catch (err) {
      setLoginError(err.message);
    }
  }

  return (
    <header className="w-full bg-[#FFFFFF] flex justify-between items-center py-4 px-4 md:px-8 relative z-50">
      <div className="flex items-center space-x-8">
        <Link to="/">
          <img
            src="/okcc-logo-transparent.png"
            alt="OKCC Logo"
            className="h-12 md:h-14 cursor-pointer hover:opacity-80 transition"
          />
        </Link>

        {/* Desktop Nav Menu */}
        <nav className="hidden md:flex space-x-10 text-2xl font-normal relative">
          <Link to="/about" className="hover:opacity-80 transition">About</Link>

          <div className="relative group">
            <Link to="/classes" className="cursor-pointer block hover:opacity-80 transition">
              <span className="cursor-pointer">Programs</span>
            </Link>
            <div className="absolute left-0 mt-2 w-56 bg-[#F5F5F5] shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-200 z-50 text-sm">
              <Link to="/classes/language-class" className="block px-4 py-2 hover:bg-gray-200">Korean Language Class</Link>
              <Link to="/classes/group-tutoring" className="block px-4 py-2 hover:bg-gray-200">Group Tutoring</Link>
              <Link to="/classes/traveler-class" className="block px-4 py-2 hover:bg-gray-200">Traveler Class</Link>
            </div>
          </div>

          <Link to="/events" className="hover:opacity-80 transition">Events</Link>
          <a href="#" className="hover:opacity-80 transition">Support Us</a>
          <a href="#" className="hover:opacity-80 transition">Shop</a>
        </nav>
      </div>

      {/* Desktop Sign In + Donate */}
      <div className="hidden md:flex space-x-4">
        <button
          className="bg-[#333333] text-white px-6 py-2 rounded text-xl font-normal hover:bg-gray-700 transition"
          onClick={() => setShowModal(!showModal)}
        >
          Sign In
        </button>
        <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded text-xl font-normal transition">
          Donate
        </button>
      </div>
      {/* Desktop Modal (portal) */}
      {showModal && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed right-4 top-20 z-50 bg-white rounded-xl p-6 w-80 shadow-xl"
          >
            <div className="flex justify-end">
              <button
                className="text-gray-600 text-xl font-bold hover:text-red-700 hover:scale-110 transition-all duration-200"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4 mt-2">
              {/* email */}
              <input type="email" placeholder="Enter your email address" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200" required autoComplete="email" />
              {/* password */}
              <input type="password" placeholder="Enter your password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200" required autoComplete="current-password" />
              {/* continue */}
              <button type="submit" disabled={!loginEmail || !loginPassword} className={`w-full py-2 rounded-full font-bold text-sm transition ${loginEmail && loginPassword ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-[#333333] text-white cursor-not-allowed'}`}>Continue</button>
              {loginError && <p className="text-center text-sm text-red-600">{loginError}</p>}
              {loginSuccess && <p className="text-center text-sm text-green-600">{loginSuccess}</p>}
              <p className="text-center text-sm text-gray-600">Forgot password?</p>
              <div className="flex items-center my-2"><hr className="flex-grow border-gray-300" /><span className="mx-2 text-gray-500 text-xs">OR</span><hr className="flex-grow border-gray-300" /></div>
              <a href="http://localhost:8080/api/auth/google" className="w-full border border-black flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"><FaGoogle className="h-5 w-5" />Continue with Google</a>
              <p className="text-center text-sm text-gray-600 mt-2">Don't have an account?{' '}<span onClick={()=>{setShowModal(false); navigate('/register');}} className="font-bold text-black cursor-pointer underline">Sign up for free</span></p>
            </form>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col space-y-1 p-2"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <motion.div
          animate={{ rotate: showMobileMenu ? 45 : 0, y: showMobileMenu ? 8 : 0 }}
          className="w-6 h-0.5 bg-black transition-all duration-75"
        />
        <motion.div
          animate={{ opacity: showMobileMenu ? 0 : 1 }}
          className="w-6 h-0.5 bg-black transition-all duration-75"
        />
        <motion.div
          animate={{ rotate: showMobileMenu ? -45 : 0, y: showMobileMenu ? -8 : 0 }}
          className="w-6 h-0.5 bg-black transition-all duration-75"
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-40 border-b border-gray-200"
            style={{ width: '100vw' }}
          >
            <div className="w-full max-w-full mx-auto px-6 py-3">
              <nav className="space-y-2">
                <Link 
                  to="/about" 
                  className="block text-base font-normal hover:text-red-700 transition py-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
                
                <div className="space-y-1">
                  <Link 
                    to="/classes" 
                    className="block text-base font-normal hover:text-red-700 transition py-1"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Programs
                  </Link>
                  <div className="pl-3 space-y-0.5">
                    <Link 
                      to="/classes/language-class" 
                      className="block text-sm text-gray-600 hover:text-red-700 transition py-0.5"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Korean Language Class
                    </Link>
                    <Link 
                      to="/classes/group-tutoring" 
                      className="block text-sm text-gray-600 hover:text-red-700 transition py-0.5"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Group Tutoring
                    </Link>
                    <Link 
                      to="/classes/traveler-class" 
                      className="block text-sm text-gray-600 hover:text-red-700 transition py-0.5"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Traveler Class
                    </Link>
                  </div>
                </div>
                
                <Link 
                  to="/events" 
                  className="block text-base font-normal hover:text-red-700 transition py-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Events
                </Link>
                <a 
                  href="#" 
                  className="block text-base font-normal hover:text-red-700 transition py-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Support Us
                </a>
                <a 
                  href="#" 
                  className="block text-base font-normal hover:text-red-700 transition py-1"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Shop
                </a>
              </nav>
              
              <div className="mt-3 pt-2 border-t border-gray-200 flex space-x-2">
                <button
                  className="flex-1 bg-[#333333] text-white px-3 py-1.5 rounded text-sm font-normal hover:bg-gray-700 transition"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowModal(true);
                  }}
                >
                  Sign In
                </button>
                <button className="flex-1 bg-red-700 hover:bg-red-800 text-white px-3 py-1.5 rounded text-sm font-normal transition">
                  Donate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Modal - Fullscreen */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-white z-50"
            style={{ width: '100vw', height: '100vh' }}
          >
            {/* Close button - absolute positioned */}
            <button 
              className="absolute top-4 right-4 text-gray-600 text-3xl font-bold hover:text-red-700 hover:scale-110 transition-all duration-200 z-10" 
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            
            {/* Centered form content */}
            <div className="w-full h-full flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-sm"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
                  <p className="text-gray-600">Welcome back to OKCC</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                    autoComplete="email"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="submit"
                    disabled={!loginEmail || !loginPassword}
                    className={`w-full py-3 rounded-lg font-bold text-base transition ${loginEmail && loginPassword
                        ? 'bg-red-700 text-white hover:bg-red-800'
                        : 'bg-[#333333] text-white cursor-not-allowed'
                      }`}
                  >
                    Continue
                  </button>

                  {loginError && <p className="text-center text-sm text-red-600">{loginError}</p>}
                  {loginSuccess && <p className="text-center text-sm text-green-600">{loginSuccess}</p>}

                  <p className="text-center text-base text-gray-600">Forgot password?</p>
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-500 text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                  <a
                    href="http://localhost:8080/api/auth/google"
                    className="w-full border border-black flex items-center justify-center gap-2 py-3 rounded-lg text-base font-semibold hover:bg-gray-100 transition"
                  >
                    <FaGoogle className="h-5 w-5" />
                    Continue with Google
                  </a>
                  <p className="text-center text-base text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <span
                      onClick={() => {
                        setShowModal(false);
                        navigate('/register');
                      }}
                      className="font-bold text-black cursor-pointer underline hover:text-red-700 transition"
                    >
                      Sign up for free
                    </span>
                  </p>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
