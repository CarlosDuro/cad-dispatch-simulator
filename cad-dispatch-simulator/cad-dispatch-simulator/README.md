# CAD Dispatch Simulator

Prototipo frontend para simular un módulo de **Computer-Aided Dispatch (CAD)** con un look & feel oscuro similar a una consola de despacho de emergencias.

## Incluye

- Lista de incidentes abiertos y cerrados.
- Prioridades alta, media y baja.
- Panel de detalle, notas y cronología.
- Mapa simulado con ubicación del incidente.
- Unidades disponibles y ocupadas.
- Asignación de unidades a incidentes.
- Vista de mapa operativo.
- Alta de nuevos incidentes.
- Diseño responsive.
- Tema oscuro y claro.

## Ejecutar localmente

No requiere instalación ni compilación.

```bash
python -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

También puedes abrir `index.html` directamente, aunque se recomienda un servidor local.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de este proyecto a la rama `main`.
3. En GitHub ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/root`.
6. Guarda los cambios.

## Crear el repositorio desde terminal

```bash
git init
git add .
git commit -m "Initial CAD simulator"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cad-dispatch-simulator.git
git push -u origin main
```

## Estructura

```text
cad-dispatch-simulator/
├── index.html
├── styles.css
├── app.js
├── README.md
├── LICENSE
└── .gitignore
```

## Aviso

Este proyecto es una simulación visual para demostraciones y prototipos. No procesa emergencias reales, no incluye autenticación, persistencia, GPS real, telefonía, radio, GIS productivo ni integración con agencias.
