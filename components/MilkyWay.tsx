// FIX: Switched to React namespace import to resolve JSX intrinsic element type errors.
import * as React from 'react';

const MilkyWay: React.FC = () => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;

            // Calculate position relative to center: range from -0.5 to 0.5
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;

            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // These arrays generate the exact number of divs needed for the CSS nth-child selectors to work correctly.
    const stars = Array.from({ length: 842 }, (_, i) => <div className='star' key={`star-${i}`}></div>);
    const milkyWayStars = Array.from({ length: 880 }, (_, i) => <div className='milky-way-star' key={`mw-star-${i}`}></div>);
    const superStarColors = ['purple', 'hotpink', 'pink'];
    const milkyWaySuperStars = Array.from({ length: 45 }, (_, i) => (
        <div className={`milky-way-super-star ${superStarColors[i % 3]}`} key={`super-star-${i}`}></div>
    ));

    // Define parallax styles for each layer
    // The multiplier determines how much the layer moves. Smaller multiplier = further away.
    const skyStyle = {
        transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        transition: 'transform 0.5s ease-out'
    };

    const milkyWayStyle = {
        transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) rotate(20deg)`,
        transition: 'transform 0.5s ease-out'
    };

    const horizonStyle = {
        transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
        transition: 'transform 0.5s ease-out'
    };

    return (
        <div className='frame'>
            <div className='sky' style={skyStyle}>
                <div className='nebula nebula-1'></div>
                <div className='nebula nebula-2'></div>
                {stars}
                <div className='milky-way' style={milkyWayStyle}>
                    {milkyWayStars}
                    {milkyWaySuperStars}
                </div>
            </div>
            <div className='horizon' style={horizonStyle}></div>
        </div>
    );
};

export default MilkyWay;