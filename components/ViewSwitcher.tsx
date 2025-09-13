import * as React from 'react';
import type { View } from '../types';

interface ViewSwitcherProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const views: { id: View; name: string; }[] = [
  { id: 'moving', name: 'Moving Stars' },
  { id: 'milkyWay', name: 'Milky Way' },
  { id: 'rupaul', name: 'RuPaul' },
];

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-end space-x-4 p-2 bg-black/50 rounded-lg backdrop-blur-sm">
      {views.map(view => (
        <div key={view.id} className="flex flex-col items-center">
          <button
            onClick={() => onViewChange(view.id)}
            className={`w-28 h-16 rounded-md border-2 overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black/50 ${
              currentView === view.id ? 'border-indigo-400 scale-105 shadow-lg shadow-indigo-500/50 focus:ring-indigo-400' : 'border-gray-600 hover:border-gray-400 focus:ring-gray-500'
            }`}
            aria-label={`Switch to ${view.name} view`}
            aria-pressed={currentView === view.id}
          >
             <div className={`w-full h-full thumbnail-${view.id}`}></div>
          </button>
          <span className={`mt-2 text-xs font-bold transition-colors ${currentView === view.id ? 'text-white' : 'text-gray-400'}`}>
            {view.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ViewSwitcher;
