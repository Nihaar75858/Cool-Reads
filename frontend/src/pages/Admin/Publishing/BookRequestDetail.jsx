import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/request')
      .then(res => {
        const found = res.data.find(b => b._id === id);
        if (found) setBook(found);
        else navigate('/admin/viewpublications'); // redirect if not found
      })
      .catch(err => console.error(err));
  }, [id, navigate]);

  const handleAccept = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/accept/${id}`);
      alert("Book accepted successfully");
      navigate('/admin/viewpublications');
    } catch (err) {
      console.error('Error accepting request:', err);
    }
  };

  if (!book) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-custombg p-6 text-black">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <p><strong>Author(s):</strong> {book.authorNames.join(', ')}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Date Added:</strong> {new Date(book.dateAdded).toLocaleDateString()}</p>
      <p><strong>Abstract:</strong> {book.abstract}</p>
      <p><strong>Status:</strong> {book.status}</p>

      {book.bookCover && (
        <div className="my-4">
          <img
            src={`http://localhost:5000/${book.bookCover}`}
            alt="Book Cover"
            className="max-w-xs rounded"
          />
        </div>
      )}

      {book.bookDocument && (
        <div className="mb-4">
          <a
            href={`http://localhost:5000/${book.bookDocument}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300"
          >
            View / Download Book File
          </a>
        </div>
      )}

      {book.status === 'pending' && (
        <button
          onClick={handleAccept}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Accept Book
        </button>
      )}
    </div>
  );
};

export default BookRequestDetail;
