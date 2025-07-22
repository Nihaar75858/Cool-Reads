import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { useUser } from '../../../components/Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import genresList from '../../../components/Genres/Genres'; // Importing the genres list

const AddBook = () => {
  const [bookName, setBookName] = useState('');
  const [authorNames, setAuthorNames] = useState(['']);
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [abstract, setAbstract] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [authorId, setAuthorId] = useState('');
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (user) { 
      setAuthorId(user.id); // Set authorId from user context  
      console.log("Author ID:", user.id);
    } else {
      console.error("User not found in context"); 
    }
  }, [user]); // Run effect when user changes

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...authorNames];
    updatedAuthors[index] = value;
    setAuthorNames(updatedAuthors);
  };

  const addAuthorField = () => {
    setAuthorNames([...authorNames, '']);
  };

  const handleBookUpload = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("User not found. Please log in again.");
      return;
    }

    if (!bookFile || !coverImage) {
      setError('Please upload both the book file and cover image.');
      return;
    }

    if (authorNames.length === 0 || authorNames.some(name => !name.trim())) {
      setError('Author names cannot be empty');
      return;
    }

    if (selectedGenres.length === 0) {
      setError('Please select at least one genre.');
      return;
    }

    const formData = new FormData();
    formData.append('authorId', authorId);
    formData.append('title', bookName);
    formData.append('pages', pages);
    formData.append('isbn', isbn);
    formData.append('dateAdded', dateAdded);
    formData.append('abstract', abstract);
    formData.append('bookDocument', bookFile);
    formData.append('bookCover', coverImage);
    authorNames.forEach(name => formData.append('authorNames', name));
    selectedGenres.forEach(genre => formData.append('genres', genre.value));

    console.log("FormData ready to send");

    try {
      const res = await axios.post('http://localhost:5000/api/books/request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        alert('Book added successfully!');
        console.log("Book request submitted successfully:", res.data);
        navigate('/author/authordashboard');
      } else {
        setError(res.data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('An error occurred while uploading the book.');
    }
  };


  return (
    <div className="min-h-screen bg-custombg flex items-center justify-center p-6">
      <form
        onSubmit={handleBookUpload}
        className="p-8 rounded-lg w-full max-w-3xl space-y-6"
      >
        <h2 className="text-3xl font-bold">Add a New Book</h2>

        {error && <div className="text-red-600 text-center">{error}</div>}

        <div>
          <label className="block text-gray-700 mb-1">Book Name</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Author Name(s)</label>
          {authorNames.map((author, index) => (
            <input
              key={index}
              type="text"
              value={author}
              onChange={(e) => handleAuthorChange(index, e.target.value)}
              className="w-full border rounded px-4 py-2 mb-2"
              required
            />
          ))}
          <button
            type="button"
            onClick={addAuthorField}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add another author
          </button>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Number of Pages</label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">ISBN Number</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Date Completed</label>
          <input
            type="date"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Abstract</label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="w-full border rounded px-4 py-2"
            rows={4}
            required
          />
        </div>

        {/* ✅ Fancy genres multi-select */}
        <div>
          <label className="block mb-1">Select Genres</label>
          <Select
            isMulti
            options={genresList}
            value={selectedGenres}
            onChange={setSelectedGenres}
            className="text-black"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Book File (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setBookFile(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Book Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit Book
          </button>
          <button
            type="button"
            onClick={() => navigate('/authordashboard')}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Cancel
          </button>
        </div>
        {message && <div className="text-green-600 text-center">{message}</div>}
      </form>
    </div>
  );
};

export default AddBook;
