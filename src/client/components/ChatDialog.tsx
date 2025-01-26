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