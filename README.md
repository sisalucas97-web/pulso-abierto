# Pulso Abierto

**Lucas Sisa · Programación Web · Actividad 4**

Aplicación para consultar en dólares el precio de Bitcoin, Ethereum y Solana en CoinGecko. Permite buscar por nombre o símbolo, abrir el detalle de cada moneda y guardar favoritas en el navegador. Las cotizaciones se actualizan al hacer una consulta.

## Instalación y uso

Versión comprobada de Node.js: 24.22.3. Desde la carpeta que contiene `package.json`, ejecutá los siguientes comandos.

| Tarea | Comando | Resultado |
| --- | --- | --- |
| Instalar dependencias | `npm ci` | Instala las versiones del archivo de bloqueo. |
| Iniciar en desarrollo | `npm run dev` | Muestra la dirección local en la terminal. |
| Ejecutar las pruebas | `npm run test` | Ejecuta la suite de Vitest una vez. |
| Generar la versión productiva | `npm run build` | Comprueba TypeScript y genera los archivos de `dist/`. |
| Comprobar la versión productiva | `npm run preview` | Sirve el último build en la dirección indicada. |

Para probar la aplicación, dejá «todas» en el formulario y elegí **Consultar precios**. Desde una tarjeta podés marcar la moneda como favorita y abrir su detalle. Al volver al listado, elegí **Solo favoritas** y volvé a consultar.

## Tecnologías

React y TypeScript para la interfaz, Vite para desarrollo y compilación, React Router para las rutas, Zustand con almacenamiento local para los favoritos y Zod para validar el formulario. Las pruebas usan Vitest, Testing Library y jsdom. La consulta al servicio público de CoinGecko se realiza desde el navegador y no requiere configurar variables de entorno.

## Mejora de mantenibilidad

Los identificadores de las tres monedas figuraban tanto en el catálogo de la aplicación como en la URL de CoinGecko. Si se modificaba el catálogo, había que acordarse de actualizar también la consulta. En `src/services/prices.ts` pasé a construir el parámetro `ids` a partir de `coins`. Así, ambos usan la misma lista y se conserva la consulta original.

Las nueve pruebas pasaron antes y después del cambio. Además, comprobé que la solicitud siguiera incluyendo los tres identificadores en el mismo orden y que el listado representara los tres precios en USD.

## Publicación

La configuración de Vercel está en `vercel.json`. Se debe importar la rama `main` del repositorio de GitHub y elegir la carpeta que contiene `package.json` como raíz. El proyecto usa el preset Vite, el comando `npm run build` y el directorio de salida `dist`. La regla para `/criptomonedas/:id` permite abrir y recargar un detalle directamente.

**URL pública en Vercel:** pendiente de publicación.

## Verificación final

**Fecha de verificación local:** 24 de noviembre de 2026.

| Comprobación | Resultado |
| --- | --- |
| Pruebas | 9 de 9 aprobadas en 3 archivos. Cubren el servicio, estados de carga y error, reintento, navegación, persistencia de favoritos y solicitudes superpuestas. |
| Build | TypeScript y Vite finalizaron correctamente. Se generó `dist/index.html` con sus archivos JavaScript y CSS. |
| API | CoinGecko devolvió HTTP 200 y precios numéricos para las tres monedas. También se observó el límite temporal de consultas (HTTP 429). |
| Preview | Se ejecutó `npm run preview`. En Chromium, a 390 y 1440 px de ancho, se validó el formulario vacío, se consultaron los tres precios y se recorrió listado → detalle → recarga → listado. El favorito se conservó y el filtro mostró una sola moneda. Se comprobó que no hubiera desbordamiento horizontal en el listado ni errores de consola durante estos recorridos con una respuesta real guardada de la API. |
| Despliegue | Pendiente del push a GitHub, la publicación en Vercel y la comprobación desde la URL pública. |
