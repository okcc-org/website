// Events.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ────────────────────────────── animation variants ───────────────────────────── */
const fadeInUp = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const staggerItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

/* ───────────────────────────── helper components ─────────────────────────────── */
function AnimatedSection({ children, className = '' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px 0px'
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

const EventCard = React.memo(function EventCard({ event }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-col items-center mr-4">
            <span className="text-sm font-normal text-black">{event.month}</span>
            <span className="text-2xl font-bold text-black">{event.date}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-normal text-black">{event.time}</span>
              <span className="text-sm font-bold text-gray-400">{event.category}</span>
            </div>
            <h3 className="text-lg font-bold text-black leading-tight">{event.title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ─────────────────────────────── main component ──────────────────────────────── */
export default function Events() {
  const [searchTerm, setSearchTerm]   = useState('');
  const [selectedMonth]               = useState('June 2025');

  // sample events data (replace with API / props as needed)
  const events = [
    {
      id: 1,
      title: 'Seoul Dalbam Night Market',
      time: '6PM - 10PM',
      category: 'Cultural',
      date: '13',
      month: 'JUL',
      image: '/upcomingEvent.jpg'
    },
    {
      id: 2,
      title: 'Korean Language Class',
      time: '10AM - 12PM',
      category: 'Classes',
      date: '26',
      month: 'JUL',
      image: '/koreanClass.png'
    },
    {
      id: 3,
      title: 'K-pop Contest',
      time: '12PM - 6PM',
      category: 'K-pop',
      date: '26',
      month: 'JUL',
      image: '/news-image.png'
    },
    {
      id: 4,
      title: 'Korean Language Class (Virtual)',
      time: '6PM - 10PM',
      category: 'Classes',
      date: '26',
      month: 'JUL',
      image: '/koreanClass.png'
    },
    {
      id: 5,
      title: 'Cooking Class',
      time: '4PM - 6PM',
      category: 'Classes',
      date: '27',
      month: 'JUL',
      image: '/groupTutoring.jpeg'
    },
    {
      id: 6,
      title: 'Orlando Korea Festival',
      time: '9AM - 5PM',
      category: 'Cultural',
      date: '28',
      month: 'JUL',
      image: '/palace.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── hero ─────────────────────────────────────────────────────────────── */}
      <AnimatedSection className="relative w-full h-96 bg-gray-100">
        <div className="absolute inset-0">
          <img src="/background.png" alt="Events Background"
               className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white max-w-md mx-auto px-4"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* ── main content ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* search & nav bar */}
        <AnimatedSection className="mb-8">
          <motion.div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            {/* date nav */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              {/* arrows */}
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 transition flex items-center justify-center">
                  <div className="w-0 h-0 border-l-0 border-r-[10px] border-r-black
                                  border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
                </button>
                <button className="p-2 hover:bg-gray-100 transition flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] border-l-black border-r-0
                                  border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
                </button>
              </div>
              <button className="w-36 h-12 border border-black rounded bg-white
                                 hover:bg-black hover:text-white transition text-black text-lg font-normal">
                Today
              </button>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-black">{selectedMonth}</h2>
              </div>
            </motion.div>

            {/* search */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="bg-white border border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.2)] p-4 flex items-center gap-4">
                <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for event"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-black text-base font-normal outline-none"
                />
                <button
                  type="button"
                  className="bg-red-800 text-white px-6 py-2 rounded text-lg font-bold hover:bg-red-900 transition"
                >
                  Find Event
                </button>
              </div>
            </motion.form>
          </motion.div>
        </AnimatedSection>

        {/* events grid */}
        <AnimatedSection>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
                         {events.map(event => <EventCard key={event.id} event={event} />)}
          </motion.div>
        </AnimatedSection>

        {/* load more */}
        <AnimatedSection className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-800 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-red-900 transition"
          >
            Load More Events
          </motion.button>
        </AnimatedSection>
      </div>
    </div>
  );
}
