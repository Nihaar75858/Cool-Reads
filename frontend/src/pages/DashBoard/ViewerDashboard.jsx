import React, { useEffect, useState } from 'react';

const ViewerDashboard = () => {
  const [viewerName, setViewerName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setViewerName(storedUser.firstName);
      fetchBooks(); // No user ID passed here
      fetchNotifications(storedUser._id);
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/books`);
      const data = await res.json();

      // Only show accepted books
      const acceptedBooks = data.filter(book => book.status === 'accepted');
      setBooks(acceptedBooks);
      setFilteredBooks(acceptedBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };


  const fetchNotifications = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/notifications/${userId}`);
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const results = books.filter(book =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(results);
  };

  return (
    <div className="min-h-screen bg-custombg text-black px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {viewerName || 'Viewer'}!</h1>

      {/* Books Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Books</h2>

        <input
          type="text"
          placeholder="Search your books..."
          className="p-3 border border-gray-300 rounded w-full md:w-1/2 mb-6"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
              {book.bookCover && (
                <img
                  src={`http://localhost:5000/${book.bookCover}`}
                  alt="Book Cover"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="truncate mb-2">{book.abstract}</p>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <p className="text-gray-600 col-span-full">Add some books to find them here!.</p>
          )}
        </div>
      </section>

      {/* Notifications Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-600">No notifications yet.</p>
          ) : (
            notifications.map((note, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow-md">
                <p className="text-lg font-medium mb-2">{note.title}</p>
                <p className="text-gray-700">{note.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(note.date).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewerDashboard;
