/**
 * Fuente única de verdad de los datos del centro.
 *
 * Si cambia un horario, el teléfono, la dirección o una red social,
 * se cambia AQUÍ y solo aquí: el resto de la web lo lee de este fichero.
 */

export const site = {
  nombre: 'Instituto Wushu Sanchai',
  nombreLegal: 'Carlos García García',
  cif: '52202446J',
  url: 'https://institutowushusanchai.com',
  descripcion:
    'Escuela de kungfu, taichi y qigong en Barcelona dirigida por el maestro Carlos García.',
};

export const contacto = {
  telefono: '646 019 606',
  telefonoE164: '+34646019606',
  email: 'centresanchai@gmail.com',
  whatsapp: 'https://wa.me/34646019606',
};

export const direccion = {
  calle: 'Carrer de Rocafort, 9, Baixos dreta',
  barrio: 'Eixample',
  cp: '08004',
  ciudad: 'Barcelona',
  pais: 'España',
  paisISO: 'ES',
  lat: 41.375576,
  lon: 2.157898,
  mapaUrl: 'https://www.google.com/maps/place/Centro+Sanchai/@41.375576,2.157898,17z',
  comoLlegarUrl:
    'https://www.google.com/maps/dir//Centro+Sanchai,+Carrer+de+Rocafort,+9,+Baixos+dreta,+Eixample,+08004+Barcelona,+Espa%C3%B1a',
  embedUrl:
    'https://maps.google.com/maps?q=Carrer%20de%20Rocafort%2C%209%2C%20Eixample%2C%2008004%20Barcelona&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

/** Dirección en una línea, para textos corridos. */
export const direccionLinea = `${direccion.calle}, ${direccion.barrio}, ${direccion.cp} ${direccion.ciudad}`;

/**
 * Días abiertos. `schema` usa el código de dos letras que espera schema.org
 * (Mo, Tu, We…) para generar `openingHours` en el JSON-LD.
 */
export const horario = [
  { dia: 'Lunes', schema: 'Mo', abre: '18:00', cierra: '20:00' },
  { dia: 'Miércoles', schema: 'We', abre: '18:00', cierra: '21:00' },
  { dia: 'Viernes', schema: 'Fr', abre: '10:00', cierra: '14:00' },
];

export const diasCerrados = 'Martes, jueves, sábado y domingo: cerrado';

export const redes = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/institutowushusanchai/' },
  { nombre: 'Facebook', url: 'https://web.facebook.com/institutowushusanchai.espana?locale=es_LA' },
  { nombre: 'YouTube', url: 'https://youtube.com/@wushukungfutradicional' },
];

export const navPrincipal = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/acerca-del-maestro', label: 'Acerca del maestro' },
  { href: '/contacto', label: 'Contacto' },
];

export const navLegal = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/politica-de-privacidad', label: 'Política de privacidad' },
  { href: '/politica-de-cookies', label: 'Política de cookies (UE)' },
  { href: '/accesibilidad', label: 'Accesibilidad' },
];
