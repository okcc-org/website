import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    validatePassword: '',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          validatePassword: formData.validatePassword,
          fullName: formData.fullName,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Registration failed');
      }

      const data = await res.json();
      setSuccess('Registered successfully!');
      console.log('Registered user:', data);

      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="overflow-x-hidden">
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
    </div>
  );
}
