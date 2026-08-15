// ─── App principal ───────────────────────────────────────────────────────────
const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                     'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

let state = {
  monthKey: null,   // "2026-08"
  year: null,
  month: null,      // 1-based
  lastDay: null,
  tab: 'disponibilidad',
  filterTipo: '',
  filterCamas: '',
  filterBloque: '',
  filterAire: '',
};

// ─── Init ─────────────────────────────────────────────────────────────────

function init() {
  // Si no hay meses, crear el mes actual
  let months = listMonths();
  if (!months.length) {
    const now = new Date();
    createMonth(now.getFullYear(), now.getMonth() + 1);
    months = listMonths();
  }

  const cur = getCurrentMonth() || months[months.length - 1];
  seedIfEmpty(cur);
  loadMonth(cur);
  bindEvents();
}

function loadMonth(key) {
  const { year, month } = parseMonthKey(key);
  state.monthKey = key;
  state.year = year;
  state.month = month;
  state.lastDay = lastDayOfMonth(year, month);
  setCurrentMonth(key);
  seedIfEmpty(key);
  clipTodayForCurrentMonth();
  render();
}

// Recorta reservas pasadas: si la fecha de checkout ya pasó completamente,
// no hace nada con los datos (las reservas quedan como historial).
// El clip al día de hoy solo afecta la VISUALIZACIÓN (clipRangesToToday).
function clipTodayForCurrentMonth() {
  // Solo aplica si estamos en el mes actual
  const now = new Date();
  const nowKey = getMonthKey(now.getFullYear(), now.getMonth() + 1);
  if (state.monthKey !== nowKey) return;
  // No modificamos storage; el clip es solo visual (ver renderRoom)
}

// ─── Render principal ────────────────────────────────────────────────────

function render() {
  renderHeader();
  renderRooms();
  renderSearch();
}

function renderHeader() {
  document.getElementById('month-label').textContent =
    `${MONTH_NAMES[state.month - 1]} ${state.year}`;

  const months = listMonths();
  const idx = months.indexOf(state.monthKey);
  document.getElementById('btn-prev').disabled = idx <= 0;
  document.getElementById('btn-next').disabled = idx >= months.length - 1;
  document.getElementById('btn-del-month').disabled = months.length <= 1;
}

// ─── Tab ─────────────────────────────────────────────────────────────────

function switchTab(tab) {
  state.tab = tab;
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab));
  document.getElementById('view-disponibilidad').classList.toggle('hidden', tab !== 'disponibilidad');
  document.getElementById('view-buscar').classList.toggle('hidden', tab !== 'buscar');
}

// ─── Disponibilidad ───────────────────────────────────────────────────────

function getToday() {
  const now = new Date();
  const nowKey = getMonthKey(now.getFullYear(), now.getMonth() + 1);
  if (state.monthKey === nowKey) return now.getDate();
  // Mes futuro: mostrar desde día 1
  // Mes pasado: todo ya pasó (mostrar igualmente para referencia)
  return 1;
}

function filteredRooms() {
  return ROOMS.filter(r => {
    if (state.filterBloque && r.bloque !== parseInt(state.filterBloque)) return false;
    if (state.filterCamas && r.camas < parseInt(state.filterCamas)) return false;
    if (state.filterAire === 'si' && !r.aire) return false;
    if (state.filterAire === 'no' && r.aire) return false;
    if (state.filterTipo) {
      const tipos = tiposBases(r.tipo);
      if (!tipos.has(state.filterTipo)) return false;
    }
    return true;
  });
}

function renderRooms() {
  const today = getToday();
  const container = document.getElementById('room-list');
  const rooms = filteredRooms();

  if (!rooms.length) {
    container.innerHTML = '<p class="empty">No hay habitaciones con esos filtros.</p>';
    return;
  }

  container.innerHTML = rooms.map(room => {
    const bookings = getBookings(state.monthKey, room.id);
    let ranges = computeRanges(bookings, state.year, state.month);
    ranges = clipRangesToToday(ranges, today);

    const rangesHtml = ranges.length
      ? ranges.map(r => `<span class="range-chip">${formatRange(r)}</span>`).join('')
      : '<span class="range-none">Sin disponibilidad</span>';

    const badges = [];
    if (room.bungalow) badges.push('<span class="badge badge-bungalo">Bungaló</span>');
    else if (room.bloque === 2) badges.push('<span class="badge badge-b2">Bloque 2</span>');
    if (room.aire) badges.push('<span class="badge badge-aire">❄️ Aire</span>');
    if (room.frigobar) badges.push('<span class="badge badge-frig">🧊 Frigobar</span>');

    return `
      <div class="room-row" data-id="${room.id}">
        <div class="room-info">
          <span class="room-name">${room.nombre}</span>
          <span class="room-tipo">${tipoLabel(room.tipo)}</span>
          <span class="room-meta">B${room.bloque} · P${room.piso} · ${room.camas} ${room.camas === 1 ? 'cama' : 'camas'}</span>
          <div class="room-badges">${badges.join('')}</div>
        </div>
        <div class="room-ranges">${rangesHtml}</div>
        <button class="btn-reservar" onclick="openModal('${room.id}')">+ Reserva</button>
      </div>`;
  }).join('');
}

