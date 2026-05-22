# Instituto Wushu Sanchai

Sitio web del Instituto Wushu Sanchai, escuela de kung fu, taichi y qigong en Barcelona dirigida por el maestro Carlos García.

Stack: [Astro](https://astro.build) estático servido desde [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) con Static Assets.

## Desarrollo

```bash
npm install
npm run dev          # servidor local en http://localhost:4321
npm run build        # genera ./dist
npm run preview      # previsualiza con Wrangler (igual que producción)
```

## Deploy a Cloudflare Workers

Requisitos: tener una cuenta de Cloudflare y `wrangler login` ejecutado una vez.

```bash
npm run deploy
```

El build genera `./dist` (HTML estático puro) y Wrangler lo sube como Static Assets del Worker definido en `wrangler.toml`.

## Estructura

```
src/
  layouts/Base.astro      Layout común (head + header + footer)
  components/             Header, Footer, CallToAction
  pages/                  Una página por ruta
  styles/global.css       Tipografía y paleta global
public/img/               Imágenes (logo y fotos)
```

## Contenido

Por ahora cada página vive como `.astro`. Para añadir un CMS visual (Decap / Tina) en el futuro, los textos pueden moverse a `src/content/` como Markdown sin cambiar el resto.
