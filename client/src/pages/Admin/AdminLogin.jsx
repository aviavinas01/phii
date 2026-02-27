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
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="admin-input-group password-group">
          <input 
            type={showPassword ? "text" : "password"}
            name="password" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="button" 
            className="password-toggle-btn"
            onClick ={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              /* OPEN EYE ICON (Showing Password) */
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              /* CLOSED EYE ICON (Hidden Password) */
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            )}
          </button>
        </div>
          <button type="submit" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'ENTER VAULT'}
          </button>
        </form>
      </div>
    </div>
  );
}