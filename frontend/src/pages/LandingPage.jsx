import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants for fade-in effects
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Animated section wrapper component
const AnimatedSection = ({ children, className = "" }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px 0px'
  });
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function Homepage() {
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for hero background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <main className="font-sans relative">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="w-full relative h-[70vh] md:h-screen overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img
            src="/background.png"
            alt="Orlando Korea Culture Center"
            className="w-full h-full object-cover md:object-center object-right"
          />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-black/40"
        />
        
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white text-center w-full max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal leading-tight md:leading-snug drop-shadow-xl break-words px-2"
            >
              안녕하세요,<br /> 올랜도 한국문화센터에 오신 것을 환영합니다.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 md:mt-8 font-light drop-shadow break-words px-2"
            >
              Hello, welcome to the Orlando Korea Culture Center.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-8 md:mt-12"
            >
              <Link
                to="/about"
                className="inline-block bg-red-700 hover:bg-red-800 text-white px-8 py-4 md:px-8 md:py-4 rounded-lg text-lg md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Explore Programs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
 
      {/* Upcoming Events */}
      <AnimatedSection className="bg-white py-20 px-6 w-full">
        <motion.div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-start gap-12 relative">
          {/* Left Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-black leading-tight">
              Upcoming Events
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 border border-black px-6 py-3 text-base font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Right Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img
              src="/upcomingEvent.jpg"
              alt="Upcoming Events"
              className="w-full md:max-w-[600px] aspect-video rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Stay in Touch */}
      <AnimatedSection className="bg-[#B82525] text-white py-16 px-6 w-full">
        <motion.div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Stay in Touch</h3>
            <p className="text-sm md:text-base text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </p>
          </motion.div>

          {/* Email Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full flex"
          >
            <input
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-l-md bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:bg-gray-50 transition-all duration-200"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-3 rounded-r-md text-sm font-bold hover:bg-gray-800 transition-all duration-300"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </motion.div>
      </AnimatedSection>

      {/* Programs */}
      <AnimatedSection className="py-20 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-4xl md:text-5xl font-black mb-6">Programs</h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
        >
          {/* Program Card 1 */}
          <motion.div
            variants={staggerItem}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
            style={{
              backgroundImage: "url('/koreanClass.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
              <h4 className="font-semibold text-white text-2xl md:text-3xl">Korean Language Class</h4>
              <Link
                to="/classes/language-class"
                className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Program Card 2 */}
          <motion.div
            variants={staggerItem}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
            style={{
              backgroundImage: "url('/groupTutoring.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
              <h4 className="font-semibold text-white text-2xl md:text-3xl">Group Tutoring</h4>
              <Link
                to="/classes/group-tutoring"
                className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Program Card 3 */}
          <motion.div
            variants={staggerItem}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
            style={{
              backgroundImage: "url('/travelClass.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
              <h4 className="font-semibold text-white text-2xl md:text-3xl">Traveler Class</h4>
              <Link
                to="/classes/traveler-class"
                className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Get Involved */}
      <AnimatedSection className="py-5 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-4xl md:text-5xl font-black mb-6">Get Involved</h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
        >
          {/* Get Involved Card 1 */}
          <motion.div
            variants={staggerItem}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
            style={{
              backgroundImage: "url('/attend.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
              <h4 className="font-semibold text-white text-2xl md:text-3xl">Attend</h4>
              <Link
                to="/classes/language-class"
                className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Get Involved Card 2 */}
          <motion.div
            variants={staggerItem}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
            style={{
              backgroundImage: "url('/volunteer.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
              <h4 className="font-semibold text-white text-2xl md:text-3xl">Volunteer</h4>
              <Link
                to="/classes/group-tutoring"
                className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Get Involved Card 3 */}
          <motion.div
            variants={staggerItem}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg"
            style={{
              backgroundImage: "url('/donate.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/60">
              <h4 className="font-semibold text-white text-2xl md:text-3xl">Donate</h4>
              <Link
                to="/classes/traveler-class"
                className="mt-2 text-base md:text-lg underline text-white hover:text-red-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatedSection>
    </main>
  );
}

