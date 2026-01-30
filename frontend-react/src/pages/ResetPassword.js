import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../utils/auth';

export default function ResetPassword(){
  const [searchParams] = useSearchParams();
  const tokenFromQuery = searchParams.get('token') || '';
  const [token, setToken] = useState(tokenFromQuery);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { if (tokenFromQuery) setToken(tokenFromQuery); }, [tokenFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setMsg('');
    if (!token) return setError('Reset token required');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');
    try{
      await resetPasswordRequest(token, password);
      setMsg('✓ Password reset successful — redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    }catch(err){
      setError(err.response?.data?.msg || 'Failed to reset password');
    }
  };

  return (
    <div className="login-container fade-in">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔑</div>
          <h1>Reset Password</h1>
          <p>Create a new secure password</p>
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
            <label>Reset Token</label>
            <input 
              className="form-input" 
              placeholder="Enter your reset token" 
              value={token} 
              onChange={e => setToken(e.target.value)}
              type="text"
            />
            <p className="form-hint">Token from your email reset link</p>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input 
              className="form-input" 
              placeholder="Create a new password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              className="form-input" 
              placeholder="Confirm your password" 
              type="password" 
              value={confirm} 
              onChange={e => setConfirm(e.target.value)}
            />
          </div>

          <button className="btn-submit" type="submit">
            Reset Password
          </button>
        </form>

        <button 
          className="btn-back"
          onClick={() => navigate('/login')}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
