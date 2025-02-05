import React, { useEffect } from 'react';
import { useSocketContext } from './context/SocketContext';  

const OnlineUsers = () => {
  const { onlineUsers } = useSocketContext();  // Get online users from context

  useEffect(() => {
    console.log('Online Users:', onlineUsers);  // You can log or display the online users
  }, [onlineUsers]);  // Runs whenever onlineUsers changes

  return (
    <div>
      <h3>Online Users:</h3>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user._id}>{user.username}</li>  // Display user names
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
