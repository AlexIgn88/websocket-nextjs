"use client";
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [isAvailable, setIsAvailable] = useState(null);
  // console.log('isAvailable=', isAvailable);

  useEffect(() => {
    const key = document.cookie.split('; ').find(row => row.startsWith('key='))?.split('=')[1];
    // console.log('key=', key);
    setIsAvailable(key);

    if (!key) {
      window.location.href = '/404';
      return;
    }

    let wsServerPath = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

    const socket = new WebSocket(`${wsServerPath}//${window.location.hostname}:3001/`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setInterval(() => {
        socket.send(key);
      }, 5000);
    };

    socket.onmessage = (evt) => {
      console.log('Message from server:', evt.data);
    };

    socket.onclose = function (evt) {
      if (evt.wasClean) {
        console.log(`[close] The connection is closed cleanly, the code=${evt.code} reason=${evt.reason}`);
      } else {
        console.log(`[close] The connection is interrupted, the code=${evt.code} reason=${evt.reason}`);
      }
    };

    socket.onerror = function (error) {
      console.log(`[error]`);
    };
    return () => {
      socket.close();
    };


  }, []);

  return (
    isAvailable &&
    <div>
      <h1>Secret Page</h1>
      <h2>Welcome to the Secret Page!</h2>
    </div>
  );
};

export default HomePage;