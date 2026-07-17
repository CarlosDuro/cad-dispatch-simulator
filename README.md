# CAD Dispatch Simulator

Simulador web de CAD con interfaz oscura, datos persistentes en el navegador y cobertura de los requerimientos 17 al 30.

## Funciones incluidas

- Interfaz web de atención y despacho.
- Dashboard de incidentes activos y completados.
- Exportación PDF y XLSX.
- Mapa OpenStreetMap con incidentes y unidades.
- Creación y gestión de ocurrencias.
- Geocodificación de dirección.
- Búsqueda parcial de hospitales, escuelas, estadios y monumentos.
- Consulta simulada de personas por DNI/CPF.
- Ubicación del incidente mediante clic directo en el mapa.
- Detalle del incidente con código, tipo, prioridad, fecha, solicitante y mapa.
- Despacho de agentes.
- Unidades georreferenciadas y disponibilidad.
- Recomendación por distancia.
- Cronología completa.
- Persistencia mediante `localStorage`.

## Publicación

Sube `index.html`, `styles.css`, `app.js`, `README.md`, `LICENSE` y `.gitignore` a la raíz del repositorio. GitHub Pages debe usar la rama `main` y la carpeta `/(root)`.

## Nota

Es una simulación para demostraciones. Los agentes, personas e incidentes usan datos ficticios. La geocodificación externa depende de disponibilidad de Nominatim/OpenStreetMap.
