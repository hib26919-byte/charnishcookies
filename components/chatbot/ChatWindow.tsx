'use client';

import { Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { TypingIndicator } from '@/components/chatbot/TypingIndicator';
import { cn } from '@/lib/utils';

const suggestions = ['What cookies do you have?', 'What are your prices?', 'How to order?'];

export function ChatWindow() {
  const [input, setInput] = useState('');
  const { messages, loading, send } = useChatbot();

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    send(input.trim());
    setInput('');
  }

  return (
    <section className="flex h-[520px] max-h-[72vh] flex-col overflow-hidden rounded-2xl border border-choc-300/20 bg-cream shadow-warm">
      <header className="bg-choc-800 px-5 py-4 text-cream">
        <h2 className="font-heading text-xl font-bold">Charnish Cookies Chat</h2>
        <p className="text-xs opacity-80">Online for orders, delivery, and pricing</p>
      </header>
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {!messages.length && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)} className="rounded-full bg-pink-100 px-3 py-2 text-xs font-bold text-choc-700">{suggestion}</button>)}
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={cn('max-w-[82%] rounded-2xl px-4 py-3 text-sm', message.role === 'user' ? 'ml-auto bg-choc-700 text-white' : 'border border-choc-300/20 bg-white text-choc-700')}>
            {message.content}
          </div>
        ))}
        {loading && <TypingIndicator />}
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-choc-300/20 bg-white p-3">
        <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 rounded-full border border-choc-300/30 px-4" placeholder="Ask about cookies..." />
        <button className="grid h-11 w-11 place-items-center rounded-full bg-choc-700 text-white" aria-label="Send message"><Send size={18} /></button>
      </form>
    </section>
  );
}
