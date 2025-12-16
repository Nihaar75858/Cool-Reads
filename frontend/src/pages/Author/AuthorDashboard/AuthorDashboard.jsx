import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../components/Config/config";
import { useUser } from "../../../components/Context/AuthContext";
import { useProfile } from "../../../components/Context/ProfileContext";

const AuthorDashboard = () => {
  const { user } = useUser();
  const { profile } = useProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    fetchBooks(user.id)
  }, [user?.id]);

  const fetchBooks = async (authorId) => {
    try {
      const res = await fetch(`${API_BASE}/api/books/author/${authorId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await res.json();

      const acceptedBooks = data.filter((book) => book.status === "accepted");
      setBooks(acceptedBooks);
      setFilteredBooks(acceptedBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(results);
  };

  return (
    <div className="min-h-screen bg-custombg">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome back, {profile?.firstName || "Author"}!
        </h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search your books..."
          className="p-3 border border-gray-300 rounded w-full md:w-1/2 mb-6"
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
              {/* Book Cover Image */}
              {book.bookCover && (
                <img
                  src={`${API_BASE}/${book.bookCover}`} // Adjust if you use a different static path
                  alt="Book Cover"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="truncate mb-2">{book.abstract}</p>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <p className="text-gray-600 col-span-full">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
