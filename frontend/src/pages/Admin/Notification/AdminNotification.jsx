import React, { useEffect, useState } from 'react';
import { useUser } from '../../../components/Context/UserContext';

const AdminNotification = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?._id) return;
      const res = await fetch(`http://localhost:5000/api/notifications/${user._id}`);
      const data = await res.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li key={note._id} className="bg-white p-4 shadow rounded">
              <a href={note.link} className="text-blue-600 hover:underline">{note.message}</a>
              <p className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotification;
