import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReviewPublication = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/publications/view')
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  console.log("Requests:", requests);

  return (
    <div className="min-h-screen p-6 bg-custombg">
      <h2 className="text-2xl font-bold mb-4">Review Books</h2>
      {requests.length === 0 ? (
        <p className="text-white">No new requests</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id}>
              <Link to={`/admin/modifybook/${req._id}`} className="block bg-logobg p-4 rounded shadow text-white hover:bg-opacity-80">
                <p><strong>Title:</strong> {req.title}</p>
                <p><strong>Author(s):</strong> {req.authorNames}</p>
                <p><strong>Status:</strong> <span className="capitalize">{req.status}</span></p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPublication;
