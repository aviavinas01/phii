import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function AdminRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is currently logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    // You can replace this with your nice luxury preloader later!
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1a1a1a', color: '#e5d0b3' }}>Verifying Credentials...</div>;
  }

  // If there is no active session, kick them to the login page
  if (!session) {
    return <Navigate to="/admin-login" replace />;
  }

  // If they are logged in, let them see the Admin Dashboard
  return children;
}