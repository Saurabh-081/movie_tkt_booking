import axios from 'axios';

const API = 'http://localhost:5000';

export async function registerRequest(email, password){
  try {
    const res = await axios.post(`${API}/register`, { email, password });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw error;
    }
    throw new Error('Network error or server unreachable');
  }
}

export async function loginRequest(email, password){
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
}

export function saveToken(token){
  localStorage.setItem('auth_token', token);
  try{ window.dispatchEvent(new Event('authChanged')); }catch(e){}
}

export function getToken(){
  return localStorage.getItem('auth_token');
}

export function decodeToken(){
  const token = getToken();
  if (!token) return null;
  try{
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(payload).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(json);
  }catch(e){
    return null;
  }
}

export function isAuthenticated(){
  return !!getToken();
}

export function logout(){
  localStorage.removeItem('auth_token');
  try{ window.dispatchEvent(new Event('authChanged')); }catch(e){}
}
// Attach token to all axios requests
axios.interceptors.request.use(config => {
  const token = getToken();
  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, err => Promise.reject(err));

export async function forgotPasswordRequest(email){
  const res = await axios.post(`${API}/forgot`, { email });
  return res.data;
}

export async function resetPasswordRequest(token, password){
  const res = await axios.post(`${API}/reset`, { token, password });
  return res.data;
}

export function getUserEmail(){
  const claims = decodeToken();
  return claims?.sub || claims?.identity || claims?.email || null;
}