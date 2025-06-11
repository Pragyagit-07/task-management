//src/components/Notifications.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
      _id: string;
  message: string;
  createdAt?: string;
  read?: boolean;
  status?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        
        if (!token) return;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);
   const markAsRead = async (id: string) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/notifications/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true, status: 'archived' } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Notifications</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={` p-2 rounded text-sm  ${
                notification.read ? 'bg-gray-200 text-gray-600' : 'bg-gray-100'
              }`}
            >
                 
    
              <div>{notification.message}</div>
              {notification.createdAt && (
                <div className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              )}
              <div className="mt-1 space-x-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}