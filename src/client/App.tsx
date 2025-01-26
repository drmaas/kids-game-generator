import { useState } from 'react';
import GameListPanel from './components/GameListPanel';
import ChatDialog from './components/ChatDialog';
import GamePreview from './components/GamePreview';
import useGameStorage from './hooks/useGameStorage';
import { Game, Message } from './types/game';

export default function App() {
  const { games, saveGame, deleteGame } = useGameStorage(); // Add deleteGame
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleCreateGame = async (prompt: string) => {
    setMessages((prev) => [...prev, { content: prompt, isBot: false }]);

    try {
      const response = await fetch(
        `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''}/api/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }
      );

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: 'Failed to create game. Please try again.',
          isBot: true,
        },
      ]);
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
          <div className="flex-1 p-4 bg-gray-50">
            <GamePreview code={selectedGame?.code} summary={selectedGame?.summary} />
          </div>
        </div>
      </div>
    </div>
  );
}
