import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../components/Context/UserContext';

const AuthorNotifications = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorBooks = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/books/author/${user._id}`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorBooks();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600';
      case 'Rejected':
        return 'text-red-600';
      case 'Pending':
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-custombg p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-navtext">Your Book Notifications</h1>

        {loading ? (
          <p className="text-gray-600">Loading notifications...</p>
        ) : books.length === 0 ? (
          <p className="text-gray-600">No books submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book._id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                    <p className={`mt-1 font-medium ${getStatusColor(book.status)}`}>
                      Status: {book.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AuthorNotifications;
