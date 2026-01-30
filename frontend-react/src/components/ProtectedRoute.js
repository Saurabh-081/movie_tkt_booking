import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ children }){
  const [isReady, setIsReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Wait a moment to ensure auth state is initialized from localStorage
    setTimeout(() => {
      setAuthenticated(isAuthenticated());
      setIsReady(true);
    }, 100);
  }, []);

  if (!isReady) {
    return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',color:'#fff'}}>Loading...</div>;
  }

  if (!authenticated){
    return <Navigate to="/" replace />;
  }
  
  return children;
}
