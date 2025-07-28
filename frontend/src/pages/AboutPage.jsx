import React from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-20 text-center">
        {/* Our Story */}
        <section className="flex flex-col md:flex-row items-center gap-10 text-left min-h-[240px]">
          <div className="flex-1 space-y-6 justify-center">
            <h2 className="text-3xl font-black">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The Orlando Korea Culture Center is dedicated to providing insights into the rich cultural heritage of Korea.
              We encourage everyone to visit and learn something new about a nation with a history spanning more than 5,000 years.
              We hold annual events such as the Korean Speech Contest, Global Taste of Korea, our Annual K-pop Contest, and the Orlando Korea Festival.
            </p>
          </div>
          <div className="flex-1">
            <div className="w-full h-60 bg-gray-300 rounded" />
          </div>
        </section>


        {/* Mission */}
        <section className="bg-gray-100 py-10 px-6 rounded shadow-sm">
          <h3 className="text-xl font-bold mb-2">Mission</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            The goal of the Orlando Korean Culture Center is to create an understanding of Korean culture
            and to promote a more active people-to-people exchange between the Republic of Korea and
            other cultures in Orlando through diverse programs and events.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-gray-100 py-10 px-6 rounded shadow-sm">
          <h3 className="text-xl font-bold mb-2">Vision</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Here at OKCC we strive to create a community that encourages intercultural connections.
            We hope that by helping our community members become familiar with Korean people, culture, and history,
            we can create a more welcoming and open society for all.
          </p>
        </section>

        {/* Our Team */}
        <section>
          <h2 className="text-2xl font-black mb-8">Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="space-y-2 text-center">
                <div className="w-full h-40 bg-gray-300 rounded" />
                <p className="font-semibold">Person {num}</p>
                <a href="#" className="text-sm underline text-blue-500">See More ›</a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
