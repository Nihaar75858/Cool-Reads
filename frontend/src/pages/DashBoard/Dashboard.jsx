import React from 'react'
import { motion } from 'framer-motion';

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen">

      {/* Main Content */}
      <div className="p-12 bg-custombg">
        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text Section */}
            <div className="md:w-1/2">
              <h1 className="text-5xl font-bold mb-4">Welcome to <br></br>COOL READS</h1>
              <p className="text-gray-700 text-lg">
                Where you can read, connect, and share your world of literature.
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src="/dash.png"
                alt="Books"
                className="w-full h-128 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>


      <div className="p-12 bg-logobg">
        {/* Example: Cards Section */}
        <motion.div
          className="min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold text-center text-navtext mb-8">What We Offer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-navtext p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-center">Create</h2>
              <p className='text-xl text-justify'>
                Your can describe worlds that can entice readers
                to explore new worlds and ideas.
                Create your books and blogs with the world for everyone to see.
              </p>
            </div>
            <div className="bg-navtext p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-center">Share</h2>
              <p className='text-xl text-justify'>
                Interaction is the best form of flattery.
                Share your ideas and opinions with the world to inspire.
                Learn about the latest trends in the literary world.
                We ensure thorough checks to avoid any copyright
                infridgment from occuring.
              </p>
            </div>
            <div className="bg-navtext p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2 text-center">Socialize</h2>
              <p className='text-xl text-justify'>
                Write comments, write your opinions and make the world a closer place.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-navtext px-6 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-full bg-custombg rounded-2xl border border-blue-200 py-20 px-60 shadow-md text-center">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">Join the Success Community</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-20 mb-12">
              <div>
                <h3 className="text-3xl font-bold text-blue-600">100K</h3>
                <p className="text-lg font-bold text-gray-700 mt-1">Users Logged In</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-600">1000+</h3>
                <p className="text-lg font-bold text-gray-700 mt-1">Books added</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600">60K</h3>
                <p className="text-lg font-bold text-gray-700 mt-1">Blogs Made</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-orange-600">3x</h3>
                <p className="text-lg font-bold text-gray-700 mt-1">Socializing</p>
              </div>
            </div>

            {/* <p className="text-sm text-gray-800">
              <span className="font-bold">Money-back guarantee:</span> If you don't get a job within 6 months of graduation,
              we'll refund 100% of your counseling fees. That's our confidence in this program.
            </p> */}
            <h2 className="text-4xl font-bold mb-2 text-gray-900">... And GROWING!</h2>
          </div>
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
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blogs</a></li>
              <li><a href="#" className="hover:text-white">Books</a></li>
              <li><a href="#" className="hover:text-white">Register</a></li>
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

    </div >
  );
};

export default Dashboard;