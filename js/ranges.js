// Lógica de disponibilidad por rangos de fechas
// ─────────────────────────────────────────────────────────────────────────────
// MODELO:
//   Una reserva = { checkin: N, checkout: N } donde checkin < checkout
//   La habitación ocupa las NOCHES checkin … checkout-1
//   Rango disponible = [a, b] significa:
//     • se puede entrar cualquier día a..b-1
//     • se puede salir cualquier día hasta b
//     • b = null ⟹ último día del mes (lastDay) + 1 = puede salir el 1 del mes siguiente
//   Almacenamos las RESERVAS; los rangos se calculan on-the-fly.

function lastDayOfMonth(year, month) {
  // month: 1-based
  return new Date(year, month, 0).getDate();
}

// Calcula los rangos disponibles a partir de las reservas del mes
function computeRanges(bookings, year, month) {
  const lastDay = lastDayOfMonth(year, month);

  // Marcar noches ocupadas (1..lastDay)
  const occupied = new Set();
  for (const b of bookings) {
    const end = Math.min(b.checkout - 1, lastDay);
    for (let d = b.checkin; d <= end; d++) occupied.add(d);
  }

  // Agrupar noches libres en rangos [start, end_checkout]
  const ranges = [];
  let i = 1;
  while (i <= lastDay) {
    if (!occupied.has(i)) {
      let j = i;
      while (j <= lastDay && !occupied.has(j)) j++;
      // noches libres: i..j-1 → checkout máx j (o null si j > lastDay)
      ranges.push([i, j > lastDay ? null : j]);
      i = j;
    } else {
      i++;
    }
  }
  return ranges;
}

// Recorta los rangos al día de hoy (para mostrar solo disponibilidad futura)
// Modifica en-place el array y lo devuelve
function clipRangesToToday(ranges, today) {
  const result = [];
  for (const [a, b] of ranges) {
    const bEff = b === null ? Infinity : b;
    if (bEff <= today) continue;          // rango completamente pasado
    const newA = Math.max(a, today);      // recortar inicio
    result.push([newA, b]);
  }
  return result;
}

// Verifica si una reserva propuesta [checkin, checkout] es válida
// (no solapan con reservas existentes y las fechas son coherentes)
function isBookingValid(bookings, checkin, checkout, lastDay, excludeId = null) {
  if (checkin < 1 || checkout > lastDay + 1 || checkin >= checkout) return false;
  for (const b of bookings) {
    if (b.id === excludeId) continue;
    // solapan si los intervalos de noches se intersectan
    if (checkin < b.checkout && checkout > b.checkin) return false;
  }
  return true;
}

// Formatea un rango [a, b] como texto para mostrar en pantalla
function formatRange([a, b]) {
  return b === null ? `${a}` : `${a}–${b}`;
}

// Verifica si una habitación tiene disponibilidad para el rango [checkin, checkout]
function isAvailableForRange(bookings, checkin, checkout, year, month) {
  const lastDay = lastDayOfMonth(year, month);
  return isBookingValid(bookings, checkin, checkout, lastDay);
}

// Genera un ID único simple
function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
