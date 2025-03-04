// Kids Game Generator
// Copyright (C) 2025 Daniel Maas
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
import { useState } from 'react';
import { Game } from '../types/game';

interface GameListPanelProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onCreateNew: () => void;
  onDeleteGame: (gameId: string) => void; // Add onDeleteGame prop
  isCreatingNewGame: boolean; // Add isCreatingNewGame prop
  selectedGameId?: string; // Add selectedGameId prop
}

export default function GameListPanel({
  games,
  onSelectGame,
  onCreateNew,
  onDeleteGame,
  isCreatingNewGame,
  selectedGameId,
}: GameListPanelProps) {
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
      <div
        className={`bg-gray-100 h-screen shadow-lg`}
        style={{ width: `${isOpen ? panelWidth : 50}px` }}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          {isOpen && <h1 className="text-xl font-bold">Kids Game Maker</h1>}
          <button onClick={togglePanel} className="p-2 hover:bg-gray-200 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="p-4">
            <button
              onClick={handleCreateNew}
              className="bg-blue-500 text-white px-4 py-2 rounded 
              hover:bg-blue-600
              mb-4 w-full"
              disabled={isCreatingNewGame} // Disable button when creating new game
            >
              New Game
            </button>
            <div className="space-y-2">
              {games.map((game) => (
                <div
                  key={game.id}
                  className={`relative group p-3 hover:bg-gray-200 rounded cursor-pointer ${selectedGameId === game.id ? 'bg-blue-100' : ''}`} // Highlight selected game
                  onClick={() => onSelectGame(game)}
                >
                  {game.title}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteGame(game.id);
                    }}
                    className="absolute right-2 top-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
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
