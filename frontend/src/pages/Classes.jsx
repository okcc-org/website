import React from 'react';

const classes = [
  {
    title: 'Korean Language Class',
    description:
      'Learn to speak, read, and write Korean with our immersive language courses led by native Korean teachers.',
    imagePosition: 'left',
    link: '/classes/language-class',
  },
  {
    title: 'Group Tutoring',
    description:
      'Collaborate and grow with peers in our small group tutoring sessions designed for personalized learning.',
    imagePosition: 'right',
    link: '/classes/group-tutoring',
  },
  {
    title: "Traveler's Korean Class",
    description:
      'Prepare for your journey to Korea by learning essential phrases, etiquette, and cultural tips for travelers.',
    imagePosition: 'left',
    link: '/classes/traveler-class',
  },
];

export default function Classes() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      {/* Hero Section with Gray Background */}
<section className="w-full min-h-[600px] bg-gray-200 flex flex-col justify-center items-center text-center px-4">
  <div className="bg-white/70 p-6 rounded-xl max-w-2xl">
    <h1 className="text-4xl font-black mb-4">Korean Language School</h1>
    <p className="text-base text-black">
      Learn to speak, read, and write Korean while immersing yourself in Korean culture. Practice your pronunciation with confidence and gain deeper insights by asking questions directly to our native Korean teachers. Join us and embark on a rewarding journey to mastering the Korean language!
    </p>
  </div>
</section>


      {/* Classes */}
      <section className="max-w-6xl mx-auto px-4 space-y-16 pb-16">
        {classes.map((cls, idx) => (
          <div
            key={cls.title}
            className={`flex flex-col md:flex-row ${cls.imagePosition === 'right' ? 'md:flex-row-reverse' : ''} items-center bg-gray-50 rounded-2xl shadow-md overflow-hidden`}
          >
            {/* Placeholder Image */}
            <div className="md:w-1/2 w-full h-64 md:h-80 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>

            {/* Text Content */}
            <div className="md:w-1/2 w-full p-8 text-center md:text-left">
              <h2 className="text-xl font-bold mb-2">{cls.title}</h2>
              <p className="text-gray-700 mb-4">{cls.description}</p>
              <a
                href={cls.link}
                className="inline-block border border-black rounded-full px-6 py-2 text-sm font-semibold hover:bg-black hover:text-white transition"
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
