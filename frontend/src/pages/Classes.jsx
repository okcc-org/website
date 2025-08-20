import React from 'react';
import useTitle from '../hooks/useTitle';

const classes = [
  {
    title: 'Korean Language Class',
    description:
      'Learn to speak, read, and write Korean with our immersive language courses led by native Korean teachers.',
    image: '/koreanClass.png',
    imagePosition: 'left',
    link: '/classes/language-class',
  },
  {
    title: 'Group Tutoring',
    description:
      'Collaborate and grow with peers in our small group tutoring sessions designed for personalized learning.',
    image: '/groupTutoring.jpeg',
    imagePosition: 'right',
    link: '/classes/group-tutoring',
  },
  {
    title: "Traveler's Korean Class",
    description:
      'Prepare for your journey to Korea by learning essential phrases, etiquette, and cultural tips for travelers.',
    image: '/travelClass.png',
    imagePosition: 'left',
    link: '/classes/traveler-class',
  },
];

export default function Classes() {
  useTitle("Classes | OKCC");
  return (
    <div className="bg-white">
      {/* Hero Image */}
      <section className="w-full relative h-[600px]">
        <img
          src="/classes.png"
          alt="Korean Language School"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/50 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Korean Language School
          </h1>
          <p className="text-base md:text-xl text-white max-w-3xl drop-shadow">
            Learn to speak, read, and write Korean while immersing yourself in Korean culture. Practice your pronunciation with confidence and gain deeper insights by asking questions directly to our native Korean teachers.
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20" />

      {/* Class Sections */}
      <section className="max-w-7xl mx-auto px-4 space-y-20 pb-24">
        {classes.map((cls, idx) => (
          <div
            key={cls.title}
            className={`flex flex-col md:flex-row ${cls.imagePosition === 'right' ? 'md:flex-row-reverse' : ''} items-center gap-10`}
          >
            {/* Image */}
            <div className="md:w-1/2 w-full">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{cls.title}</h2>
              <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">{cls.description}</p>
              <a
                href={cls.link}
                className="inline-block border border-black rounded-full px-6 py-3 text-base font-semibold hover:bg-black hover:text-white transition"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
