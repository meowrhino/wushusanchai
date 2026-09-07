/**
 * Worker del sitio.
 *
 * Sirve los ficheros estáticos generados por Astro y añade un único endpoint:
 * POST /api/contacto, que recibe el formulario de la página de contacto y
 * envía el mensaje por email a la escuela.
 *
 * El formulario funciona con y sin JavaScript: si la petición no acepta JSON
 * (envío normal del navegador) se responde con una redirección a /contacto.
 */

/** Dirección que recibe los mensajes del formulario. */
const DESTINO = 'centresanchai@gmail.com';

/** Remitente. Debe ser un dominio dado de alta en Cloudflare Email Sending. */
const REMITENTE = { email: 'formulario@wushusanchai.com', name: 'Web Wushu Sanchai' };

/** Límites de tamaño por campo, para que nadie use el endpoint como buzón. */
const LIMITES = { nombre: 100, telefono: 30, email: 150, mensaje: 5000 };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contacto') {
      return manejarContacto(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function manejarContacto(request, env) {
  // Responde JSON si lo pide el fetch del navegador; si no, redirige.
  const quiereJson = (request.headers.get('accept') || '').includes('application/json');

  if (request.method !== 'POST') {
    return responder({ ok: false, error: 'Método no permitido' }, 405, quiereJson);
  }

  let datos;
  try {
    datos = await request.formData();
  } catch {
    return responder({ ok: false, error: 'No hemos podido leer el formulario.' }, 400, quiereJson);
  }

  const campo = (n) => (datos.get(n) || '').toString().trim();

  const nombre = campo('nombre');
  const telefono = campo('telefono');
  const email = campo('email');
  const mensaje = campo('mensaje');
  const trampa = campo('web'); // Campo oculto: sólo lo rellenan los bots.

  // A un bot le respondemos que todo fue bien y no enviamos nada.
  if (trampa) {
    return responder({ ok: true }, 200, quiereJson);
  }

  const error = validar({ nombre, telefono, email, mensaje });
  if (error) {
    return responder({ ok: false, error }, 400, quiereJson);
  }

  const recibido = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  try {
    await env.EMAIL.send({
      to: DESTINO,
      from: REMITENTE,
      // Así al responder en Gmail el correo va directo a la persona.
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} desde la web`,
      text: [
        `Nombre:   ${nombre}`,
        `Email:    ${email}`,
        `Teléfono: ${telefono || '(no indicado)'}`,
        '',
        'Mensaje:',
        mensaje,
        '',
        `— Enviado desde el formulario de institutowushusanchai.com el ${recibido}.`,
      ].join('\n'),
      html: plantillaHtml({ nombre, email, telefono, mensaje, recibido }),
    });
  } catch (e) {
    console.error('Fallo al enviar el formulario de contacto:', e);
    return responder(
      {
        ok: false,
        error: `No hemos podido enviar el mensaje. Escríbenos directamente a ${DESTINO}.`,
      },
      502,
      quiereJson,
    );
  }

  return responder({ ok: true }, 200, quiereJson);
}

function validar({ nombre, email, mensaje, telefono }) {
  if (!nombre || !email || !mensaje) {
    return 'Faltan campos obligatorios: nombre, correo y mensaje.';
  }
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return 'Ese correo electrónico no parece válido.';
  }
  for (const [campo, max] of Object.entries(LIMITES)) {
    const valor = { nombre, telefono, email, mensaje }[campo] || '';
    if (valor.length > max) return `El campo ${campo} es demasiado largo.`;
  }
  return null;
}

function escapar(texto) {
  return texto.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

function plantillaHtml({ nombre, email, telefono, mensaje, recibido }) {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#333;line-height:1.6;max-width:600px">
  <h2 style="color:#e02e21;margin:0 0 1rem">Nuevo mensaje desde la web</h2>
  <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
    <tr><td><strong>Nombre</strong></td><td>${escapar(nombre)}</td></tr>
    <tr><td><strong>Email</strong></td><td><a href="mailto:${escapar(email)}">${escapar(email)}</a></td></tr>
    <tr><td><strong>Teléfono</strong></td><td>${telefono ? escapar(telefono) : '<em>no indicado</em>'}</td></tr>
  </table>
  <p style="margin:1.25rem 0 0.35rem"><strong>Mensaje</strong></p>
  <div style="white-space:pre-wrap;background:#fafafa;border-left:3px solid #e02e21;padding:1rem">${escapar(mensaje)}</div>
  <p style="color:#8c8c8b;font-size:13px;margin-top:1.5rem">
    Enviado desde el formulario de institutowushusanchai.com el ${escapar(recibido)}.<br />
    Puedes responder directamente a este correo: la respuesta le llegará a ${escapar(nombre)}.
  </p>
</div>`;
}

function responder(cuerpo, status, quiereJson) {
  if (quiereJson) {
    return new Response(JSON.stringify(cuerpo), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
  // Sin JavaScript: volvemos a la página con el resultado en la URL.
  const destino = cuerpo.ok ? '/contacto/?enviado=1' : '/contacto/?error=1';
  return new Response(null, { status: 303, headers: { location: destino } });
}
