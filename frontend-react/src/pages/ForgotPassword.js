import { useState } from 'react';
import { forgotPasswordRequest } from '../utils/auth';

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    try{
      const data = await forgotPasswordRequest(email);
      // In dev the API returns a reset_link; show it so developer can use it.
      setMsg(data.reset_link ? `Reset link: ${data.reset_link}` : data.msg || 'If the email exists, a reset link was sent.');
    }catch(err){
      setError(err.response?.data?.msg || 'Failed to request reset');
    }
  };

  return (
    <div className="card auth">
      <h2>Forgot Password</h2>
      {error && <div style={{color:'#ff8f6b',marginBottom:8,fontSize:14}}>{error}</div>}
      {msg && <div style={{color:'#6bbf6b',marginBottom:8,fontSize:14}}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
          <button className="btn primary" type="submit">Send reset link</button>
          <button className="btn ghost" type="button" onClick={() => { setEmail(''); setMsg(''); setError(''); }}>Clear</button>
        </div>
      </form>
    </div>
  );
}
