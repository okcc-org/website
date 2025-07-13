import React from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <>
      <main className="w-full px-4 py-16 space-y-20">
        {/* Our Story */}
        <section className="w-full bg-white">
          <div className="max-w-[1550px] mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-16">

            {/* Text Column */}
            <div className="flex-1 text-left space-y-6">
              <h2 className="text-5xl font-extrabold leading-tight">Our Story</h2>
              <p className="text-gray-700 text-3xl leading-relaxed">
                The Orlando Korea Culture Center is dedicated to providing insights into the rich cultural heritage of Korea.
                We encourage everyone to visit and learn something new about a nation with a history spanning more than 5,000 years.
                We hold annual events such as the Korean Speech Contest, Global Taste of Korea, our Annual K-pop Contest,
                and the Orlando Korea Festival.
              </p>
            </div>

            {/* Image Column */}
            <div className="flex-1 flex justify-end">
              <img
                src="/palace.jpg"
                alt="Palace"
                className="w-full object-contain rounded-lg"
              />
            </div>


          </div>
        </section>



        {/* Mission */}
        <section className="bg-gray-100 py-10 px-6 rounded shadow-sm w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Mission</h3>
            <p className="text-gray-700">
              The goal of the Orlando Korean Culture Center is to create an understanding of Korean culture
              and to promote a more active people-to-people exchange between the Republic of Korea and
              other cultures in Orlando through diverse programs and events.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-gray-100 py-10 px-6 rounded shadow-sm w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Vision</h3>
            <p className="text-gray-700">
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
