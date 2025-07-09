import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PubBooks = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const fetchPublicBooks = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/public/pubbooks`);
            const data = await res.json();

            const acceptedBooks = data.filter(book => book.status === 'published');
            setBooks(acceptedBooks);
            setFilteredBooks(acceptedBooks);
        } catch (err) {
            console.error("Failed to fetch books:", err);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/public/pubbooks')
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const results = books.filter(book =>
            book.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBooks(results);
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

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
                            {/* Book Cover Image */}
                            {book.bookCover && (
                                <img
                                    src={`http://localhost:5000/${book.bookCover}`} // Adjust if you use a different static path
                                    alt="Book Cover"
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                            <p className="truncate mb-2">{book.abstract}</p>
                        </div>
                    ))}
                    {books.length === 0 && (
                        <p className="text-gray-600 col-span-full">No books found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PubBooks;
