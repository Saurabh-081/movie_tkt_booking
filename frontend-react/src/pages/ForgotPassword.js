import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordRequest } from '../utils/auth';

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setMsg('');
    try{
      const data = await forgotPasswordRequest(email);
      setMsg(data.reset_link ? `Reset link: ${data.reset_link}` : data.msg || 'If the email exists, a reset link was sent.');
    }catch(err){
      setError(err.response?.data?.msg || 'Failed to request reset');
    }
  };

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1>Forgot Password?</h1>
          <p>Don't worry! We'll help you reset it</p>
        </div>

        {error && (
          <div className="alert alert-error shake">
            <span>⚠️</span> {error}
          </div>
        )}

        {msg && (
          <div className="alert alert-success slide-in">
            <span>✓</span> {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              className="form-input" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              type="email"
            />
            <p className="form-hint">We'll send you a password reset link</p>
          </div>

          <button className="btn-submit" type="submit">
            Send Reset Link
          </button>
        </form>

        <div className="form-footer">
          <p>Remember your password?</p>
          <button 
            className="btn-toggle"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>

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
