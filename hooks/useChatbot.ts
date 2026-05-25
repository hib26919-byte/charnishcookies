'use client';

import { useState } from 'react';
import { ChatMessage } from '@/types';

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(content: string) {
    const next: ChatMessage[] = [...messages, { role: 'user', content, timestamp: new Date() }];
    setMessages(next);
    setLoading(true);
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: content, history: next.slice(-10) })
      });
      const data = await response.json();
      setMessages([...next, { role: 'assistant', content: data.reply, timestamp: new Date() }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Please WhatsApp us at 7676818313 and we will help right away.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send };
}
