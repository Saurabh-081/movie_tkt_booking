import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserEmail } from '../utils/auth';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        setIsLoggedIn(true);
        const email = getUserEmail();
        setUserEmail(email || 'User');
      }
    };
    checkAuth();
    window.addEventListener('authChanged', checkAuth);
    return () => window.removeEventListener('authChanged', checkAuth);
  }, []);

  const movies = [
    {
      id: 1,
      title: 'Quantum Nexus',
      genre: 'Sci-Fi',
      rating: '8.5/10',
      image: '🎬',
      description: 'A mind-bending journey through dimensions'
    },
    {
      id: 2,
      title: 'Mystic Chronicles',
      genre: 'Fantasy',
      rating: '8.8/10',
      image: '✨',
      description: 'Ancient magic awakens in the modern world'
    },
    {
      id: 3,
      title: 'Thunder Rising',
      genre: 'Action',
      rating: '8.3/10',
      image: '⚡',
      description: 'Heroes unite against the darkness'
    },
    {
      id: 4,
      title: 'Echoes of Heart',
      genre: 'Romance',
      rating: '8.6/10',
      image: '💕',
      description: 'A love story that transcends time'
    },
    {
      id: 5,
      title: 'Shadow Conspiracy',
      genre: 'Thriller',
      rating: '8.4/10',
      image: '🕵️',
      description: 'Trust no one. Everyone has secrets.'
    },
    {
      id: 6,
      title: 'Cosmic Adventure',
      genre: 'Adventure',
      rating: '8.7/10',
      image: '🚀',
      description: 'Explore the infinite universe'
    }
  ];

  const handleBookNow = () => {
    if (isLoggedIn) {
      navigate('/booking');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Welcome to MovieFlix</h1>
          {isLoggedIn && (
            <p className="hero-subtitle">Hello, <span className="user-name">{userEmail.split('@')[0]}</span>! Ready for an amazing experience?</p>
          )}
          {!isLoggedIn && (
            <p className="hero-subtitle">Discover the magic of cinema. Sign in to book your seats.</p>
          )}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat">
              <span className="stat-number">2M+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <h2 className="section-title">
          <span className="title-icon">🎬</span> Now Showing
        </h2>
        <p className="section-subtitle">The hottest movies of the season</p>
        
        <div className="movies-grid">
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="movie-card slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="movie-poster">
                <span className="movie-emoji">{movie.image}</span>
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-genre">{movie.genre}</p>
                <p className="movie-description">{movie.description}</p>
                <div className="movie-footer">
                  <span className="movie-rating">⭐ {movie.rating}</span>
                  <button 
                    className="book-btn"
                    onClick={handleBookNow}
                  >
                    {isLoggedIn ? 'Book Now' : 'Sign In'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose MovieFlix?</h2>
        
        <div className="features-grid">
          <div className="feature-card pulse">
            <div className="feature-icon">🎯</div>
            <h3>Easy Booking</h3>
            <p>Book your favorite movies in just 3 clicks</p>
          </div>
          <div className="feature-card pulse" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Multiple payment options with SSL security</p>
          </div>
          <div className="feature-card pulse" style={{ animationDelay: '0.4s' }}>
            <div className="feature-icon">🎁</div>
            <h3>Amazing Offers</h3>
            <p>Get exclusive discounts and cashback rewards</p>
          </div>
          <div className="feature-card pulse" style={{ animationDelay: '0.6s' }}>
            <div className="feature-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>Book anytime, anywhere on any device</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content bounce">
          <h2>Ready to Enjoy Premium Entertainment?</h2>
          <p>Join millions of movie lovers worldwide</p>
          {!isLoggedIn && (
            <button 
              className="cta-button"
              onClick={() => navigate('/')}
            >
              Get Started Now
            </button>
          )}
          {isLoggedIn && (
            <button 
              className="cta-button"
              onClick={() => navigate('/booking')}
            >
              Browse Movies
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
