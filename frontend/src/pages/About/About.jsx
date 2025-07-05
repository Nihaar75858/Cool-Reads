import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-custombg text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-navtext">About COOL Reads</h1>
          <p className="text-lg text-gray-700">
            COOL Reads is a creative ecosystem for readers, writers, and thinkers to share, explore, and connect.
          </p>
        </div>

        {/* Mission Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We aim to democratize literary expression. Whether you're an aspiring author, a passionate reader,
            or someone who just wants to explore thought-provoking content, COOL Reads provides you with the
            tools to write, read, and interact with a diverse community.
          </p>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">What Sets Us Apart</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li><strong>Empowerment:</strong> Anyone can publish their ideas and gain recognition.</li>
            <li><strong>Engagement:</strong> Social features like comments, collections, and notifications foster interaction.</li>
            <li><strong>Trust:</strong> A role-based system ensures content authenticity and protects original work.</li>
            <li><strong>Community:</strong> We believe literature is best when shared and discussed openly.</li>
          </ul>
        </section>

        {/* How it Works Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg leading-relaxed">
            Authors can create books and blogs, which are moderated and stored under their profile.
            Viewers can browse, collect, and comment on content, helping authors grow. Admins maintain
            quality and integrity across the platform.
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-logobg text-white rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-lg mb-6">
            Whether you’re here to read, write, or just get inspired — COOL Reads is your literary playground.
          </p>
          <a
            href="/register"
            className="bg-white text-navtext font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Get Started
          </a>
        </section>

      </div>
    </div>
  );
};

export default About;
