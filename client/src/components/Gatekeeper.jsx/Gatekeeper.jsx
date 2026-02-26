import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gatekeeper.css';

export default function Gatekeeper({ onClose }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Your actual phone number goes here
  const ADMIN_PHONE = "8787480056"; 

  const handleVerify = (e) => {
    e.preventDefault();
    
    if (phone === ADMIN_PHONE) {
      navigate('/admin-login', { state: { passedGatekeeper: true } });
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="gatekeeper-overlay" onClick={onClose}>
      <div className="gatekeeper-box" onClick={(e) => e.stopPropagation()}>
        <h3>SYSTEM VERIFICATION</h3>
        <form onSubmit={handleVerify}>
          <input 
            type="password" /* Use password type so nobody looking over your shoulder sees the number */
            placeholder="Enter verification code..." 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={error ? 'error-shake' : ''}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}