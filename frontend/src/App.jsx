import React from 'react'
import OKCCLogo from './assets/OKCC_Logo.avif'

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-black">
      {/* NAVBAR (unchanged) */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-center">
          <div className="flex items-center space-x-[5rem]">
            <div>
              <img src={OKCCLogo} alt="OKCC Logo" className="h-18 w-auto" />  {/* ↑ logo bigger */}
            </div>
            <nav className="flex items-center space-x-[3rem] text-lg font-semibold"> {/* ↑ menu text */}
              <a className="hover:underline cursor-pointer">HOME</a>
              <a className="hover:underline cursor-pointer">ABOUT US</a>
              <a className="hover:underline cursor-pointer">GET INVOLVED</a>
              <a className="hover:underline cursor-pointer">EXPLORE</a>
              <a className="hover:underline cursor-pointer">SPONSOR</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
                DONATE
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO / MAIN CONTENT */}
      <main className="p-6">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          {/* Larger image */}
          <img
            src={OKCCLogo}
            alt="OKCC Logo Large"
            className="h-32 w-auto mx-auto"      /* ↑ h-32 for a big hero image */
          />

          {/* Bigger heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Welcome to Your Dashboard
          </h1>

          {/* Subtitle text, spaced nicely */}
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Get involved, explore features, and see real-time updates at a glance.  
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
