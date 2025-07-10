import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const genres = ['Crime', 'Horror', 'Wonder', 'Science Fiction', 'Romance', 'Fantasy', 'Popular'];
  const [selectedGenre, setSelectedGenre] = useState('Popular');

  return (
    <div className="min-h-screen bg-custombg text-gray-800 ">

      <div className="relative w-full h-[450px]">
        {/* Background Image */}
        <img
          src="/aboutbg.jpg"
          alt="COOL Reads"
          className="w-full h-full"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About COOL Reads</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              COOL Reads is a creative ecosystem for readers, writers, and thinkers to share, explore, and connect.
            </p>
          </motion.div>
        </div>
      </div>


      <div className="space-y-12 p-8 pb-20">

        {/* Mission Section */}
        <section className="text-black p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl mb-4">Our Mission</h2>
            <p className="text-2xl leading-relaxed">
              We aim to democratize literary expression. Whether you're an aspiring author, a passionate reader,
              or someone who just wants to explore thought-provoking content, COOL Reads provides you with the
              tools to write, read, and interact with a diverse community.
            </p>
          </motion.div>
        </section>

      </div>

      <div className="space-y-12">

        {/* Values Section */}
        <section className='bg-black text-white p-8 pb-20'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl mb-12">What Sets Us Apart</h2>
            <ul className="list-disc list-inside text-2xl space-y-6 px-8">
              <li><strong>Empowerment:</strong> Anyone can publish their ideas and gain recognition.</li>
              <li><strong>Engagement:</strong> Social features like comments, collections, and notifications foster interaction.</li>
              <li><strong>Trust:</strong> A role-based system ensures content authenticity and protects original work.</li>
              <li><strong>Community:</strong> We believe literature is best when shared and discussed openly.</li>
            </ul>
          </motion.div>
        </section>

        {/* How it Works Section */}
        <section className="pb-20 p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl mb-4">How It Works</h2>
            <p className="text-2xl leading-relaxed">
              Authors can create books and blogs, which are moderated and stored under their profile.
              Viewers can browse, collect, and comment on content, helping authors grow. Admins maintain
              quality and integrity across the platform.
            </p>
          </motion.div>
        </section>

      </div>


      <div className="bg-white px-6 relative space-y-12 py-12">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl text-gray-900">Wide Range of Genres</h1>
          <p className="text-lg text-gray-600 mt-2">Explore books that match your interests</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-12 border-b border-gray-200 mt-6">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`pb-2 text-lg font-medium ${selectedGenre === genre
                ? 'text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-700 hover:text-blue-500'
                }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-end mt-6 pr-6">
          <button 
          onClick={() => window.location.href = '/pubbooks'}
          className="text-blue-600 font-medium flex items-center gap-1 hover:underline">
            View All
            <span className="text-xl">›</span>
          </button>
        </div>

        {/* Floating Icons */}
        <div className="fixed bottom-6 right-6 space-y-4 z-50">
          <button className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
            💬
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
          >
            ↑
          </button>
        </div>
      </div>

      <div className="space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Call to Action */}
          <section className="bg-logobg text-white py-20 text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-4">Join Our Movement</h2>
            <p className="text-lg mb-6">
              Whether you’re here to read, write, or just get inspired — COOL Reads is your literary playground.
            </p>
            <a
              href="/register"
              className="bg-navtext text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
            >
              Get Started
            </a>
          </section>
        </motion.div>
      </div>

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Logo + About */}
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="text-blue-400 text-2xl">📚</span> COOL READS
            </h2>
            <p className="text-sm text-gray-300">
              Connecting People's talent with imagination and immersiveness one at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/publicblogs" className="hover:text-white">Blogs</a></li>
              <li><a href="/pubbooks" className="hover:text-white">Books</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">
              4th Street, Literature Street<br />
              ABS, New York, NW 702-1234
            </p>
            <p className="text-sm text-gray-300 mb-2">contact@CoolReads.com</p>
            <p className="text-sm text-gray-300">+91 (819) 233-1213</p>
          </div>

        </div>

        <div className="text-center text-gray-500 text-xs mt-10">
          &copy; {new Date().getFullYear()} COOL Reads. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;
