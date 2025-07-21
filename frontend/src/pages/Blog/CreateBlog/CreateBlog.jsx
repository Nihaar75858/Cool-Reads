import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../../components/Context/UserContext';

const CreateBlog = () => {
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setAuthorFirstName(user.firstName);
      setAuthorLastName(user.lastName);
      setAuthorId(user.id);

      console.log("Author First Name:", user.firstName);
      console.log("Author Last Name:", user.lastName);
      console.log("Author id:", user.id);
    }
  }, [user]); // <-- rerun effect when user changes


  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      const payload = {
        ...formData,
        author: authorFirstName + " " + authorLastName,
        authorId: user._id, // ✅ send MongoDB ObjectId of the author
      };

      await axios.post('http://localhost:5000/api/blogs', payload);
      alert('Blog created!');
      setFormData({ title: '', content: '' });
      navigate('/viewblogs');
    } catch (err) {
      alert('Error creating blog');
      console.error(err);
    }
  };


  return (
    <div className='min-h-screen bg-custombg flex items-center justify-center p-6'>

      <form onSubmit={handleSubmit} className="p-8 rounded-lg w-full max-w-3xl space-y-6">

        <h2 className="text-3xl font-bold">
          Create a New Blog
        </h2>

        <div>
          <label htmlFor="title" className="block text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border rounded px-4 py-2" />
        </div>

        <div>
          <label htmlFor="content" className="block text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            required
            className="block border px-2 py-1 w-full" />
        </div>

        <p className="text-sm text-gray-500">Author: {authorFirstName + " " + authorLastName || 'Author'}</p>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit Blog
          </button>
          <button
            type="button"
            onClick={() => navigate('/authordashboard')}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
