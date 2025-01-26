import { useCallback, useEffect, useRef, useState } from 'react';
import Modal from './Modal'; // Import Modal component
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

interface GamePreviewProps {
  code?: string;
  summary?: string; // Add summary prop
}

export default function GamePreview({ code, summary }: GamePreviewProps) {
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
          Reset
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
