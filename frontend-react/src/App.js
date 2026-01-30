import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import User from './pages/User';
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app - check localStorage and set up state
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return <div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(180deg,#0f1724 0%, #081025 100%)',color:'#fff'}}>Initializing...</div>;
  }

  return (
    <ErrorBoundary>
      <NavBar />

      <main className="container">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/user" element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />
        </Routes>
      </main>

      <footer className="footer">© 2026 Movie Ticket Booking. All rights reserved.</footer>
    </ErrorBoundary>
  );
}

export default App;