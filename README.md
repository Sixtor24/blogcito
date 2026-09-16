# RASTER / LAB

Blog educativo interactivo en español sobre rasterización, creado con React, Vite, Motion y Lucide.

## Desarrollo

```sh
npm install
npm run dev
```

## Verificación

```sh
npm test
npm run build
```

`npm run preview` permite revisar la compilación de producción.

## Estructura

- `src/algorithms`: implementaciones reales de DDA, Bresenham y Punto Medio, con pruebas de octantes, extremos, conectividad y simetría.
- `src/components`: navegación, contenido educativo, cuadrícula SVG y laboratorio.
- `src/hooks/usePlayback.js`: reproducción, pausa y navegación por iteraciones.
- `src/data`: contenido y pseudocódigo.
- `src/styles`: sistema visual adaptable y preferencias de movimiento reducido.

Las líneas recorren de (2, 10) a (14, 3). El círculo usa centro (8, 7) y radio 5. Cada paso de Punto Medio refleja un punto en hasta ocho posiciones; los puntos de simetría coincidentes se deduplican. Las coordenadas de las visualizaciones siguen la convención cartesiana (Y aumenta hacia arriba).

El laboratorio permite seleccionar el algoritmo, reproducir, pausar, reiniciar, avanzar o retroceder y arrastrar el control de iteración. Cambiar de algoritmo reinicia su estado.
