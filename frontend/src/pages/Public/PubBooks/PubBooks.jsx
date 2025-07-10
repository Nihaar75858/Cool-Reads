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

            <footer className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Logo + About */}
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                            <span className="text-blue-400 text-2xl">📚</span> COOL READS
                        </h2>
                        <p className="text-sm text-gray-300">
                            Connecting People's talent with imagination and immersiveness one at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/about" className="hover:text-white">About</a></li>
                            <li><a href="/publicblogs" className="hover:text-white">Blogs</a></li>
                            <li><a href="/pubbooks" className="hover:text-white">Books</a></li>
                            <li><a href="/register" className="hover:text-white">Register</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
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
