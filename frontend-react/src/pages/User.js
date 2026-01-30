import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUserEmail } from '../utils/auth';

export default function User(){
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
      <div className="profile-container fade-in">
        <div className="profile-empty">
          <div className="empty-icon">🔐</div>
          <h2>Not Logged In</h2>
          <p>Please login to view your profile and manage your bookings</p>
          <button className="btn-submit" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container fade-in">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header slide-in">
          <div className="profile-avatar">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <p className="profile-label">Logged in as</p>
            <h2 className="profile-email">{userEmail}</h2>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card slide-in">
            <div className="stat-icon">🎫</div>
            <div className="stat-value">8</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-icon">⭐</div>
            <div className="stat-value">12</div>
            <div className="stat-label">Favorite Movies</div>
          </div>
          <div className="stat-card slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="stat-icon">💰</div>
            <div className="stat-value">₹4200</div>
            <div className="stat-label">Total Spent</div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button 
            className="action-btn primary"
            onClick={() => navigate('/booking')}
          >
            <span className="action-icon">🎬</span>
            <div>
              <div className="action-title">My Bookings</div>
              <div className="action-desc">View your movie tickets</div>
            </div>
          </button>

          <button 
            className="action-btn primary"
            onClick={() => navigate('/payment')}
          >
            <span className="action-icon">💳</span>
            <div>
              <div className="action-title">Payment History</div>
              <div className="action-desc">Track your transactions</div>
            </div>
          </button>

          <button 
            className="action-btn danger"
            onClick={handleLogout}
          >
            <span className="action-icon">🚪</span>
            <div>
              <div className="action-title">Logout</div>
              <div className="action-desc">Sign out of your account</div>
            </div>
          </button>
        </div>

        {/* Quick Links */}
        <div className="profile-footer">
          <p>Need help? <a href="#" className="link">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}
