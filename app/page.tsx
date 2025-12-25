'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();


  console.log(messages);


  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-center mb-5 text-2xl font-bold">Chat</h1>

      <div>
        {messages.map((message) => (
          <div key={message.id} className="mb-2.5 text-sm border border-gray-300 dotted p-2">
            <strong className={message.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
              {message.role === 'user' ? 'User: ' : 'AI: '}
            </strong>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return <span key={`${message.id}-${i}`}>{part.text}</span>;
              }
            })}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = input || '';
          if (text.trim()) {
            sendMessage({ parts: [{ type: 'text', text }] });
            setInput('');
          }
        }}
        className="mt-5 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
}
