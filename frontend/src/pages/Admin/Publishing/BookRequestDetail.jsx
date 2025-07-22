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
    <div className="min-h-screen bg-custombg p-6 text-black justify-center items-center flex flex-col">

      <form className="space-y-4 max-w-xl mx-auto w-full p-6">

        <h2 className="text-3xl font-bold mb-4 text-center mx-auto">{book.title}</h2>
        {book.bookCover && (
          <div className="my-4 items-center flex justify-center">
            <img
              src={`http://localhost:5000/${book.bookCover}`}
              alt="Book Cover"
              className="max-w-xs rounded"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-bold">Author(s)</label>
          <p className="text-black mx-20">{book.authorNames.join(', ')}</p>
        </div>

        <div>
          <label className="block mb-1 font-bold">ISBN</label>
          <p className="text-black mx-20">{book.isbn}</p>
        </div>

        <div>
          <label className="block mb-1 font-bold">Pages</label>
          <p className="text-black mx-20">{book.pages}</p>
        </div>

        <div>
          <label className="block mb-1 font-bold">Abstract</label>
          <p className="text-black mx-20">{book.abstract}</p>
        </div>

        <div>
          <label className="block mb-1 font-bold">Genres</label>
          <p className="text-black mx-20">{book.genres.join(', ')}</p>
        </div>

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
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 items-center flex text-white mx-auto justify-center"
          >
            Accept Book
          </button>
        )}

      </form>
    </div>
  );
};

export default BookRequestDetail;
