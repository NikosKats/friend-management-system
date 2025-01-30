// src/components/Notification.tsx
import React, { useEffect, useState } from 'react';

const Notification: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080'); // Use your backend WebSocket server

    socket.onmessage = (event) => {
      setMessage(event.data); // Assuming the message is a simple string
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="notification">
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
