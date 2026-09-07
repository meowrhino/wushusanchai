# TODO

Pendientes de la web, por orden de lo que más aporta.

## Formulario de contacto (aparcado)

La página de contacto **no tiene formulario**: se quitó el 7 de septiembre de 2026.
El que había usaba `action="mailto:"`, que aparentaba enviar y no enviaba —
abría el cliente de correo con el texto en crudo y mucha gente abandonaba ahí.
En su lugar hay tres vías que sí funcionan: WhatsApp, teléfono y correo.

Si algún día se quiere recuperar un formulario que envíe de verdad:

- El worker que lo hacía está en el historial de git, en el commit `4549731`
  (`worker/index.js` + el binding `send_email` en `wrangler.toml`). Recuperarlo:
  `git show 4549731:worker/index.js`
- Se quedó bloqueado porque **Cloudflare Email Sending es beta cerrada** y la
  cuenta no tiene acceso (la API responde `Unauthorized` incluso con el token
  correcto). Comprobar de vez en cuando si se ha abierto:
  `npx wrangler email sending list`
- Alternativa sin esperar a la beta: Email Routing en la zona `wushusanchai.com`
  (que no tiene MX y por tanto no afecta al correo de la escuela). Requiere
  verificar `centresanchai@gmail.com` como destino, o sea **un clic de Carlos**
  en un email de verificación.
- **Nunca** habilitar Email Routing en `institutowushusanchai.com`: esa zona
  tiene el MX del correo real de la escuela y se rompería.

Antes de rehacerlo, mirar si alguien lo echa de menos. Con WhatsApp visible,
puede que un formulario no aporte nada.

## Mejoras pendientes

- **Testimonios inventados** en la home ("Carlos M.", "Lucía R."). Sustituir por
  reseñas reales de Google: dan credibilidad y pueden alimentar el JSON-LD.
- **Redirecciones 301.** Los cuatro dominios devuelven 200. El `canonical` evita
  el problema de contenido duplicado, pero lo limpio sería redirigir
  `wushusanchai.com` y los `www` a `institutowushusanchai.com`.
- **Turnstile**, si algún día vuelve a haber formulario y entra spam.

## Rediseño

Sigue pendiente elegir entre los 8 prototipos de `public/prototipos/` para
rehacer la web en HTML/CSS/JS vanilla. Decisión aparcada: por ahora se mantiene
Astro y solo se limpia el código existente.
