import React from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';

const AboutPage = () => {
  useTitle("About Us | OKCC");
  return (
    <>
      <main className="w-full px-4 py-8 md:py-16 space-y-12 md:space-y-20">
        {/* Our Story */}
        <section className="w-full bg-white">
          <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

            {/* Text Column */}
            <div className="flex-1 text-left space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">Our Story</h2>
              <p className="text-gray-700 text-base md:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                The Orlando Korea Culture Center is dedicated to providing insights into the rich cultural heritage of Korea.
                We encourage everyone to visit and learn something new about a nation with a history spanning more than 5,000 years.
                We hold annual events such as the Korean Speech Contest, Global Taste of Korea, our Annual K-pop Contest,
                and the Orlando Korea Festival.
              </p>
            </div>

            {/* Image Column */}
            <div className="flex-1 flex justify-center md:justify-end w-full">
              <img
                src="/palace.jpg"
                alt="Palace"
                className="w-full max-w-md md:max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-100 py-8 md:py-10 px-4 md:px-6 rounded-lg shadow-sm w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Mission</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              The goal of the Orlando Korean Culture Center is to create an understanding of Korean culture
              and to promote a more active people-to-people exchange between the Republic of Korea and
              other cultures in Orlando through diverse programs and events.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-gray-100 py-8 md:py-10 px-4 md:px-6 rounded-lg shadow-sm w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Vision</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Here at OKCC we strive to create a community that encourages intercultural connections.
              We hope that by helping our community members become familiar with Korean people, culture, and history,
              we can create a more welcoming and open society for all.
            </p>
          </div>
        </section>

        {/* Our Team */}
        <section className="max-w-6xl mx-auto text-center px-4 py-16">
          <h2 className="text-2xl font-black mb-8">Our Team</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Joshua Jung', img: '/joshua.avif' },
              { name: 'Jessica Arlene', img: '/jessica.avif' },
              { name: 'Gaeun Lee', img: '/gaeun.avif' },
              { name: 'Seungju Lee', img: '/sj.avif' },
            ].map((person, idx) => (
              <div key={idx} className="space-y-2 text-center">
                <img
                  src={person.img}
                  alt={person.name}
                  width={318}
                  height={323}
                  className="mx-auto rounded object-cover"
                />
                <p className="font-semibold">{person.name}</p>
                <a className="text-sm underline text-black-500">See More</a>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
};

export default AboutPage;
