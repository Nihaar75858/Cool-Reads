import React, { useEffect, useState } from 'react';
import axios from 'axios';
import genresList from '../../../components/Genres/Genres'; // Importing the genres list
import { API_BASE } from '../../../components/Config/config';
import Footer from '../../../components/Footer/Footer';

const PubBooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeGenre, setActiveGenre] = useState('');

  useEffect(() => {
    const fetchPublicBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/public/pubbooks`);
        const publishedBooks = res.data.filter(book => book.status === 'published');
        setBooks(publishedBooks);
        console.log('Fetched books:', publishedBooks);
        setFilteredBooks(publishedBooks);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };

    fetchPublicBooks();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterBooks(query, activeGenre);
  };

  const handleGenreClick = (genre) => {
    const newGenre = genre === activeGenre ? '' : genre; // toggle if clicked again
    setActiveGenre(newGenre);
    filterBooks(searchQuery, newGenre);
  };

  const filterBooks = (query, genre) => {
    let result = books;

    if (genre) {
      result = result.filter(book =>
        book.genres?.includes(genre)
      );
    }

    if (query) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredBooks(result);
  };

  return (
    <div className="min-h-screen bg-custombg">
      <div className="p-8">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search books..."
          className="p-3 border border-gray-300 rounded w-full md:w-1/2 mb-6"
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* Genres Filter */}
        <div className="flex flex-wrap mb-6 gap-2">
          {genresList.map((genre) => (
            <button
              key={genre.value}
              onClick={() => handleGenreClick(genre.value)}
              className={`px-4 py-2 rounded-full text-sm border ${
                activeGenre === genre.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {genre.label}
            </button>
          ))}
          {activeGenre && (
            <button
              onClick={() => handleGenreClick('')}
              className="px-4 py-2 rounded-full text-sm bg-red-500 text-white"
            >
              Clear Genre
            </button>
          )}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                {book.bookCover && (
                  <img
                    src={`${API_BASE}/${book.bookCover}`}
                    alt="Book Cover"
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="truncate mb-2">{book.abstract}</p>
                {book.genres?.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Genres: {book.genres.join(', ')}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">No books found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PubBooks;
