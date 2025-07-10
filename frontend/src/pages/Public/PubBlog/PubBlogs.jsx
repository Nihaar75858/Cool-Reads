import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PubBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='min-h-screen bg-custombg'>
      <div className='p-6'>
        <h2 className="text-xl font-bold">All Blogs</h2>
        {blogs.map((blog) => (
          <Link to={`/login`} key={blog._id} className='block mb-6 bg-logobg hover:shadow-lg transition-shadow duration-300 rounded-lg'>
            <div className="bg-white border p-4 shadow bg-logobg">
              <h3 className="text-lg font-semibold text-center rounded">{blog.title}</h3>
            </div>
            <div className="text-white bg-logobg p-4 mb-4 rounded-lg shadow">
              <p className="truncate mb-2">{blog.content}</p>
              <div className="flex justify-between items-center text-sm">
                <p>By: {blog.author} | {new Date(blog.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
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
              <li><a href="/about" className="hover:text-white">About</a></li>
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
}

export default PubBlogs;