// ─── Búsqueda ─────────────────────────────────────────────────────────────

function renderSearch() {
  // ya está en el HTML; solo actualizamos resultados si hay búsqueda activa
}

function runSearch() {
  const ci = parseInt(document.getElementById('s-checkin').value);
  const co = parseInt(document.getElementById('s-checkout').value);
  const tipo = document.getElementById('s-tipo').value;
  const camas = document.getElementById('s-camas').value;
  const results = document.getElementById('search-results');

  if (!ci || !co || ci >= co) {
    results.innerHTML = '<p class="empty">Ingresa fechas válidas (entrada &lt; salida).</p>';
    return;
  }
  if (co > state.lastDay + 1) {
    results.innerHTML = `<p class="empty">La salida no puede ser mayor a ${state.lastDay + 1} en este mes.</p>`;
    return;
  }

  const available = ROOMS.filter(room => {
    if (tipo) {
      const tipos = tiposBases(room.tipo);
      if (!tipos.has(tipo)) return false;
    }
    if (camas && room.camas < parseInt(camas)) return false;
    const bookings = getBookings(state.monthKey, room.id);
    return isAvailableForRange(bookings, ci, co, state.year, state.month);
  });

  if (!available.length) {
    results.innerHTML = '<p class="empty">No hay habitaciones disponibles para esas fechas.</p>';
    return;
  }

  results.innerHTML = `
    <p class="search-count">${available.length} habitación${available.length !== 1 ? 'es' : ''} disponible${available.length !== 1 ? 's' : ''} del ${ci} al ${co}:</p>
    <div class="search-grid">
      ${available.map(r => `
        <div class="search-card" onclick="openModal('${r.id}')">
          <div class="sc-name">${r.nombre}</div>
          <div class="sc-tipo">${tipoLabel(r.tipo)}</div>
          <div class="sc-meta">B${r.bloque} · ${r.camas} ${r.camas === 1 ? 'cama' : 'camas'}${r.aire ? ' · ❄️' : ''}${r.frigobar ? ' · 🧊' : ''}</div>
        </div>`).join('')}
    </div>`;
}

// ─── Modal de reservas ────────────────────────────────────────────────────

let modalRoomId = null;

function openModal(roomId) {
  modalRoomId = roomId;
  renderModal();
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal').classList.add('hidden');
  modalRoomId = null;
}

function renderModal() {
  const room = ROOMS.find(r => r.id === modalRoomId);
  const bookings = getBookings(state.monthKey, room.id);
  const today = getToday();
  let ranges = computeRanges(bookings, state.year, state.month);
  const rangesClipped = clipRangesToToday(ranges, today);

  document.getElementById('modal-title').textContent = room.nombre;
  document.getElementById('modal-subtitle').textContent =
    `${tipoLabel(room.tipo)} · B${room.bloque} · ${room.camas} camas · ${MONTH_NAMES[state.month - 1]} ${state.year}`;

  // Rangos disponibles
  const dispHtml = rangesClipped.length
    ? rangesClipped.map(r => `<span class="range-chip">${formatRange(r)}</span>`).join('')
    : '<span class="range-none">Sin disponibilidad</span>';
  document.getElementById('modal-ranges').innerHTML = dispHtml;

  // Lista de reservas actuales (ordenadas por checkin)
  const sorted = [...bookings].sort((a, b) => a.checkin - b.checkin);
  document.getElementById('modal-bookings').innerHTML = sorted.length
    ? sorted.map(b => `
        <div class="booking-item">
          <span class="booking-dates">Día ${b.checkin} → ${b.checkout}</span>
          <span class="booking-guest">${b.huesped || '—'}</span>
          <button class="btn-del-booking" onclick="deleteBooking('${b.id}')">✕</button>
        </div>`).join('')
    : '<p class="empty">Sin reservas registradas.</p>';

  // Límites del formulario
  document.getElementById('f-checkin').max = state.lastDay;
  document.getElementById('f-checkout').max = state.lastDay + 1;
}

