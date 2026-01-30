import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import User from './pages/User';
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import NavBar from './components/NavBar';
import './styles.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;