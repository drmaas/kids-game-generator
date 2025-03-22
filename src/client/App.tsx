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
import { createMessage, Game, Message } from './types/game';

export default function App() {
  const { games, createGame, saveGame, deleteGame, updateGame } = useGameStorage();
  const [selectedGame, setSelectedGame] = useState<Game | null>(() => {
    return games[0];
  });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isCreatingNewGame, setIsCreatingNewGame] = useState(false); // Add state for new game creation
  const gamePreviewRef = useRef<HTMLDivElement>(null); // Add ref for GamePreview
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // Add dimensions state

  useEffect(() => {
    if (gamePreviewRef.current) {
      const { offsetWidth, offsetHeight } = gamePreviewRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [gamePreviewRef]);

  const handleCreateGame = async (prompt: string) => {
    if (!selectedGame) return;

    const newMessages: Message[] = [...selectedGame.messages, createMessage(prompt, 'user')];
    setSelectedGame({ ...selectedGame, messages: newMessages });
    setIsLoading(true); // Set loading state to true
    setIsCreatingNewGame(true); // Disable the "New Game" button

    try {
      const response = await fetch(
        `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''}/api/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: newMessages, dimensions }),
        }
      );

      if (response.ok === false) {
        throw new Error('Service Unavailable');
      }

      const { code, summary } = await response.json();
      const updatedGame: Game = {
        ...selectedGame,
        code,
        summary,
        messages: [...newMessages, createMessage(summary, 'model')],
      };

      updateGame(updatedGame); // Use updateGame instead of saveGame
      setSelectedGame(updatedGame);
    } catch (error) {
      const errorMessage =
        (error as Error).message === 'Service Unavailable'
          ? 'Failed to create game. Service is currently unavailable. Please try again later.'
          : 'Failed to create game. Please try again.';
      const erroredGame = {
        ...selectedGame,
        messages: [...newMessages, createMessage(errorMessage, 'model')],
      };
      updateGame(erroredGame); // Use updateGame instead of saveGame
      setSelectedGame(erroredGame);
    } finally {
      setIsLoading(false); // Set loading state to false
      setIsCreatingNewGame(false); // Re-enable the "New Game" button
    }
  };

  const handleNewGame = () => {
    const newGame = createGame(`Game ${games.length + 1}`);
    saveGame(newGame);
    setSelectedGame(newGame);
  };

  const handleDeleteGame = (gameId: string) => {
    deleteGame(gameId);
    if (selectedGame?.id === gameId) {
      setSelectedGame(null);
    }
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
  };

  return (
    <div className="h-screen flex">
      <GameListPanel
        games={games}
        onSelectGame={handleSelectGame}
        onCreateNew={handleNewGame}
        onDeleteGame={handleDeleteGame}
        isCreatingNewGame={isCreatingNewGame}
        selectedGameId={selectedGame?.id}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex border-t">
          <div className="flex-1 max-w-2xl p-4 border-r">
            <ChatDialog
              messages={selectedGame?.messages || []}
              onSubmit={handleCreateGame}
              disabled={!selectedGame || games.length === 0}
            />
          </div>
          <div className="flex-1 p-4 bg-gray-50" ref={gamePreviewRef}>
            <GamePreview
              code={selectedGame?.code}
              summary={selectedGame?.summary}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