function deleteBooking(bookingId) {
  if (!confirm('¿Eliminar esta reserva?')) return;
  removeBooking(state.monthKey, modalRoomId, bookingId);
  renderModal();
  renderRooms();
}

function submitBooking() {
  const ci = parseInt(document.getElementById('f-checkin').value);
  const co = parseInt(document.getElementById('f-checkout').value);
  const huesped = document.getElementById('f-huesped').value.trim();

  const bookings = getBookings(state.monthKey, modalRoomId);
  if (!isBookingValid(bookings, ci, co, state.lastDay)) {
    alert('Fechas inválidas o se solapan con una reserva existente.');
    return;
  }

  addBooking(state.monthKey, modalRoomId, ci, co, huesped);
  document.getElementById('f-checkin').value = '';
  document.getElementById('f-checkout').value = '';
  document.getElementById('f-huesped').value = '';
  renderModal();
  renderRooms();
}

// ─── Gestión de meses ─────────────────────────────────────────────────────

function prevMonth() {
  const months = listMonths();
  const idx = months.indexOf(state.monthKey);
  if (idx > 0) loadMonth(months[idx - 1]);
}

function nextMonth() {
  const months = listMonths();
  const idx = months.indexOf(state.monthKey);
  if (idx < months.length - 1) loadMonth(months[idx + 1]);
}

function openNewMonthModal() {
  document.getElementById('modal-new-month').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
  // Sugerir el mes siguiente al actual
  const months = listMonths();
  const last = months[months.length - 1];
  const { year, month } = parseMonthKey(last);
  const nextM = month === 12 ? 1 : month + 1;
  const nextY = month === 12 ? year + 1 : year;
  document.getElementById('nm-year').value = nextY;
  document.getElementById('nm-month').value = nextM;
}

function submitNewMonth() {
  const year = parseInt(document.getElementById('nm-year').value);
  const month = parseInt(document.getElementById('nm-month').value);
  if (!year || !month || month < 1 || month > 12) {
    alert('Año y mes inválidos.'); return;
  }
  const key = createMonth(year, month);
  closeNewMonthModal();
  loadMonth(key);
}

function closeNewMonthModal() {
  document.getElementById('modal-new-month').classList.add('hidden');
  document.getElementById('modal-overlay').classList.add('hidden');
}

function confirmDeleteMonth() {
  const label = `${MONTH_NAMES[state.month - 1]} ${state.year}`;
  if (!confirm(`¿Eliminar el mes de ${label}? Se perderán todas las reservas de ese mes.`)) return;
  const next = deleteMonth(state.monthKey);
  if (next) loadMonth(next);
}

// ─── Filtros ─────────────────────────────────────────────────────────────

function applyFilters() {
  state.filterTipo   = document.getElementById('f-tipo').value;
  state.filterCamas  = document.getElementById('f-camas').value;
  state.filterBloque = document.getElementById('f-bloque').value;
  state.filterAire   = document.getElementById('f-aire').value;
  renderRooms();
}

function clearFilters() {
  ['f-tipo','f-camas','f-bloque','f-aire'].forEach(id =>
    document.getElementById(id).value = '');
  state.filterTipo = state.filterCamas = state.filterBloque = state.filterAire = '';
  renderRooms();
}

// ─── Eventos ─────────────────────────────────────────────────────────────

function bindEvents() {
  document.getElementById('btn-prev').addEventListener('click', prevMonth);
  document.getElementById('btn-next').addEventListener('click', nextMonth);
  document.getElementById('btn-new-month').addEventListener('click', openNewMonthModal);
  document.getElementById('btn-del-month').addEventListener('click', confirmDeleteMonth);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) {
      closeModal();
      closeNewMonthModal();
    }
  });
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.addEventListener('click', () => switchTab(b.dataset.tab)));
  document.getElementById('btn-search').addEventListener('click', runSearch);
  document.getElementById('btn-clear-filters').addEventListener('click', clearFilters);
  ['f-tipo','f-camas','f-bloque','f-aire'].forEach(id =>
    document.getElementById(id).addEventListener('change', applyFilters));
}

// ─── Arranque ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
