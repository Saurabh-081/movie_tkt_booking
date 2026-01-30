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
        navigate('/booking');
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
    <div className="card auth">
      <h2 style={{marginTop:0}}>{isRegistering ? 'Create Account' : 'Login'}</h2>
      {error && <div style={{color:'#ff8f6b',marginBottom:8,fontSize:14}}>{error}</div>}
      <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {isRegistering && (
        <input className="input" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      )}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
        <button className="btn primary" onClick={isRegistering ? handleRegister : handleLogin}>{isRegistering ? 'Register' : 'Login'}</button>
        <button className="btn ghost" onClick={() => {setEmail(''); setPassword(''); setConfirmPassword(''); setError('');}}>Clear</button>
      </div>
      <div style={{marginTop:12,textAlign:'center',fontSize:14}}>
        {isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button 
          className="btn ghost" 
          onClick={() => setIsRegistering(!isRegistering)}
          style={{background:'transparent',border:'none',color:'#ff6b6b',cursor:'pointer',textDecoration:'underline',padding:0}}
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </div>
      {!isRegistering && (
        <div style={{marginTop:8,textAlign:'center'}}>
          <button className="btn ghost" onClick={() => window.location.href='/forgot'} style={{background:'transparent',border:'none',color:'#0077cc',cursor:'pointer',padding:0,textDecoration:'underline'}}>Forgot password?</button>
        </div>
      )}
    </div>
  );
}