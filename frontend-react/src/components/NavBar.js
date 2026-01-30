import { Link, useNavigate } from 'react-router-dom';
import { logout, getUserEmail } from '../utils/auth';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Initialize user email from localStorage
    setUserEmail(getUserEmail());
    
    const onChange = () => setUserEmail(getUserEmail());
    window.addEventListener('authChanged', onChange);
    return () => window.removeEventListener('authChanged', onChange);
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="header">
      <div className="logo">Movie Booker</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/payment">Payment</Link>
        {userEmail ? (
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <Link to="/user" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',color:'inherit'}}>
              <div className="avatar small" style={{backgroundColor:'#ff6b6b',color:'white',fontWeight:'bold'}}>{userEmail.charAt(0).toUpperCase()}</div>
              <span style={{fontSize:14}}>{userEmail}</span>
            </Link>
            <button className="btn ghost" onClick={handleLogout} style={{border:'none',background:'transparent',color:'#ff6b6b',cursor:'pointer',padding:'4px 8px',borderRadius:4,fontSize:14}}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{color:'#ff6b6b',fontWeight:'500'}}>Login</Link>
        )}
      </nav>
    </header>
  );
}
