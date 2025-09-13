// FIX: Switched to React namespace import to resolve JSX intrinsic element type errors.
import * as React from 'react';
import MovingStars from './components/MovingStars';
import MilkyWay from './components/MilkyWay';
import RuPaul from './components/RuPaul';
import ViewSwitcher from './components/ViewSwitcher';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<View>('moving');
  const [isFullscreen, setIsFullscreen] = React.useState(!!document.fullscreenElement);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        // Added basic error handling for cases where fullscreen is denied.
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-black overflow-hidden relative">
        {currentView === 'moving' && <MovingStars />}
        {currentView === 'milkyWay' && <MilkyWay />}
        {currentView === 'rupaul' && <RuPaul />}
      </div>
      <button
        onClick={toggleFullscreen}
        className="fixed top-5 right-5 z-50 text-white/50 hover:text-white transition-colors p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
        aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
      >
        <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} fa-lg`}></i>
      </button>
      <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />
    </>
  );
};

export default App;