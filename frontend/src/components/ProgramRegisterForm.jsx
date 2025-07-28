import React, { useState } from 'react';

const ClassSignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    className: '',
    takenBefore: '',
    discoverySource: '',
    focusRequest: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/program/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Failed to create Stripe session');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Sign Up for a Class
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="className"
        placeholder="Class name (e.g., Beginner1A)"
        value={formData.className}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        name="takenBefore"
        value={formData.takenBefore}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Have you taken a class with us before?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <input
        type="text"
        name="discoverySource"
        placeholder="How did you discover our Korean Language School?"
        value={formData.discoverySource}
        onChange={handleChange}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="focusRequest"
        placeholder="Is there anything specific you'd like to focus on during the class?"
        value={formData.focusRequest}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 text-white font-semibold rounded-lg transition ${
          loading
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Redirecting...' : 'Join Now'}
      </button>

      {error && <p className="text-center text-red-500 font-medium">{error}</p>}
    </form>
  );
};

export default ClassSignupForm;
