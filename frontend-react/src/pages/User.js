import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUserEmail } from '../utils/auth';

export default function User(){
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize authentication state from localStorage
    setIsLoggedIn(isAuthenticated());
    setUserEmail(getUserEmail());
    
    const updateAuth = () => {
      setUserEmail(getUserEmail());
      setIsLoggedIn(isAuthenticated());
    };
    window.addEventListener('authChanged', updateAuth);
    return () => window.removeEventListener('authChanged', updateAuth);
  }, []);

  function handleLogout(){
    logout();
    navigate('/');
  }

  if (!isLoggedIn){
    return (
      <div className="card auth">
        <h2>Not Logged In</h2>
        <p style={{marginBottom:16}}>Please login to view your profile</p>
        <Link to="/" className="btn primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="card auth">
      <h2>Profile</h2>
      {userEmail ? (
        <div style={{textAlign:'left'}}>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24,padding:16,backgroundColor:'#f5f5f5',borderRadius:8}}>
            <div className="avatar" style={{backgroundColor:'#ff6b6b',color:'white',fontWeight:'bold',width:60,height:60,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',fontSize:24}}>{userEmail.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{fontSize:14,color:'var(--muted)'}}>Logged in as</div>
              <div style={{fontSize:18,fontWeight:'bold',marginTop:4}}>{userEmail}</div>
            </div>
          </div>
          
          <div style={{display:'flex',gap:8,flexDirection:'column'}}>
            <button className="btn primary" onClick={() => navigate('/booking')} style={{width:'100%'}}>My Bookings</button>
            <button className="btn primary" onClick={() => navigate('/payment')} style={{width:'100%'}}>Payment History</button>
            <button className="btn ghost" onClick={handleLogout} style={{width:'100%',marginTop:8,color:'#ff6b6b',fontWeight:'bold'}}>Logout</button>
          </div>
        </div>
      ) : (
        <div style={{textAlign:'center'}}>
          <p>Loading profile...</p>
        </div>
      )}
    </div>
  );
}
