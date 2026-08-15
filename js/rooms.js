// Catálogo de habitaciones activas del Hotel Madera Labrada
// Tipos: S=Simple, M=Matrimonial, D=Doble, T=Triple, C=Cuádruple, Q=Quíntuple
// Habitaciones inactivas excluidas: 102, 103, CAPIRONA, UMARI

const ROOMS = [
  // ── BLOQUE 1 – Numeradas ──────────────────────────────────────
  { id: '104',       nombre: '104',       tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: '105',       nombre: '105',       tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: '106',       nombre: '106',       tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: '107',       nombre: '107',       tipo: 'T-D',   bloque: 1, piso: 1,        camas: 3, aire: false, frigobar: true  },
  { id: '201',       nombre: '201',       tipo: 'M',     bloque: 1, piso: 2,        camas: 1, aire: false, frigobar: true  },
  { id: '202',       nombre: '202',       tipo: 'M',     bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: true  },
  { id: '203',       nombre: '203',       tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: true  },
  { id: '204',       nombre: '204',       tipo: 'M',     bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: true  },
  { id: '205',       nombre: '205',       tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: false },
  { id: '206',       nombre: '206',       tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: false },
  // ── BLOQUE 1 – Con nombre ─────────────────────────────────────
  { id: 'PALMITO',   nombre: 'PALMITO',   tipo: 'T',     bloque: 1, piso: 1,        camas: 3, aire: false, frigobar: false },
  { id: 'MIRADOR',   nombre: 'MIRADOR',   tipo: 'C-T',   bloque: 1, piso: 1,        camas: 4, aire: false, frigobar: true  },
  { id: 'ORQUIDEA',  nombre: 'ORQUÍDEA',  tipo: 'T-D',   bloque: 1, piso: 1,        camas: 3, aire: false, frigobar: true  },
  { id: 'GIRASOL',   nombre: 'GIRASOL',   tipo: 'C-T',   bloque: 1, piso: 2,        camas: 4, aire: true,  frigobar: true  },
  { id: 'FIKUS',     nombre: 'FIKUS',     tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: 'PALMERAS',  nombre: 'PALMERAS',  tipo: 'T-D',   bloque: 1, piso: 2,        camas: 3, aire: false, frigobar: false },
  { id: 'TULIPAN',   nombre: 'TULIPÁN',   tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: 'PIJUAYO',   nombre: 'PIJUAYO',   tipo: 'Q',     bloque: 1, piso: 1,        camas: 5, aire: false, frigobar: false },
  { id: 'BEGONIA',   nombre: 'BEGONIA',   tipo: 'C-T',   bloque: 1, piso: 2,        camas: 4, aire: false, frigobar: true  },
  { id: 'BAMBU',     nombre: 'BAMBÚ',     tipo: 'Q-C-T', bloque: 1, piso: 1,        camas: 5, aire: false, frigobar: true  },
  { id: 'CAOBA',     nombre: 'CAOBA',     tipo: 'C-T',   bloque: 1, piso: 2,        camas: 4, aire: false, frigobar: true  },
  { id: 'QUINILLA',  nombre: 'QUINILLA',  tipo: 'C-T',   bloque: 1, piso: 2,        camas: 4, aire: true,  frigobar: true  },
  { id: 'CEDRO',     nombre: 'CEDRO',     tipo: 'C-T',   bloque: 1, piso: 2,        camas: 4, aire: true,  frigobar: true  },
  { id: 'CROTON',    nombre: 'CROTON',    tipo: 'C-T',   bloque: 1, piso: 2,        camas: 4, aire: true,  frigobar: true  },
  { id: 'BIJAO',     nombre: 'BIJAO',     tipo: 'D-M',   bloque: 1, piso: 2,        camas: 1, aire: true,  frigobar: true  },
  { id: 'HUAYRURO',  nombre: 'HUAYRURO',  tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: true,  frigobar: true  },
  { id: 'ALMENDRA',  nombre: 'ALMENDRA',  tipo: 'M',     bloque: 1, piso: 2,        camas: 1, aire: true,  frigobar: true  },
  { id: 'CACTUS',    nombre: 'CACTUS',    tipo: 'D-M',   bloque: 1, piso: 2,        camas: 3, aire: true,  frigobar: true  },
  { id: 'DALIA',     nombre: 'DALIA',     tipo: 'Q-C-T', bloque: 1, piso: 2,        camas: 5, aire: false, frigobar: true  },
  { id: 'CATTLEYA',  nombre: 'CATTLEYA',  tipo: 'D-M',   bloque: 1, piso: 2,        camas: 3, aire: true,  frigobar: true  },
  { id: 'CLAVEL',    nombre: 'CLAVEL',    tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: true,  frigobar: true  },
  { id: 'JASMIN',    nombre: 'JAZMÍN',    tipo: 'M',     bloque: 1, piso: 3,        camas: 1, aire: true,  frigobar: true  },
  { id: 'LIRIO',     nombre: 'LIRIO',     tipo: 'T-D',   bloque: 1, piso: 3,        camas: 3, aire: true,  frigobar: true  },
  { id: 'RETAMA',    nombre: 'RETAMA',    tipo: 'T-D',   bloque: 1, piso: 3,        camas: 3, aire: true,  frigobar: true  },
  { id: 'YARINA',    nombre: 'YARINA',    tipo: 'D-M',   bloque: 1, piso: 3,        camas: 2, aire: true,  frigobar: true  },
  { id: 'AGUAJE',    nombre: 'AGUAJE',    tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: 'BOMBONAJE', nombre: 'BOMBONAJE', tipo: 'T-D',   bloque: 1, piso: 1,        camas: 3, aire: false, frigobar: true  },
  { id: 'CAMUCAMU',  nombre: 'CAMU CAMU', tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: true  },
  { id: 'CAIMITO',   nombre: 'CAIMITO',   tipo: 'D-M',   bloque: 1, piso: 1,        camas: 2, aire: false, frigobar: false },
  { id: 'MAGNOLIA',  nombre: 'MAGNOLIA',  tipo: 'Q-C-T', bloque: 1, piso: 3,        camas: 5, aire: false, frigobar: true  },
  { id: 'CHONTA',    nombre: 'CHONTA',    tipo: 'T-D',   bloque: 1, piso: 1,        camas: 3, aire: false, frigobar: false },
  { id: 'DALEDALE',  nombre: 'DALE DALE', tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: false },
  { id: 'EUCALIPTO', nombre: 'EUCALIPTO', tipo: 'T-D',   bloque: 1, piso: 2,        camas: 3, aire: false, frigobar: false },
  { id: 'FUCSIA',    nombre: 'FUCSIA',    tipo: 'T-D',   bloque: 1, piso: 2,        camas: 3, aire: false, frigobar: false },
  { id: 'GERANIOS',  nombre: 'GERANIOS',  tipo: 'D-M',   bloque: 1, piso: 2,        camas: 2, aire: false, frigobar: true  },
  { id: 'HUABA',     nombre: 'HUABA',     tipo: 'M',     bloque: 1, piso: 3,        camas: 2, aire: false, frigobar: false },
  { id: 'INDANO',    nombre: 'INDANO',    tipo: 'T-D',   bloque: 1, piso: 3,        camas: 3, aire: false, frigobar: false },
  { id: 'JAGUA',     nombre: 'JAGUA',     tipo: 'C-T',   bloque: 1, piso: 3,        camas: 4, aire: false, frigobar: false },
  { id: 'KOKONA',    nombre: 'KOKONA',    tipo: 'M',     bloque: 1, piso: 3,        camas: 1, aire: false, frigobar: false },
  { id: 'SHAPAJA',   nombre: 'SHAPAJA',   tipo: 'T-D',   bloque: 1, piso: 1,        camas: 3, aire: false, frigobar: false },
  { id: 'LAVANDA',   nombre: 'LAVANDA',   tipo: 'T-D',   bloque: 1, piso: 3,        camas: 3, aire: false, frigobar: true  },
  // ── BLOQUE 2 (piso 1) ────────────────────────────────────────
  { id: 'ARDILLA',   nombre: 'ARDILLA',   tipo: 'C',     bloque: 2, piso: 1,        camas: 5, aire: false, frigobar: false },
  { id: 'AÑUJE',     nombre: 'AÑUJE',     tipo: 'Q',     bloque: 2, piso: 1,        camas: 5, aire: false, frigobar: false },
  { id: 'BECERRO',   nombre: 'BECERRO',   tipo: 'C',     bloque: 2, piso: 1,        camas: 5, aire: false, frigobar: false },
  { id: 'CONEJO',    nombre: 'CONEJO',    tipo: 'C',     bloque: 2, piso: 1,        camas: 5, aire: false, frigobar: false },
  { id: 'WALO',      nombre: 'WALO',      tipo: 'D',     bloque: 2, piso: 1,        camas: 2, aire: false, frigobar: false },
  { id: 'TUCAN',     nombre: 'TUCÁN',     tipo: 'D',     bloque: 2, piso: 1,        camas: 2, aire: false, frigobar: false },
  { id: 'PANTERA',   nombre: 'PANTERA',   tipo: 'D',     bloque: 2, piso: 1,        camas: 2, aire: false, frigobar: false },
  { id: 'ÑANDU',     nombre: 'ÑANDÚ',     tipo: 'D',     bloque: 2, piso: 1,        camas: 2, aire: false, frigobar: false },
  { id: 'MAPACHE',   nombre: 'MAPACHE',   tipo: 'D',     bloque: 2, piso: 1,        camas: 2, aire: false, frigobar: false },
  // ── BLOQUE 2 (piso 2) ────────────────────────────────────────
  { id: 'DELFIN',    nombre: 'DELFÍN',    tipo: 'C',     bloque: 2, piso: 2,        camas: 5, aire: false, frigobar: false },
  { id: 'CHICHARRA', nombre: 'CHICHARRA', tipo: 'T',     bloque: 2, piso: 2,        camas: 4, aire: false, frigobar: false },
  { id: 'ESCARABAJO',nombre: 'ESCARABAJO',tipo: 'T',     bloque: 2, piso: 2,        camas: 3, aire: false, frigobar: false },
  { id: 'FOCA',      nombre: 'FOCA',      tipo: 'T',     bloque: 2, piso: 2,        camas: 5, aire: false, frigobar: false },
  { id: 'ZORRO',     nombre: 'ZORRO',     tipo: 'D',     bloque: 2, piso: 2,        camas: 2, aire: false, frigobar: false },
  { id: 'URRACA',    nombre: 'URRACA',    tipo: 'D',     bloque: 2, piso: 2,        camas: 2, aire: false, frigobar: false },
  { id: 'RONSOCO',   nombre: 'RONSOCO',   tipo: 'D',     bloque: 2, piso: 2,        camas: 2, aire: false, frigobar: false },
  { id: 'OVEJA',     nombre: 'OVEJA',     tipo: 'D',     bloque: 2, piso: 2,        camas: 2, aire: false, frigobar: false },
  { id: 'NUTRIA',    nombre: 'NUTRIA',    tipo: 'D',     bloque: 2, piso: 2,        camas: 2, aire: false, frigobar: false },
  // ── BLOQUE 2 (piso 3) ────────────────────────────────────────
  { id: 'GARZA',     nombre: 'GARZA',     tipo: 'C',     bloque: 2, piso: 3,        camas: 4, aire: false, frigobar: false },
  { id: 'GUACAMAYO', nombre: 'GUACAMAYO', tipo: 'Q',     bloque: 2, piso: 3,        camas: 5, aire: false, frigobar: false },
  { id: 'GORRION',   nombre: 'GORRIÓN',   tipo: 'C',     bloque: 2, piso: 3,        camas: 5, aire: false, frigobar: false },
  { id: 'HALCON',    nombre: 'HALCÓN',    tipo: 'Q',     bloque: 2, piso: 3,        camas: 5, aire: false, frigobar: false },
  { id: 'VENADO',    nombre: 'VENADO',    tipo: 'M',     bloque: 2, piso: 3,        camas: 2, aire: false, frigobar: false },
  { id: 'LLAMA',     nombre: 'LLAMA',     tipo: 'D',     bloque: 2, piso: 3,        camas: 2, aire: false, frigobar: false },
  { id: 'SALTAMONTE',nombre: 'SALTAMONTE',tipo: 'M',     bloque: 2, piso: 3,        camas: 2, aire: false, frigobar: false },
  { id: 'PUMA',      nombre: 'PUMA',      tipo: 'D',     bloque: 2, piso: 3,        camas: 2, aire: false, frigobar: false },
  // ── BLOQUE 2 – Bungalós ──────────────────────────────────────
  { id: 'IGUANA',    nombre: 'IGUANA',    tipo: 'M',     bloque: 2, piso: 'B',      camas: 2, aire: false, frigobar: false, bungalow: true },
  { id: 'IZULA',     nombre: 'IZULA',     tipo: 'D',     bloque: 2, piso: 'B',      camas: 2, aire: false, frigobar: false, bungalow: true },
  { id: 'JAGUAR',    nombre: 'JAGUAR',    tipo: 'M',     bloque: 2, piso: 'B',      camas: 2, aire: false, frigobar: false, bungalow: true },
  { id: 'JABALI',    nombre: 'JABALÍ',    tipo: 'M',     bloque: 2, piso: 'B',      camas: 2, aire: false, frigobar: false, bungalow: true },
  { id: 'LORO',      nombre: 'LORO',      tipo: 'M',     bloque: 2, piso: 'B',      camas: 2, aire: false, frigobar: false, bungalow: true },
];

// Tipos base (sin guión) que puede contener un tipo multi
const TIPO_LABELS = {
  'S': 'Simple',
  'M': 'Matrimonial',
  'D': 'Doble',
  'T': 'Triple',
  'C': 'Cuádruple',
  'Q': 'Quíntuple',
};

// Devuelve etiqueta legible del tipo, ej: 'D-M' → 'Doble / Matrimonial'
function tipoLabel(tipo) {
  return tipo.split('-').map(t => TIPO_LABELS[t] || t).join(' / ');
}

// Devuelve los tipos base de una habitación como Set
function tiposBases(tipo) {
  return new Set(tipo.split('-'));
}
