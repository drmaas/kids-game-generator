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

  // Function to update an existing game in the state and localStorage
  const updateGame = (updatedGame: Game) => {
    const updatedGames = games.map(game => game.id === updatedGame.id ? updatedGame : game);
    setGames(updatedGames);
    localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(updatedGames));
  };

  // Return the games state and the functions to save, delete, and update games
  return { games, saveGame, deleteGame, updateGame };
}