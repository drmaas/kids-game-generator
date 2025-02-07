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
import { useState, useRef, useEffect } from 'react';
import GameListPanel from './components/GameListPanel';
import ChatDialog from './components/ChatDialog';
import GamePreview from './components/GamePreview';
import useGameStorage from './hooks/useGameStorage';
import { Game, Message } from './types/game';

export default function App() {
  const { games, saveGame, deleteGame } = useGameStorage(); // Add deleteGame
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const gamePreviewRef = useRef<HTMLDivElement>(null); // Add ref for GamePreview
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // Add dimensions state

  useEffect(() => {
    if (gamePreviewRef.current) {
      const { offsetWidth, offsetHeight } = gamePreviewRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [gamePreviewRef]);

  const handleCreateGame = async (prompt: string) => {
    setMessages((prev) => [...prev, { content: prompt, isBot: false }]);
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''}/api/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, dimensions }), // Include dimensions
        }
      );

      if (response.ok === false) {
        throw new Error('Service Unavailable');
      }

      const { code, summary } = await response.json();
      const newGame: Game = {
        id: Date.now().toString(),
        title: `Game ${games.length + 1}`,
        code,
        summary,
        createdAt: new Date(),
      };

      saveGame(newGame);
      setSelectedGame(newGame);
      setMessages((prev) => [...prev, { content: summary, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: (error as Error).message === 'Service Unavailable' 
            ? 'Failed to create game. Service is currently unavailable. Please try again later.' 
            : 'Failed to create game. Please try again.',
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleNewGame = () => {
    setMessages([]);
    setSelectedGame(null);
  };

  const handleDeleteGame = (gameId: string) => {
    deleteGame(gameId);
    if (selectedGame?.id === gameId) {
      setSelectedGame(null);
    }
  };

  return (
    <div className="h-screen flex">
      <GameListPanel 
        games={games} 
        onSelectGame={setSelectedGame} 
        onCreateNew={handleNewGame} 
        onDeleteGame={handleDeleteGame} // Pass handleDeleteGame
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex border-t">
          <div className="flex-1 max-w-2xl p-4 border-r">
            <ChatDialog messages={messages} onSubmit={handleCreateGame} />
          </div>
          <div className="flex-1 p-4 bg-gray-50" ref={gamePreviewRef}>
            <GamePreview code={selectedGame?.code} summary={selectedGame?.summary} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
