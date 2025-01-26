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
import { Message } from '../types/game';
import ReactMarkdown from 'react-markdown';

interface ChatDialogProps {
  messages: Message[];
  onSubmit: (prompt: string) => void;
}

export default function ChatDialog({ messages, onSubmit }: ChatDialogProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, i) => (
          <div key={i} className={`p-3 mb-2 rounded ${message.isBot ? 'bg-gray-100' : 'bg-blue-100'}`}>
            {message.isBot ? <ReactMarkdown>{message.content}</ReactMarkdown> : message.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t pt-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Describe your educational game..."
          rows={3}
        />
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Game
        </button>
      </form>
    </div>
  );
}