// FIX: Switched to React namespace import to resolve JSX intrinsic element type errors.
import * as React from 'react';
import StarComponent from './Star';
import type { Star } from '../types';

const colorPalettes = {
  cosmic: {
    name: 'Cosmic',
    colors: ['#FFFFFF', '#FFD700', '#ADD8E6', '#FF6347'], // White, Gold, Light Blue, Tomato
  },
  sunset: {
    name: 'Sunset',
    colors: ['#FF4500', '#FF8C00', '#FFD700', '#DA70D6'], // OrangeRed, DarkOrange, Gold, Orchid
  },
  ocean: {
    name: 'Ocean',
    colors: ['#00BFFF', '#20B2AA', '#AFEEEE', '#F0FFFF'], // DeepSkyBlue, LightSeaGreen, PaleTurquoise, Azure
  },
  monochrome: {
    name: 'Monochrome',
    colors: ['#FFFFFF', '#F5F5F5', '#DCDCDC', '#C0C0C0'], // White, WhiteSmoke, Gainsboro, Silver
  },
};

type PaletteKey = keyof typeof colorPalettes;


/**
 * @component MovingStars
 * @description A functional React component that renders a space travel simulation.
 * Stars emanate from the screen's center and move outwards, creating a "starfield" effect.
 * This component manages star creation, animation, and removal, and provides user controls
 * for animation speed, star density, and color palette.
 *
 * @state {Star[]} stars - An array of star objects, each with properties for id, end position, and color.
 * @state {number} animationSpeed - The duration of the star animation in seconds, controlled by the user.
 * @state {number} starDensity - The number of stars to create in each burst.
 * @state {string} activePalette - The key of the currently selected color palette.
 * @ref {React.MutableRefObject<number>} starIdCounter - A counter to assign unique IDs to each new star, persisting across renders.
 *
 * @returns {React.ReactElement} The JSX element that renders the cosmic background, control panel, and animated stars.
 */
const MovingStars: React.FC = () => {
  const [stars, setStars] = React.useState<Star[]>([]);
  const [animationSpeed, setAnimationSpeed] = React.useState(5); // Default duration: 5 seconds
  const [starDensity, setStarDensity] = React.useState(7); // Default stars per burst
  const [activePalette, setActivePalette] = React.useState<PaletteKey>('cosmic');
  const starIdCounter = React.useRef(0);

  /**
   * @function handleSpeedChange
   * @description Updates the `animationSpeed` state when the user interacts with the speed slider.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the slider input.
   */
  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(parseFloat(event.target.value));
  };
  
  /**
   * @function handleDensityChange
   * @description Updates the `starDensity` state when the user interacts with the density slider.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the slider input.
   */
  const handleDensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStarDensity(parseInt(event.target.value, 10));
  };

  /**
   * @function handlePaletteChange
   * @description Updates the `activePalette` state when the user selects a new color palette.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the palette select dropdown.
   */
  const handlePaletteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActivePalette(event.target.value as PaletteKey);
  };


  /**
   * @effect
   * @description Manages the lifecycle of star creation and removal.
   * It triggers whenever `animationSpeed`, `starDensity`, or `activePalette` changes.
   * - Calculates `starCreationInterval`: The time interval between creating new stars.
   *   This interval is inversely proportional to `animationSpeed`, creating more stars
   *   when the animation is faster to maintain visual density.
   * - Defines `createStarsInBurst`: a function that generates a batch of stars (based on `starDensity`) with random properties
   *   (end position, color from the active palette) and adds them to the state.
   * - Sets up a timer (`setTimeout`) to remove each star after its animation has completed
   *   (based on `animationSpeed`), preventing DOM element buildup.
   * - Uses `setInterval` to call `createStarsInBurst` repeatedly.
   * - The cleanup function (`return () => ...`) clears the interval when the component unmounts
   *   or dependencies change, preventing memory leaks.
   */
  React.useEffect(() => {
    // Dynamically adjust star creation interval based on animation speed
    const minSpeed = 1; // Corresponds to fastest animation
    const maxSpeed = 10; // Corresponds to slowest animation
    const minInterval = 50; // ms, for fastest speed
    const maxInterval = 200; // ms, for slowest speed

    const speedFraction = (animationSpeed - minSpeed) / (maxSpeed - minSpeed);
    const starCreationInterval = maxInterval - (speedFraction * (maxInterval - minInterval));

    const createStarsInBurst = (count: number) => {
      const currentColors = colorPalettes[activePalette].colors;
      for (let i = 0; i < count; i++) {
        const newStarId = starIdCounter.current++;
        const randomColor = currentColors[Math.floor(Math.random() * currentColors.length)];
        const newStar: Star = {
          id: newStarId,
          endX: Math.random() * 200 - 100,
          endY: Math.random() * 200 - 100,
          color: randomColor,
        };

        setStars(prevStars => [...prevStars, newStar]);

        setTimeout(() => {
          setStars(prev => prev.filter(star => star.id !== newStarId));
        }, animationSpeed * 1000);
      }
    };

    const intervalId = setInterval(() => createStarsInBurst(starDensity), starCreationInterval);
    return () => clearInterval(intervalId);
  }, [animationSpeed, starDensity, activePalette]);

  return (
    <div 
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=100")' }}
    >
      <div className="absolute top-5 left-5 z-10 p-4 bg-black/50 rounded-lg text-white w-60 backdrop-blur-sm">
        <div className="mb-4">
          <label htmlFor="speed-slider" className="block mb-2 text-sm font-medium">
            Animation Speed
          </label>
          <input
            id="speed-slider"
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={animationSpeed}
            onChange={handleSpeedChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            aria-label="Adjust star animation speed"
          />
          <span className="block text-center mt-1 text-xs">{animationSpeed.toFixed(1)}s</span>
        </div>
        <div className="mb-4">
          <label htmlFor="density-slider" className="block mb-2 text-sm font-medium">
            Star Density
          </label>
          <input
            id="density-slider"
            type="range"
            min="1"
            max="20"
            step="1"
            value={starDensity}
            onChange={handleDensityChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            aria-label="Adjust star density"
          />
          <span className="block text-center mt-1 text-xs">{starDensity} stars/burst</span>
        </div>
        <div>
          <label htmlFor="palette-select" className="block mb-2 text-sm font-medium">
            Color Palette
          </label>
          <select
            id="palette-select"
            value={activePalette}
            onChange={handlePaletteChange}
            className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg appearance-none cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Select star color palette"
          >
            {Object.entries(colorPalettes).map(([key, palette]) => (
              <option key={key} value={key}>
                {palette.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {stars.map((star) => (
        <StarComponent 
          key={star.id} 
          endX={star.endX} 
          endY={star.endY} 
          color={star.color}
          duration={animationSpeed}
        />
      ))}
    </div>
  );
};

export default MovingStars;