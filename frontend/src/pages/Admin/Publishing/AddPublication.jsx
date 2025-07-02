import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';

const AddPublication = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    pages: '',
    cover: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cover') {
      setFormData({ ...formData, cover: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('genre', formData.genre);
    data.append('description', formData.description);
    data.append('pages', formData.pages);
    data.append('cover', formData.cover);
    data.append('book', formData.book); // Assuming you also want to upload the book file

    try {
      const res = await fetch('/api/publications/add', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        alert('Book submitted for publication!');
        setFormData({ title: '', genre: '', description: '', pages: '', cover: null });
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Server error.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-10">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Add New Publication</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Number of Pages</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Cover Image</label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Book</label>
            <input
              type="file"
              name="book"
              accept="pdf/*"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit for Publication
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPublication;
