
import io from 'socket.io-client';

let socket;

const connectSocket = (user_id) => {
  if (!socket) {
    socket = io('http://localhost:3000', { // Update the URL to match your server's address
      query: `user_id=${user_id}`, // Ensure the query format matches your server expectations
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      socket = null; // Reset the socket instance on disconnect
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });
  }
};

export { socket, connectSocket };
