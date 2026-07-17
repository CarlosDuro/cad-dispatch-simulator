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
