import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FaBars } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const newsItems = [
  { title: 'News 1', description: "Body text for whatever you'd like to add more.", image: '/news-image.png' },
  { title: 'News 2', description: "Body text for whatever you'd like to add more.", image: '/news-image.png' },
  { title: 'News 3', description: "Body text for whatever you'd like to add more.", image: '/news-image.png' },
];

export default function HomePage() {
  const [currentNews, setCurrentNews] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  

  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
      setAutoCycle(false);
    },
    onSwipedRight: () => {
      setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
      setAutoCycle(false);
    },
    trackTouch: true,
  });

  async function handleLogin(e) {
  e.preventDefault();
  setLoginError('');
  setLoginSuccess('');

  try {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Login failed');
    }

    const data = await res.json();
    console.log('Logged in:', data);

    setLoginSuccess('Login successful!');
    // Optional: localStorage.setItem('token', data.data.token);
    
    setTimeout(() => {
      setShowModal(false);  // ✅ CLOSE MODAL after login
      setLoginEmail('');
      setLoginPassword('');
      setLoginSuccess('');
    }, 1000);
  } catch (err) {
    setLoginError(err.message);
  }
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
  onClick={() => {
    setMenuOpen(false);     // ✅ Close mobile dropdown
    setShowModal(true);     // ✅ Open sign-in modal
  }}
>
  Sign In
</button>

          </div>
        )}
      </header>

      {/* Sign In Modal */}
      {showModal && (
  <div className="fixed z-50 top-28 left-1/2 -translate-x-1/2 md:top-34 md:left-auto md:translate-x-0 md:right-[13.25rem]">
    <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
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
  <p className="text-center text-sm text-green-600">{loginSuccess}</p>
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
          Don’t have an account?{" "}
          <span
  onClick={() => {
    setShowModal(false); // close modal if needed
    navigate('/register');
  }}
  className="font-bold text-black cursor-pointer underline"
>
  Sign up for free
</span>
        </p>
      </div>
    </div>
  </div>
)}



      {/* Hero */}
      <section
        className="relative text-white text-center py-32 px-4 bg-cover bg-center md:bg-[length:1500px] md:bg-no-repeat md:bg-center"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <div className="max-w-[1550px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-black leading-relaxed">
            안녕하세요,<br />올랜도 한국문화센터에 오신 것을 환영합니다.
          </h2>
          <p className="text-base md:text-xl mt-4 font-normal">
            Hello, welcome to the Orlando Korea Culture Center.
          </p>
          <button
  style={{ padding: '0.75rem 2rem', fontSize: '1.05rem' }}
  className="bg-red-700 text-white mt-6 rounded-full font-black"
>
  Donate Today
</button>

        </div>
      </section>

      {/* News */}
      <section className="text-center py-12 px-4">
        <h3 className="text-red-700 text-2xl md:text-4xl font-black mb-10">Recent News</h3>
        <div className="md:hidden" {...swipeHandlers}>
          <div className="relative overflow-hidden max-w-md mx-auto">
            <div className="transition-transform duration-700 flex" style={{ transform: `translateX(-${currentNews * 100}%)` }}>
              {newsItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full rounded-md" />
                  <h4 className="text-lg font-black mt-2">{item.title}</h4>
                  <p className="text-base text-gray-600 font-normal">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex w-full justify-center px-4">
          <div className="flex w-full max-w-[1500px] justify-between gap-12">
            {newsItems.map((item, index) => (
              <div key={index} className="w-1/3">
                <img src={item.image} alt={item.title} className="w-full h-auto rounded-xl shadow-lg" />
                <h4 className="text-2xl font-black mt-4">{item.title}</h4>
                <p className="text-lg text-gray-600 font-normal mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="text-center py-12 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-red-700 text-2xl font-black mb-6 text-center md:text-left">Become a Sponsor</h3>
          <div className="md:flex md:gap-12 md:text-left">
            <div className="flex-1 text-lg md:text-xl text-gray-800 space-y-6 font-normal">
              <p>Thank you for your interest in sponsoring the 2025 Orlando Korea Festival.</p>
              <p>Your generous sponsorship will help bring to life the Orlando Korea Culture Center's marquee event...</p>
              <div className="hidden md:flex gap-4 mt-4">
  <button className="bg-red-700 text-white px-4 py-2 rounded-full font-black">Learn More</button>
  <button className="border border-gray-500 px-4 py-2 rounded-full font-black">Prospectus</button>
</div>

            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <img src="/sponsors.png" alt="Sponsors" className="w-full max-w-full" />
            </div>
          </div>
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
