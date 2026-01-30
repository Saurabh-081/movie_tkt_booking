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
    setError(''); setMsg('');
    if (!token) return setError('Reset token required');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError('Passwords do not match');
    try{
      await resetPasswordRequest(token, password);
      setMsg('Password reset successful — please login');
      setTimeout(() => navigate('/'), 1500);
    }catch(err){
      setError(err.response?.data?.msg || 'Failed to reset password');
    }
  };

  return (
    <div className="card auth">
      <h2>Reset Password</h2>
      {error && <div style={{color:'#ff8f6b',marginBottom:8,fontSize:14}}>{error}</div>}
      {msg && <div style={{color:'#6bbf6b',marginBottom:8,fontSize:14}}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Reset Token" value={token} onChange={e => setToken(e.target.value)} />
        <input className="input" placeholder="New password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input className="input" placeholder="Confirm password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
          <button className="btn primary" type="submit">Reset password</button>
          <button className="btn ghost" type="button" onClick={() => { setPassword(''); setConfirm(''); setToken(tokenFromQuery || ''); setMsg(''); setError(''); }}>Clear</button>
        </div>
      </form>
    </div>
  );
}
