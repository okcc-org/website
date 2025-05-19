// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { FaBars } from 'react-icons/fa';

const newsItems = [
  {
    title: 'News 1',
    description: "Body text for whatever you'd like to add more.",
    image: '/news-image.png',
  },
  {
    title: 'News 2',
    description: "Body text for whatever you'd like to add more.",
    image: '/news-image.png',
  },
  {
    title: 'News 3',
    description: "Body text for whatever you'd like to add more.",
    image: '/news-image.png',
  },
];

export default function HomePage() {
  const [currentNews, setCurrentNews] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="font-brandon">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 relative">
        <img src="/okcc-logo.jpg" alt="OKCC Logo" className="h-16 ml-12" />
        <nav className="hidden md:flex gap-16 items-center text-lg -ml-12">
          <a href="#" className="text-base font-black">Programs</a>
          <a href="#" className="text-base font-black">Get Involved</a>
          <a href="#" className="text-base font-black">Festivals</a>
          <a href="#" className="text-base font-black">About Us</a>
        </nav>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-black hidden md:inline-block">Sign In</button>
        <div className="md:hidden">
          <FaBars className="text-2xl text-red-500" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black py-4 z-10 flex flex-col items-center space-y-2 md:hidden">
            <a href="#" className="text-base font-black">Programs</a>
            <a href="#" className="text-base font-black">Get Involved</a>
            <a href="#" className="text-base font-black">Festivals</a>
            <a href="#" className="text-base font-black">About Us</a>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-black">Sign In</button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative text-white text-center py-32 px-4 bg-cover bg-center" style={{ backgroundImage: `url('/background.png')` }}>
        <h2 className="text-2xl md:text-3xl font-black leading-relaxed">
          안녕하세요,<br />올랜도 한국문화센터에 오신 것을 환영합니다.
        </h2>
        <p className="text-sm md:text-base mt-2 font-normal">Hello, welcome to the Orlando Korea Culture Center.</p>
        <button className="bg-red-500 mt-6 px-6 py-2 rounded-full font-black text-white">Donate Today</button>
      </section>

      {/* News */}
      <section className="text-center py-12 px-4">
        <h3 className="text-red-700 text-xl font-black mb-6">Recent News</h3>

        {/* MOBILE carousel */}
        <div className="md:hidden" {...swipeHandlers}>
          <div className="relative overflow-hidden max-w-md mx-auto">
            <div
              className="transition-transform duration-700 flex"
              style={{ transform: `translateX(-${currentNews * 100}%)` }}
            >
              {newsItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full rounded-md" />
                  <h4 className="text-lg font-black mt-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 font-normal">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={item.title} className="w-full rounded-md" />
              <h4 className="text-lg font-black mt-2">{item.title}</h4>
              <p className="text-sm text-gray-600 font-normal">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <section className="text-center py-12 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-red-700 text-2xl font-black mb-6 text-left">Become a Sponsor</h3>
          <div className="md:flex md:gap-12 md:text-left">
            <div className="flex-1 text-base text-gray-800 space-y-6 font-normal">
              <p>
                Thank you for your interest in sponsoring the 2025 Orlando Korea Festival.
              </p>
              <p>
                Your generous sponsorship will help bring to life the Orlando Korea Culture Center's marquee event. Held in the fourth quarter of every year, the festival draws thousands of attendees eager to experience the best of Korean culture, food, and entertainment in Central Florida. The 2023 festival drew more than 3,000 attendees.
              </p>
              <div className="hidden md:flex gap-4 mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded font-black">Learn More</button>
                <button className="border border-gray-500 px-4 py-2 rounded font-black">Prospectus</button>
              </div>
            </div>
            <div className="flex-1 mt-6 md:mt-0">
              <img src="/sponsors.png" alt="Sponsors" className="w-full max-w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-10 text-center text-sm px-4 font-normal">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:justify-between md:items-start">
            <div className="flex flex-col items-center md:items-start">
              <img src="/okcc-logo-white.png" alt="OKCC Footer Logo" className="h-16 mb-4" />
              <div className="flex gap-4">
                <img src="/Facebook.png" alt="Facebook" className="h-6 w-6" />
                <img src="/Youtube.png" alt="YouTube" className="h-6 w-6" />
                <img src="/Instagram.png" alt="Instagram" className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex-1">
              <h4 className="text-xl font-black">Stay Connected!</h4>
              <p className="text-base font-normal">Subscribe to our Newsletter</p>
              <hr className="my-4 border-gray-500 w-48 mx-auto" />
              <button className="bg-red-500 px-6 py-2 rounded-full text-white font-black">Subscribe</button>
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
