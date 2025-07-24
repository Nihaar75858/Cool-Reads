import React, { useEffect, useState } from 'react';
import { useUser } from '../../../components/Context/UserContext';
import axios from 'axios';

const AdminNotification = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [replies, setReplies] = useState({}); // store reply text for each note

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(`http://localhost:5000/api/admin/help`);
      const data = await res.json();
      console.log(data);
      setNotifications(data);
    };

    fetchNotifications();
  }, [user]);

  const handleReplyChange = (id, value) => {
    setReplies(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSendReply = async (note) => {
    try {
      await axios.post('http://localhost:5000/api/admin/help/reply', {
        requestId: note._id,
        replyMessage: replies[note._id],
        userId: note.userId // include only if the request has user info
      });

      alert('Reply sent!');

      // ✅ Clear input field
      setReplies(prev => ({
        ...prev,
        [note._id]: ''
      }));

      // ✅ Remove the request from the list
      setNotifications(prev =>
        prev.filter(item => item._id !== note._id)
      );

    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Failed to send reply.');
    }
  };


  return (
    <div className="p-6 bg-custombg min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Help Center Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-6">
          {notifications.map((note) => (
            <li key={note._id} className="bg-navtext p-4 shadow rounded">
              <p className="font-bold">Subject: {note.subject}</p>
              <p className="text-gray-700">From: {note.name ? note.name : 'Anonymous'}</p>
              <p className="mb-2">{note.message}</p>
              <p className="text-sm text-gray-500">{new Date(note.date).toLocaleString()}</p>

              {/* Reply Section */}
              <div className="mt-4">
                <textarea
                  rows="2"
                  placeholder="Write your reply..."
                  value={replies[note._id] || ''}
                  onChange={(e) => handleReplyChange(note._id, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-2"
                ></textarea>
                <button
                  onClick={() => handleSendReply(note)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send Reply
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotification;
