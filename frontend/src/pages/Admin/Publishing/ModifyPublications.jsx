import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModifyPublications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/publications/view')
      .then(res => {
        const found = res.data.find(b => b._id === id);
        if (found) setBook(found);
        else navigate('/admin/reviewpublications');
      })
      .catch(err => console.error(err));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/publications/accept/${id}`, book);
      alert("Book updated successfully");
      navigate('/admin/reviewpublication');
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  if (!book) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-custombg py-6 text-black items-center flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Edit Book: {book.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto w-full p-6">
        
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Author(s)</label>
          <input
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-1">ISBN</label>
          <input
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Pages</label>
          <input
            name="pages"
            value={book.pages}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Abstract</label>
          <textarea
            name="abstract"
            value={book.abstract}
            onChange={handleChange}
            rows="5"
            className="w-full p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={book.status}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
          >
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default ModifyPublications;
