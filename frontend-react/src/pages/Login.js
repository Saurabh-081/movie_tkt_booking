import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest, registerRequest, saveToken } from '../utils/auth';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    setError('');
    try{
      const data = await loginRequest(email, password);
      if (data && data.access_token){
        saveToken(data.access_token);
        navigate('/');
      }
    }catch(err){
      setError(err.response?.data?.msg || 'Login failed');
    }
  }

  async function handleRegister() {
    setError('');
    if (password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6){
      setError('Password must be at least 6 characters');
      return;
    }
    if (!email){
      setError('Email is required');
      return;
    }
    try{
      await registerRequest(email, password);
      setError('');
      alert('Registration successful! Please login.');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }catch(err){
      console.error('Registration error:', err);
      const errorMsg = err.response?.data?.msg || err.message || 'Registration failed';
      setError(errorMsg);
    }
  }

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🎬</div>
          <h1>{isRegistering ? 'Create Account' : 'Welcome Back'}</h1>
          <p>{isRegistering ? 'Join MovieFlix today' : 'Sign in to your account'}</p>
        </div>

        {error && (
          <div className="alert alert-error shake">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="form-group">
          <label>Email Address</label>
          <input 
            className="form-input" 
            placeholder="Enter your email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            className="form-input" 
            placeholder="Enter your password" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {isRegistering && (
          <div className="form-group slide-in">
            <label>Confirm Password</label>
            <input 
              className="form-input" 
              placeholder="Confirm your password" 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <button 
          className="btn-submit"
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? 'Create Account' : 'Sign In'}
        </button>

        <div className="form-divider">
          <span>OR</span>
        </div>

        <div className="form-footer">
          {isRegistering ? (
            <>
              <p>Already have an account?</p>
              <button 
                className="btn-toggle"
                onClick={() => setIsRegistering(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <p>Don't have an account?</p>
              <button 
                className="btn-toggle"
                onClick={() => setIsRegistering(true)}
              >
                Create One
              </button>
            </>
          )}
        </div>

        {!isRegistering && (
          <div className="form-footer">
            <button 
              className="btn-link"
              onClick={() => navigate('/forgot')}
            >
              Forgot your password?
            </button>
          </div>
        )}

        <button 
          className="btn-back"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}