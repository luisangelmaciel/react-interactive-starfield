# React Moving Stars: Documentación Técnica

## 1. Descripción General del Proyecto

React Moving Stars es una aplicación web inmersiva y visualmente cautivadora que recrea el efecto de "Estrellas en Movimiento en el Universo" utilizando React y Tailwind CSS. La aplicación ofrece tres experiencias visuales distintas: un campo de estrellas dinámico, una vista serena de la Vía Láctea con efecto de paralaje y una escena animada caprichosa. El objetivo principal es proporcionar una experiencia de pantalla completa sin interrupciones, sin barras de desplazamiento, que sea a la vez interactiva y estéticamente agradable.

## 2. Características

- **Selector de Vistas**: Navega sin problemas entre tres modos visuales distintos.
- **Vista de Estrellas en Movimiento**:
  - Efecto dinámico de campo de estrellas con astros que emanan del centro.
  - Controles de usuario para la velocidad de la animación, la densidad de estrellas y la paleta de colores.
  - Imagen de fondo cósmica.
- **Vista de la Vía Láctea**:
  - Escena del espacio profundo con un detallado campo de estrellas estático y una Vía Láctea prominente.
  - Efecto de paralaje interactivo que responde al movimiento del ratón.
  - Nebulosas animadas y coloridas que crean una atmósfera dinámica.
- **Vista de RuPaul**:
  - Una escena extravagante que presenta a RuPaul como un astronauta giratorio.
  - Fondo espacial con desplazamiento y un efecto de "agujero negro" pulsante.
- **Modo de Pantalla Completa**: Un interruptor global para entrar y salir de una experiencia inmersiva a pantalla completa.
- **Diseño Responsivo e Inmersivo**: Sin barras de desplazamiento y con un diseño que se adapta al viewport.

## 3. Stack Tecnológico

- **Librería Frontend**: React 19
- **Lenguaje**: TypeScript
- **Estilos**:
  - **Tailwind CSS** (a través de CDN) para un estilizado rápido basado en utilidades.
  - **CSS Personalizado** en `index.html` para animaciones complejas (`@keyframes`) y posicionamiento detallado de elementos.
- **Iconos**: Font Awesome (a través de CDN)
- **Carga de Módulos**: Módulos ES servidos a través de `esm.sh` (no se requiere un paso de compilación local).

## 4. Estructura del Proyecto

```
/
├── components/
│   ├── MilkyWay.tsx       # Renderiza la vista del espacio profundo con paralaje.
│   ├── MovingStars.tsx    # Renderiza la simulación interactiva del campo de estrellas.
│   ├── RuPaul.tsx         # Renderiza la vista del astronauta giratorio.
│   ├── Star.tsx           # Componente de una sola estrella para la vista MovingStars.
│   └── ViewSwitcher.tsx   # UI para cambiar entre las diferentes vistas.
├── App.tsx                # Componente principal de la aplicación, maneja el enrutamiento de vistas.
├── index.html             # Punto de entrada HTML, incluye enlaces CDN y CSS global.
├── index.tsx              # Punto de entrada de la aplicación React, monta el componente App.
├── metadata.json          # Metadatos del proyecto.
└── types.ts               # Definiciones de tipos de TypeScript.
```

## 5. Desglose de Componentes

### `App.tsx`

- **Propósito**: El componente raíz que actúa como el controlador principal.
- **Estado**: Gestiona el `currentView` para determinar qué experiencia visual está activa y `isFullscreen` para rastrear el estado de pantalla completa del navegador.
- **Funcionalidad**: Renderiza el componente de la vista activa (`MovingStars`, `MilkyWay`, o `RuPaul`), el `ViewSwitcher` global y el botón de alternancia de pantalla completa. Contiene la lógica para cambiar de vista y gestionar las transiciones a pantalla completa.

### `MovingStars.tsx`

- **Propósito**: Crea el efecto dinámico de "viaje a través del espacio".
- **Estado**: Gestiona un array de `stars`, `animationSpeed`, `starDensity`, y la `activePalette` seleccionada.
- **Funcionalidad**: Utiliza un hook `useEffect` para generar continuamente nuevas estrellas basadas en la configuración de densidad y velocidad. Cada estrella es una instancia del `StarComponent`. Se utiliza un `setTimeout` para eliminar las estrellas del DOM después de que su animación se completa, asegurando un buen rendimiento. También renderiza el panel de control del usuario.

### `Star.tsx`

- **Propósito**: Representa una única estrella animada en la vista `MovingStars`.
- **Props**: Recibe sus coordenadas de destino (`endX`, `endY`), `color`, y `duration` de la animación.
- **Funcionalidad**: Compuesto por dos `div`. El `div` padre maneja la animación de traslación (`move-star`), mientras que el `div` hijo se encarga de la apariencia visual y una animación de parpadeo aleatoria (`twinkle`).

### `MilkyWay.tsx`

- **Propósito**: Muestra una hermosa escena del espacio profundo con un efecto de paralaje.
- **Estado**: Rastrea la posición del ratón (`mousePos`) en relación con el centro de la pantalla.
- **Funcionalidad**: Un listener de eventos en `mousemove` actualiza el estado. Este estado se utiliza para aplicar propiedades `transform` de CSS a diferentes capas (cielo, vía láctea, horizonte), creando una sensación de profundidad a medida que el usuario mueve el cursor. Las estrellas y nebulosas se renderizan utilizando clases de CSS predefinidas.

### `RuPaul.tsx`

- **Propósito**: Una escena divertida y animada.
- **Funcionalidad**: Este componente está estilizado principalmente con CSS. Utiliza animaciones `@keyframes` para el fondo en desplazamiento, el astronauta giratorio, la trayectoria de movimiento del astronauta y el agujero negro pulsante.

### `ViewSwitcher.tsx`

- **Propósito**: Proporciona al usuario una interfaz para cambiar entre las vistas principales.
- **Props**: Recibe el `currentView` y una función de callback `onViewChange` desde `App.tsx`.
- **Funcionalidad**: Es un componente de presentación que itera sobre las vistas disponibles para crear botones en miniatura. Al hacer clic en un botón, se invoca el callback `onViewChange` para actualizar el estado de la aplicación.

## 6. Detalles Clave de Implementación

- **Estrategia de Estilizado**: El proyecto emplea un enfoque híbrido. Tailwind CSS se utiliza para el diseño rápido y el estilizado de componentes. Para animaciones complejas de varios pasos (`@keyframes`) y estilos muy específicos y no reutilizables (como las posiciones individuales de las estrellas en `MilkyWay.tsx`), se utiliza una etiqueta `<style>` global en `index.html` para mayor claridad y separación de responsabilidades.

- **Rendimiento**: En `MovingStars.tsx`, el rendimiento es una consideración clave. Al eliminar programáticamente los elementos de estrella del DOM a través de `setTimeout` después de que su animación finaliza, la aplicación evita la degradación del rendimiento con el tiempo debido a un número creciente de nodos en el DOM.

- **Gestión de Estado**: El estado se gestiona localmente dentro de los componentes utilizando Hooks de React (`useState`, `useRef`, `useEffect`) siempre que sea posible. El estado global, como la vista activa, se eleva al ancestro común más cercano, `App.tsx`, y se pasa a los componentes hijos como props.

## 7. Cómo Ejecutar

Este proyecto está configurado para ejecutarse directamente en el navegador sin necesidad de un paso de compilación.

1.  Asegúrate de que todos los archivos estén en el mismo directorio.
2.  Abre el archivo `index.html` en un navegador web moderno.
