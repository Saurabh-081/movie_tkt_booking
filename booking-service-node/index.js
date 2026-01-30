const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'bookings.json');

function loadBookings() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/movies', (req, res) => {
  res.json([
    { id: 1, name: 'Avengers' },
    { id: 2, name: 'Interstellar' },
    { id: 3, name: 'KGF Chapter 3' }
  ]);
});

// Create a new booking
app.post('/bookings', (req, res) => {
  const { movie, movieId, showtime, seats, total, userEmail } = req.body;
  if (!movie || !showtime || !seats || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const bookings = loadBookings();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const booking = {
    id,
    movie,
    movieId: movieId || null,
    showtime,
    seats,
    total: total || (seats.length * 200),
    userEmail: userEmail || null,
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  saveBookings(bookings);

  res.status(201).json(booking);
});

// Get all bookings (optionally filter by userEmail query param)
app.get('/bookings', (req, res) => {
  const bookings = loadBookings();
  const { userEmail } = req.query;
  if (userEmail) {
    return res.json(bookings.filter(b => b.userEmail === userEmail));
  }
  res.json(bookings);
});

// Get booking by id
app.get('/bookings/:id', (req, res) => {
  const bookings = loadBookings();
  const b = bookings.find(x => x.id === req.params.id);
  if (!b) return res.status(404).json({ error: 'Booking not found' });
  res.json(b);
});

// Get bookings for a user by email (path)
app.get('/bookings/user/:email', (req, res) => {
  const bookings = loadBookings();
  const filtered = bookings.filter(b => b.userEmail === req.params.email);
  res.json(filtered);
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Booking Service running on ${PORT}`));