// Gestión de datos en localStorage
// ─────────────────────────────────────────────────────────────────────────────
// Estructura:
// {
//   currentMonth: "2026-08",
//   months: {
//     "2026-08": {
//       "ALMENDRA": [
//         { id: "abc", checkin: 1, checkout: 15, huesped: "Familia García" }
//       ],
//       ...
//     }
//   }
// }

const STORAGE_KEY = 'madera_recepcion_v1';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { currentMonth: null, months: {} };
  } catch {
    return { currentMonth: null, months: {} };
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Meses ──────────────────────────────────────────────────────────────────

function getMonthKey(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function parseMonthKey(key) {
  const [y, m] = key.split('-');
  return { year: parseInt(y), month: parseInt(m) };
}

function listMonths() {
  const data = loadAll();
  return Object.keys(data.months).sort();
}

function createMonth(year, month) {
  const key = getMonthKey(year, month);
  const data = loadAll();
  if (!data.months[key]) {
    data.months[key] = {};
  }
  data.currentMonth = key;
  saveAll(data);
  return key;
}

function deleteMonth(key) {
  const data = loadAll();
  delete data.months[key];
  const months = Object.keys(data.months).sort();
  data.currentMonth = months.length ? months[months.length - 1] : null;
  saveAll(data);
  return data.currentMonth;
}

function getCurrentMonth() {
  return loadAll().currentMonth;
}

function setCurrentMonth(key) {
  const data = loadAll();
  data.currentMonth = key;
  saveAll(data);
}

// ── Reservas ───────────────────────────────────────────────────────────────

function getBookings(monthKey, roomId) {
  const data = loadAll();
  return (data.months[monthKey]?.[roomId]) || [];
}

function getAllBookingsForMonth(monthKey) {
  const data = loadAll();
  return data.months[monthKey] || {};
}

function addBooking(monthKey, roomId, checkin, checkout, huesped) {
  const data = loadAll();
  if (!data.months[monthKey]) data.months[monthKey] = {};
  if (!data.months[monthKey][roomId]) data.months[monthKey][roomId] = [];
  const booking = { id: genId(), checkin, checkout, huesped: huesped || '' };
  data.months[monthKey][roomId].push(booking);
  saveAll(data);
  return booking;
}

function removeBooking(monthKey, roomId, bookingId) {
  const data = loadAll();
  const bookings = data.months[monthKey]?.[roomId];
  if (!bookings) return;
  data.months[monthKey][roomId] = bookings.filter(b => b.id !== bookingId);
  saveAll(data);
}

function updateBooking(monthKey, roomId, bookingId, changes) {
  const data = loadAll();
  const bookings = data.months[monthKey]?.[roomId];
  if (!bookings) return;
  const idx = bookings.findIndex(b => b.id === bookingId);
  if (idx >= 0) Object.assign(bookings[idx], changes);
  saveAll(data);
}
