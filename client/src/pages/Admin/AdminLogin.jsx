import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state || !location.state.passedGatekeeper) {
    return <Navigate to="/" replace />;
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Talk to Supabase to verify the credentials
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid credentials. Access denied.');
      setLoading(false);
    } else {
      // Success! Send them to the dashboard
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h1 className="admin-logo">OPIHAGE</h1>
        <p className="admin-subtitle">Welcome Back :)</p>
        
        <form onSubmit={handleLogin} className="admin-form">
          {error && <div className="admin-error">{error}</div>}
          
          <input 
            type="email" 
            placeholder="Authorized Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'ENTER VAULT'}
          </button>
        </form>
      </div>
    </div>
  );
}