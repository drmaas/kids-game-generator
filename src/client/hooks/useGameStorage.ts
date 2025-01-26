import { useState } from 'react';
import { Game } from '../types/game';

const GAME_STORAGE_KEY = 'kidsGames';

export default function useGameStorage() {
  // State to store the list of games
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem(GAME_STORAGE_KEY);
    return savedGames ? JSON.parse(savedGames) : [];
  });

  // Function to save a new game to the state and localStorage
  const saveGame = (game: Game) => {
    const updatedGames = [...games, game];
    setGames(updatedGames);
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(updatedGames));
  };

  // Function to delete a game from the state and localStorage
  const deleteGame = (gameId: string) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    setGames(updatedGames);
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(updatedGames));
  };

  // Return the games state and the functions to save and delete games
  return { games, saveGame, deleteGame };
}