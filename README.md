# DEMO TOYOTA

[Alcance inicial Demo / TOYOT -8](https://mdsdigital.atlassian.net/browse/TOYOT-8?atlOrigin=eyJpIjoiMmUzOGZlZGIzNjY2NDhhMGE2YTMxMGNiZjA4M2Q4MjUiLCJwIjoiaiJ9)

**Usuario (FrontEnd):**

    Crear un proyecto web básico.
    Debe permitir tomar una foto.
    Simular envio de foto.
    Debe recibir un video en una nueva pantalla con la posibilidad de visualizarlo.
    En la pantalla del video, botones de compartir y descargar.

**Usuario (BackEnd):**

    Recibir foto.
    Funcionalidad de merge de video: Devolver video final mp4 de la unión de video test con foto (ffmpeg) y marca de agua.
    Prueba basica de API DeepFake para enviar foto y recibir video clip.
    Prueba de API Vimeo (Cloud Video), para enviar video y llamada del mismo.
    Enviar foto a FrontEnd.

## Desarrollo

Este proyecto de [Next.js](https://nextjs.org/) se ha creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Lanzar App

Para correr en desarrollo:

```bash
npm install
npm run dev
# o
yarn
yarn dev
```

Abrir [http://localhost:3131](http://localhost:3131) en el browser para ver la salida.

### Estructura de Archivos

El desarrollo en general se ubica en el folder ```src```.

Cualquier pagina puede ser modificada en  `src/pages/`.

[rutas API](https://nextjs.org/docs/api-routes/introduction) pueden ser accedidas desde [http://localhost:3131/api/endpoint](http://localhost:3131/api/hello). Estos endpoint pueden ser editados en `src/pages/api/`.

El directorio `pages/api` es mapeado a la ruta `/api/*`. Estos archivos son tratados como [rutas API](https://nextjs.org/docs/api-routes/introduction) en lugar de **routes** en **React**.

Se configuro el archivo ```jsconfig.json``` para apuntar al root y las rutas relativas en Nextjs, no necesita usar ```../```. Puede usar la llamada a un import de la siguiente forma:

```import MyComponent from '@/components/MyComponent';```

## Test Unitarios

Se ha usado para Testing, [Jest](https://jestjs.io/docs/es-ES/getting-started) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

La Finalidad de los test es no romper las fucionalidades de desarrollo. Si realiza ajustes cerciorese de correr los test y modificar donde sea necesario.

Para correr los test:

```bash
npm run test
# or
yarn test
```

## Despliegue

Loren ipsum.....