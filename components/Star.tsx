// FIX: Switched to React namespace import to resolve JSX intrinsic element type errors.
import * as React from 'react';

interface StarProps {
  endX: number;
  endY: number;
  color: string;
  duration: number;
}

const StarComponent: React.FC<StarProps> = ({ endX, endY, color, duration }) => {
  // Styles for the parent container, controlling the movement animation.
  const motionStyle = {
    '--end-x': `${endX}vw`,
    '--end-y': `${endY}vh`,
    animationDuration: `${duration}s`,
  } as React.CSSProperties;

  // Styles for the child element, controlling the visual appearance and twinkle effect.
  // Randomizing delay and duration makes the star field appear more dynamic and natural.
  const twinkleStyle = {
    backgroundColor: color,
    boxShadow: `0 0 10px ${color}`,
    animationDelay: `${Math.random() * 2}s`, // Start twinkling at a random time
    animationDuration: `${1.5 + Math.random()}s`, // Twinkle at a random speed (1.5s to 2.5s)
  } as React.CSSProperties;

  return (
    // This parent div handles the movement and overall fade-in/out of the star.
    <div
      className="absolute top-1/2 left-1/2 animate-star-motion"
      style={motionStyle}
    >
      {/* This child div is the visible star itself, with a twinkling animation. */}
      <div
        className="h-1 w-1 rounded-full animate-star-twinkle"
        style={twinkleStyle}
      />
    </div>
  );
};

export default StarComponent;