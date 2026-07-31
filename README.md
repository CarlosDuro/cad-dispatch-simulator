# N11 Operations Suite v20

Versión reconstruida para que cada pestaña superior muestre la pantalla correspondiente a las referencias:

- **Calltaker**: cola de llamadas y estado operativo.
- **Calltaker Console**: llamada activa, mapa/dirección, conversación e Incident Readiness.
- **Dispatch Console**: lista de incidentes, mapa/comunicaciones, detalle y misiones.
- **Map**: lista de incidentes, mapa completo con unidades y detalle del incidente.

## Funciones

- Navegación real entre pestañas y URL hash.
- Inicio/finalización de llamadas simuladas y temporizador.
- Incidentes previos por número telefónico.
- Creación de incidente desde Calltaker Console.
- Búsqueda parcial por DNI/CPF o nombre.
- Selección y despacho de unidades.
- Movimiento simulado de unidades cada dos segundos.
- Unidades en ruta avanzan hacia el incidente asignado.
- Exportación PDF y XLSX.
- Dashboard, Personas y Reportes desde el botón de utilidades.
- Mapas OpenStreetMap con Leaflet.

Todos los datos son ficticios y se guardan en `localStorage`.


## Versión v21 — ruta y despacho de la unidad más cercana

- El sistema selecciona automáticamente la unidad disponible más cercana al incidente.
- Al despacharla, solicita la ruta vial a OSRM y la dibuja sobre Dispatch Console y Map.
- Si el servicio de rutas no está disponible, genera una ruta simulada de respaldo.
- La línea azul representa el recorrido pendiente y la verde el trayecto completado.
- La unidad avanza por la geometría de la ruta cada dos segundos.
- Se muestran progreso, distancia restante y ETA en Missions, Dispatch y Map.
- Al llegar, la unidad cambia automáticamente a `on_scene`.
