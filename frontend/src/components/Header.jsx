import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
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
        navigate('/');
      }, 1000);
    } catch (err) {
      setLoginError(err.message);
    }
  }

  return (
    <header className="w-full bg-[#FFFFFF] flex justify-between items-center py-4 px-8">
      <div className="flex items-center space-x-8">
        <Link to="/">
          <img
            src="/okcc-logo-transparent.png"
            alt="OKCC Logo"
            className="h-14 cursor-pointer hover:opacity-80 transition"
          />
        </Link>

        <nav className="hidden md:flex space-x-6 text-lg font-semibold relative">
          <Link to="/about">About</Link>

          {/* Programs Dropdown with Link */}
          <div className="relative group">
            <Link to="/classes" className="cursor-pointer block">
              <span className="cursor-pointer">Programs</span>
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-[#F5F5F5] shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-200 z-50 text-[0.85rem]">
              <Link
                to="/classes/language-class"
                className="block px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                Korean Language Class
              </Link>
              <Link
                to="/classes/group-tutoring"
                className="block px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                Group Tutoring
              </Link>
              <Link
                to="/classes/traveler-class"
                className="block px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                Traveler Class
              </Link>
            </div>
          </div>

          <a href="#">Events</a>
          <a href="#">Support Us</a>
          <a href="#">Shop</a>
        </nav>
      </div>

      {/* Sign In + Donate */}
      <div className="flex space-x-3 relative">
        <button
          className="bg-black text-white px-6 py-1.5 rounded text-sm font-semibold"
          onClick={() => setShowModal(!showModal)}
        >
          Sign In
        </button>
        <button className="border border-black text-black px-6 py-1.5 rounded text-sm font-semibold bg-transparent">
          Donate
        </button>

        {/* Inline Dropdown Modal */}
        {showModal && (
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl p-6 w-80 shadow-xl">
            <div className="flex justify-end">
              <button
                className="text-gray-600 text-xl font-bold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4 mt-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
              />
              <button
                onClick={handleLogin}
                disabled={!loginEmail || !loginPassword}
                className={`w-full py-2 rounded-full font-bold text-sm transition ${
                  loginEmail && loginPassword
                    ? 'bg-red-700 text-white hover:bg-red-800'
                    : 'bg-gray-300 text-white cursor-not-allowed'
                }`}
              >
                Continue
              </button>

              {loginError && (
                <p className="text-center text-sm text-red-600">{loginError}</p>
              )}
              {loginSuccess && (
                <p className="text-center text-sm text-green-600">
                  {loginSuccess}
                </p>
              )}

              <p className="text-center text-sm text-gray-600">Forgot password?</p>
              <div className="flex items-center my-2">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500 text-xs">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <a
                href="http://localhost:8080/api/auth/google"
                className="w-full border border-black flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
              >
                <FaGoogle className="h-5 w-5" />
                Continue with Google
              </a>
              <p className="text-center text-sm text-gray-600 mt-2">
                Don’t have an account?{' '}
                <span
                  onClick={() => {
                    setShowModal(false);
                    navigate('/register');
                  }}
                  className="font-bold text-black cursor-pointer underline"
                >
                  Sign up for free
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
