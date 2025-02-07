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
import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from './Modal'; // Import Modal component
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import Spinner from './Spinner'; // Import Spinner component

interface GamePreviewProps {
  code?: string;
  summary?: string; // Add summary prop
  isLoading?: boolean; // Add isLoading prop
}

export default function GamePreview({ code, summary, isLoading }: GamePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const initializeGame = useCallback(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const gameHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>body { margin: 0; overflow: hidden; }</style>
          </head>
          <body>
            <canvas id="gameCanvas"></canvas>
            <script>${code}</script>
          </body>
        </html>
      `;
      
      iframe.srcdoc = gameHTML;
    }
  }, [code]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <Spinner />
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={initializeGame}
        >
          Reset Game
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Instructions
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Game Instructions</h2>
          <ReactMarkdown>{summary || ''}</ReactMarkdown>
        </Modal>
      )}
    </div>
  );
}
