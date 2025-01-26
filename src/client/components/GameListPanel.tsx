import { useState } from 'react';
import { Game } from '../types/game';

interface GameListPanelProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onCreateNew: () => void;
  onDeleteGame: (gameId: string) => void; // Add onDeleteGame prop
}

export default function GameListPanel({ games, onSelectGame, onCreateNew, onDeleteGame }: GameListPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [panelWidth, setPanelWidth] = useState(240);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setPanelWidth(isOpen ? 50 : 240);
  };

  const handleCreateNew = () => {
    onCreateNew();
  };

  return (
    <div className="flex">
      <div className={`bg-gray-100 h-screen shadow-lg`} 
           style={{ width: `${isOpen ? panelWidth : 50}px` }}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {isOpen && <h1 className="text-xl font-bold">Kids Game Maker</h1>}
          <button onClick={togglePanel} className="p-2 hover:bg-gray-200 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="p-4">
            <button onClick={handleCreateNew} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full">
              New Game
            </button>
            <div className="space-y-2">
              {games.map((game) => (
                <div key={game.id} className="relative group p-3 hover:bg-gray-200 rounded cursor-pointer">
                  <div onClick={() => onSelectGame(game)}>
                    {game.title}
                  </div>
                  <button 
                    onClick={() => onDeleteGame(game.id)} 
                    className="absolute right-2 top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}