import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie ?? 'Selected movie';
  const showtime = location.state?.showtime ?? '2:00 PM';
  const price = location.state?.price ?? 250;
  const [method, setMethod] = useState('UPI');
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;
  const totalPrice = price * selectedSeats.length;

  function toggleSeat(seatId) {
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  }

  function handlePay() {
    if (selectedSeats.length < 1){
      alert('Please select at least 1 seat');
      return;
    }
    alert(`Payment of ₹${totalPrice} (${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''} - ${selectedSeats.join(', ')}) via ${method} completed!\n\nBooking Confirmed for ${movie} at ${showtime}`);
    navigate('/booking');
  }

  return (
    <div className="card" style={{maxWidth: 500, margin: '0 auto'}}>
      <h2 style={{marginTop:0}}>Payment</h2>
      
      {/* Booking Summary */}
      <div style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,255,255,0.03)',
        borderRadius: 8,
        padding: 14,
        marginBottom: 16
      }}>
        <div style={{marginBottom: 10}}>
          <label style={{color: '#9aa4b2', fontSize: 12}}>Movie</label>
          <div style={{fontWeight: 600, fontSize: 16}}>{movie}</div>
        </div>
        <div style={{marginBottom: 10}}>
          <label style={{color: '#9aa4b2', fontSize: 12}}>Showtime</label>
          <div style={{fontWeight: 600}}>{showtime}</div>
        </div>
        <div style={{display: 'flex', gap: 16}}>
          <div>
            <label style={{color: '#9aa4b2', fontSize: 12}}>Price per Seat</label>
            <div style={{fontWeight: 600, color: '#ff6b6b'}}>₹{price}</div>
          </div>
          <div>
            <label style={{color: '#9aa4b2', fontSize: 12}}>Selected Seats</label>
            <div style={{fontWeight: 600}}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</div>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div style={{marginBottom: 16}}>
        <label style={{display:'block',marginBottom:10}}>Select Your Seats</label>
        <div style={{
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.03)',
          borderRadius: 8,
          padding: 16
        }}>
          {/* Screen */}
          <div style={{
            textAlign: 'center',
            marginBottom: 20,
            padding: '10px',
            background: 'rgba(255,107,107,0.1)',
            borderRadius: 8,
            fontSize: 12,
            color: '#ff6b6b',
            fontWeight: 600
          }}>
            🎬 SCREEN
          </div>

          {/* Seats Grid */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            {rows.map(row => (
              <div key={row} style={{display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center'}}>
                <span style={{width: 20, textAlign: 'center', color: '#9aa4b2', fontSize: 12}}>{row}</span>
                <div style={{display: 'flex', gap: 6}}>
                  {Array.from({length: seatsPerRow}).map((_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 4,
                          border: isSelected ? '2px solid #ff6b6b' : '1px solid rgba(255,255,255,0.1)',
                          background: isSelected ? '#ff6b6b' : 'rgba(255,255,255,0.02)',
                          color: isSelected ? '#081025' : '#e6eef6',
                          cursor: 'pointer',
                          fontSize: 11,
                          fontWeight: 600
                        }}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{marginTop: 16, display: 'flex', gap: 16, fontSize: 12, justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <div style={{width: 20, height: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3}}></div>
              <span>Available</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <div style={{width: 20, height: 20, background: '#ff6b6b', borderRadius: 3}}></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(255,107,107,0.1), rgba(255,143,107,0.1))',
        border: '1px solid rgba(255,107,107,0.2)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        textAlign: 'center'
      }}>
        <div style={{color: '#9aa4b2', fontSize: 12, marginBottom: 4}}>Total Amount</div>
        <div style={{fontSize: 24, fontWeight: 700, color: '#ff6b6b'}}>₹{totalPrice}</div>
      </div>

      {/* Payment Method */}
      <label style={{display:'block',marginBottom:8}}>Payment Method</label>
      <select 
        className="input" 
        value={method} 
        onChange={e => setMethod(e.target.value)}
        style={{marginBottom: 16}}
      >
        <option>UPI</option>
        <option>Credit Card</option>
        <option>Debit Card</option>
        <option>Net Banking</option>
      </select>

      {/* Buttons */}
      <div style={{display:'flex',gap:8}}>
        <button className="btn primary" onClick={handlePay} style={{flex: 1}}>
          Pay ₹{totalPrice}
        </button>
        <button className="btn ghost" onClick={() => navigate('/booking')}>
          Cancel
        </button>
      </div>
    </div>
  );
}