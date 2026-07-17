# N11 Dispatch — versión funcional

Aplicación web de despacho con cobertura funcional de los requerimientos 17 al 30.

## Cobertura implementada

- 17: interfaz web de atención y despacho.
- 18: dashboard de incidentes en curso y completados.
- 19: informes PDF y XLSX para incidentes finalizados e historial general.
- 20: mapa OpenStreetMap con eventos y datos cartográficos.
- 21: formulario y panel de ocurrencias.
- 22: geocodificación de direcciones desde el registro.
- 23: búsqueda parcial de puntos de interés locales y OpenStreetMap.
- 24: consulta simulada por DNI/CPF.
- 25: ubicación directa mediante clic en el mapa.
- 26: detalle completo del incidente.
- 27: despacho de agentes.
- 28: agentes georreferenciados, disponibilidad, velocidad, rumbo y estado.
- 29: recomendación por proximidad, distancia vial y ETA mediante OSRM, con respaldo por distancia geográfica.
- 30: cronología completa de eventos.

## Flujo operativo

Disponible → Despachada → En ruta → En escena → Liberada/Disponible.

## Instalación en GitHub Pages

Sube directamente a la raíz del repositorio:

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `LICENSE`
- `.gitignore`

Configura GitHub Pages desde la rama `main` y la carpeta `/(root)`.

## Dependencias externas

La aplicación usa Leaflet, jsPDF y SheetJS desde CDN. La geocodificación usa Nominatim/OpenStreetMap y la ruta/ETA usa OSRM. Si OSRM no responde, se utiliza una estimación directa.

## Alcance

La versión es funcional para demostraciones y validación de requisitos. Los datos de personas, incidentes y unidades son ficticios. Un despliegue productivo requiere autenticación, base de datos, auditoría, GIS corporativo y AVL/GPS real.


## Búsqueda flexible de personas

La sección Personas busca desde el primer carácter y acepta:

- Cualquier fragmento del DNI o CPF: `1`, `12`, `456`, `12345678901`.
- Nombre completo o parcial: `Daniel`, `dan`, `Lorenzo`, `lor`.
- Coincidencias dentro del documento, no únicamente al inicio.
- Resultados múltiples ordenados por relevancia.
- Búsqueda automática mientras se escribe.


## Registro ampliado
Incluye 80 personas ficticias, ejemplos rápidos y tarjetas de identidad simuladas con fotografía ilustrada localmente. Todos los datos son ficticios.


## Corrección de datos anteriores

Esta versión usa una nueva clave de almacenamiento local para evitar que una versión anterior con solo tres personas sustituya el registro ampliado. Al abrir Personas se ejecuta automáticamente una búsqueda de ejemplo y se muestra una tarjeta con ilustración. El botón “Restablecer datos demo” permite limpiar la información guardada en el navegador.


## Versión v5

Los archivos JavaScript y CSS se renombraron a `app-v5.js` y `styles-v5.css` para evitar que GitHub Pages o el navegador reutilicen versiones anteriores almacenadas en caché. En la pantalla Personas debe aparecer la insignia “v5 · DNI ilustrado”.


## Corrección v6
Se corrigió un error de JavaScript que impedía navegar entre las secciones. La versión fue validada con `node --check`.


## Versión v7 limpia

El paquete contiene únicamente los archivos de la versión vigente:

- `index.html`
- `app-v7.js`
- `styles-v7.css`

`index.html` apunta expresamente a esos archivos. La sintaxis de `app-v7.js` fue validada con Node.js. La insignia visible en Personas debe indicar “v7 · navegación corregida”.


## Versión v8 responsive

Se ajustó el diseño para funcionar dentro de contenedores embebidos como SBO/Omniview:

- Scroll independiente en incidentes, detalle y recursos.
- Reacomodo de tres a dos columnas en anchos medianos.
- Recursos pasan a una fila completa cuando el ancho es limitado.
- En tablet/móvil se apilan las secciones.
- Barra lateral compacta.
- Mapa con altura adaptable.
- Tablas y tarjetas con desplazamiento horizontal cuando es necesario.


## Versión v9 — scroll de Dispatch

Se corrigió el selector responsive para utilizar las clases reales del HTML (`.app`, `.main`, `#view-dispatch` y `.dispatch-grid`).

La pantalla Dispatch ahora tiene un scroll general visible dentro del widget de Omniview/SBO:

- Scroll vertical para llegar a unidades, notas y contenido inferior.
- Scroll horizontal cuando el contenedor es más angosto que las tres columnas.
- Barra superior fija dentro de la aplicación.
- Los paneles ya no recortan el contenido antes de que actúe el scroll.


## Versión v10 — scroll general

La aplicación ya no depende de un scroll interno en `#view-dispatch`. Ahora utiliza el scroll nativo del documento dentro del iframe de Omniview/SBO, que es más compatible:

- Scroll vertical general del contenido.
- Scroll horizontal cuando las tres columnas superan el ancho disponible.
- Sidebar y barra superior permanecen visibles mediante `position: sticky`.
- Se eliminaron los bloqueos efectivos producidos por `overflow: hidden` y alturas fijas.


## Versión v11 — controles alineados

Se corrigió la distribución de los controles de unidades:

- Selectores con ancho flexible.
- Botones con altura uniforme.
- “Despachar”, “Localizar”, “Avanzar estado” y “Liberar” ya no se cortan.
- En espacios reducidos los selectores pasan arriba y los botones quedan en una fila de dos columnas.


## Versión v12 — ajuste a zoom 100%

Se eliminaron los anchos mínimos rígidos que desplazaban la tercera columna fuera de pantalla.

- En pantallas amplias se conservan tres columnas.
- En laptops y contenedores de hasta 1500 px, el mapa y recursos pasan automáticamente debajo de incidentes y detalle.
- En pantallas pequeñas, todas las secciones se apilan.
- El mapa usa siempre el 100% del ancho disponible.
