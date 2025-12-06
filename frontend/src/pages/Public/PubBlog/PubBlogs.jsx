import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../../../components/Config/config';
import Footer from '../../../components/Footer/Footer';

const PubBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/blogs`)
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

        <Footer />
    </div>
  );
}

export default PubBlogs;
