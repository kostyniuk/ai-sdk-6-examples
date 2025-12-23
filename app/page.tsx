'use client';

import { useChat } from '@ai-sdk/react';
import { useRef } from 'react';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage } = useChat();

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>Chat</h1>

      <div>
        {messages.map((message) => (
          <div key={message.id} style={{ marginBottom: 10 }}>
            <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>
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
          const text = inputRef.current?.value || '';
          if (text.trim()) {
            sendMessage({ parts: [{ type: 'text', text }] });
            if (inputRef.current) inputRef.current.value = '';
          }
        }}
        style={{ marginTop: 20, display: 'flex', gap: 8 }}
      >
        <input
          ref={inputRef}
          placeholder="Send a message"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Send
        </button>
      </form>
    </div>
  );
}
