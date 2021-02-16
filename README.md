# DEMO TOYOTA

[Alcance inicial Demo / TOYOT -8](https://mdsdigital.atlassian.net/browse/TOYOT-8?atlOrigin=eyJpIjoiMmUzOGZlZGIzNjY2NDhhMGE2YTMxMGNiZjA4M2Q4MjUiLCJwIjoiaiJ9)

**FrontEnd:**

    Crear un proyecto web básico.
    Debe permitir tomar una foto.
    Simular envio de foto.
    Debe recibir un video en una nueva pantalla con la posibilidad de visualizarlo.
    En la pantalla del video, botones de compartir y descargar.

**BackEnd:**

    Recibir foto.
    Funcionalidad de merge de video: Devolver video final mp4 de la unión de video test con foto (ffmpeg) y marca de agua.
    Prueba basica de API DeepFake para enviar foto y recibir video clip.
    Prueba de API Vimeo (Cloud Video), para enviar video y llamada del mismo.
    Enviar foto a FrontEnd.

## Desarrollo
*FrontEnd*
- Nexjs
- Reactjs

*BackEnd*
- Nodejs
- ffmpeg

## Requerimientos
Para el funcionamiento adecuado instalar:

- nodejs v14
- ffmpeg
### Lanzar App

Para correr en desarrollo:

```bash
yarn
yarn dev

# o

npm install
npm run dev
```

Abrir [http://localhost:3131](http://localhost:3131) en el browser para ver la salida.

### Estructura de Archivos

El desarrollo en general se ubica en el folder ```src```.

Cualquier pagina puede ser modificada en  `src/pages/`.

El directorio `pages/api` es mapeado a la ruta `/api/*`, como en ```http://localhost:3131/api/endpoint```. Estos archivos son tratados como [rutas API](https://nextjs.org/docs/api-routes/introduction) en lugar de **routes** en **React**.

Estos endpoint pueden ser editados en `src/pages/api/`.


Se configuro el archivo ```jsconfig.json``` para apuntar al root y las rutas relativas en Nextjs, no necesita usar ```../```. Puede usar la llamada a un import de la siguiente forma:

```javascript
import MyComponent from '@/components/MyComponent';
```
## Test Unitarios

Se ha usado para Testing, [Jest](https://jestjs.io/docs/es-ES/getting-started) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

La Finalidad de los test es no romper las fucionalidades de desarrollo. Si realiza ajustes cerciorese de correr los test y modificar donde sea necesario.

Para correr los test:

```bash
yarn test
# or
npm run test
```

## Despliegue
Se mantiene 2 ramas para este desarrollo: *master*  y *develop*. 

La rama *develop* será donde se haga todo el trabajo de desarrollo.

La rama *master* es donde se sube para producción.

### Para correr en producción:
En un entorno Linux (ubuntu + nginx + nodejs + pm2 + ffmpeg). Instalar un certificado de seguridad SSL (requerido para funcionamiento de camara).

Dentro del folder del sitio web (*website* para este proyecto):

```bash
# Actualizar el repo:
git pull

# Remover .next:
rm -rf  .next

# Actualizar Dependencias:
yarn

# Construir Proyecto:
yarn build

# Reiniciar sitio web:
pm2 restart website
```
Eso es todo!

Nota: en el servidor actual designado se creó un archivo bash de nombre *deploy.sh* que realiza todo el despliegue de la aplicación. Simplemente en el folder del proyecto digite: 

```bash
./deploy.sh
```

### Datos de acceso al servidor (actualizar si es necesario)

```
ssh -i mds-default.pem ubuntu@3.82.116.242
```

_Recuerde solicitar el archivo de firma publica mds-default.pem_

