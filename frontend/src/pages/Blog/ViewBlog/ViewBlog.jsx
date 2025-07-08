import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("An error occurred while deleting the blog.");
    }
  };

  return (
    <div className='min-h-screen bg-custombg p-6'>
      <h2 className="text-xl font-bold">All Blogs</h2>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog._id}`} key={blog._id} className='block mb-6 bg-logobg hover:shadow-lg transition-shadow duration-300 rounded-lg'>
          <div className="bg-white border p-4 shadow bg-logobg">
            <h3 className="text-lg font-semibold text-center rounded">{blog.title}</h3>
          </div>
          <div className="text-white bg-logobg p-4 mb-4 rounded-lg shadow">
            <p className="truncate mb-2">{blog.content}</p>
            <div className="flex justify-between items-center text-sm">
              <p>By: {blog.author} | {new Date(blog.createdAt).toLocaleString()}</p>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-navbg text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ViewBlogs;
