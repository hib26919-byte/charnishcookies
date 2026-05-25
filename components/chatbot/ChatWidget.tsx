'use client';

import { Bot, X } from 'lucide-react';
import { useState } from 'react';
import { ChatWindow } from '@/components/chatbot/ChatWindow';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div id="chat" className="fixed bottom-24 right-4 z-40 md:bottom-6">
      {open && <div className="mb-4 w-[calc(100vw-32px)] max-w-sm"><ChatWindow /></div>}
      <button onClick={() => setOpen(!open)} className="cookie-wobble ml-auto grid h-16 w-16 place-items-center rounded-full bg-pink-500 text-white shadow-warm" aria-label="Open chatbot">
        {open ? <X /> : <Bot />}
      </button>
    </div>
  );
}
