import React, { useEffect, useState } from 'react';
import axios from 'axios';
import genresList from '../../../components/Genres/Genres'; // Importing the genres list

const PubBooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeGenre, setActiveGenre] = useState('');

  useEffect(() => {
    const fetchPublicBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/public/pubbooks');
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
                    src={`http://localhost:5000/${book.bookCover}`}
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

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="text-blue-400 text-2xl">📚</span> COOL READS
            </h2>
            <p className="text-sm text-gray-300">
              Connecting People's talent with imagination and immersiveness one at a time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/publicblogs" className="hover:text-white">Blogs</a></li>
              <li><a href="/pubbooks" className="hover:text-white">Books</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

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
};

export default PubBooks;
