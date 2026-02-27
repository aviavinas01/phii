import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './ProfilePage.css';

const COUNTRY_CODES = [
  { code: '+91', country: 'IN' },
  { code: '+977', country: 'NP' },
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  { code: '+33', country: 'FR' },
  { code: '+49', country: 'DE' },
  { code: '+971', country: 'UAE' },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');

  // Phone Auth States
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setStep('phone');
    navigate('/');
  };

  // --- CUSTOMER PHONE LOGIN LOGIC ---
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Combine the selected code with the typed number
    const formattedPhone = `${countryCode}${phone}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Security code sent to your device.');
      setStep('otp');
    }
    setLoading(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formattedPhone = `${countryCode}${phone}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      setMessage(`Invalid code. Please try again.`);
    } else {
      setUser(data.user);
    }
    setLoading(false);
  };

  // ==========================================
  // VIEW 1: USER IS LOGGED IN
  // ==========================================
  if (user) {
    const displayName = user.phone ? `User ${user.phone}` : 'Guest';

    return (
      <div className="profile-page-wrapper">
        <div className="profile-container">
          <aside className="profile-sidebar">
            <h2 className="profile-greeting">Hello, <br/>{displayName}</h2>
            <nav className="profile-nav">
              <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Order History</button>
              <button className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>Saved Addresses</button>
              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </nav>
          </aside>

          <main className="profile-content">
            <div className="profile-section">
              <h3 className="section-title">
                {activeTab === 'orders' ? 'Order History' : 'Saved Addresses'}
              </h3>
              <div className="empty-state-box">
                <p>Nothing saved in your vault yet.</p>
                {activeTab === 'orders' && <button className="btn-outline" onClick={() => navigate('/')}>START SHOPPING</button>}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGIN / AUTHENTICATION SCREENS
  // ==========================================
  return (
    <div className="profile-page-wrapper auth-layout">
      <div className="auth-box">
        
        {/* CUSTOMER STEP 1: ENTER PHONE */}
        {step === 'phone' && (
          <form className="auth-form" onSubmit={sendOtp}>
            <h1 className="auth-title">Access Your Vault</h1>
            <p className="auth-subtitle">Enter your mobile number to view your orders or save your details.</p>
            
            {/* THE SPLIT COUNTRY CODE INPUT */}
            <div className="phone-input-group">
              <select 
                className="country-select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} {c.country}
                  </option>
                ))}
              </select>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Strips letters/symbols
                required 
                className="auth-input phone-input"
              />
            </div>
            
            {message && <p className="auth-message">{message}</p>}
            
            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? 'SENDING...' : 'SEND SECURITY CODE'}
            </button>
          </form>
        )}

        {/* CUSTOMER STEP 2: ENTER OTP */}
        {step === 'otp' && (
          <form className="auth-form" onSubmit={verifyOtp}>
            <h1 className="auth-title">Verify Device</h1>
            <p className="auth-subtitle">We sent a secure code to {countryCode} {phone}</p>
            
            <input 
              type="text" 
              placeholder="Enter 6-digit code" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
              className="auth-input"
            />
            
            {message && <p className="auth-message">{message}</p>}
            
            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? 'VERIFYING...' : 'CONFIRM ACCESS'}
            </button>

            <button type="button" className="auth-text-btn" onClick={() => setStep('phone')}>
              &larr; Use a different number
            </button>
          </form>
        )}

      </div>
    </div>
  );
}