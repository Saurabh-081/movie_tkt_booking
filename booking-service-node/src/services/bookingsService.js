const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', '..', 'bookings.json');

function readFile() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function writeFile(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

exports.getAll = async () => readFile();

exports.getById = async (id) => {
  const items = readFile();
  return items.find(i => i.id === id) || null;
};

exports.findByUser = async (email) => {
  const items = readFile();
  return items.filter(i => i.userEmail === email);
};

exports.create = async (payload) => {
  const items = readFile();
  const id = uuidv4();
  const booking = Object.assign({
    id,
    createdAt: new Date().toISOString()
  }, payload, {
    total: payload.total || (Array.isArray(payload.seats) ? payload.seats.length * 200 : 0)
  });
  items.push(booking);
  writeFile(items);
  return booking;
};
