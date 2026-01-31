import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    // USE YOUR RENDER URL HERE
    axios.get('https://fashion-api.onrender.com/')
      .then(res => setStatus(res.data.message))
      .catch(err => setStatus('Error connecting to backend'));
  }, []);

  return (
    <div>
      <h1>Fashion Marketplace</h1>
      <p>Backend Status: {status}</p>
    </div>
  );
}
export default App;