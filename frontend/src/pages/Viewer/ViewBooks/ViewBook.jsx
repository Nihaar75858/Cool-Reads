import React, { useState, useEffect } from 'react';
import { useUser } from '../../../components/Context/UserContext';

const ViewBook = () => {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/viewer/books`);
            const data = await res.json();

            setBooks(data);
            setFilteredBooks(data);
        } catch (err) {
            console.error("Failed to fetch books:", err);
        }
    };

    const handleAddToCollection = async (bookId) => {
        try {
            if (!user._id) {
                alert("You must be logged in to add books.");
                return;
            }

            const res = await fetch(`http://localhost:5000/api/books/${user._id}/clone/${bookId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user._id}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (res.ok) {
                alert('Book added to your collection!');
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (err) {
            console.error('Failed to add book:', err);
            alert('Server error');
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
            <h1 className="text-3xl font-bold mb-6">Add books to your collection!</h1>

            {/* Books Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Books</h2>

                <input
                    type="text"
                    placeholder="Search books..."
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

                            {/* Add to My Collection Button */}
                            <button
                                onClick={() => handleAddToCollection(book._id)}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add to My Collection
                            </button>
                        </div>
                    ))}
                    {filteredBooks.length === 0 && (
                        <p className="text-gray-600 col-span-full">No books found.</p>
                    )}
                </div>
            </section>
        </div>
    )
}

export default ViewBook