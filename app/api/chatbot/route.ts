import { NextResponse } from 'next/server';
import { askClaude } from '@/lib/claude';
import { buildChatbotContext } from '@/lib/chatbot-context';
import { ChatMessage } from '@/types';

const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string) {
  const current = hits.get(ip);
  if (!current || current.reset < Date.now()) {
    hits.set(ip, { count: 1, reset: Date.now() + 60 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 20;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'local';
  if (rateLimit(ip)) return NextResponse.json({ reply: 'Please try again later or WhatsApp 7676818313 for help.' }, { status: 429 });
  const { message, history = [] } = await request.json();
  const system = await buildChatbotContext();
  const messages: ChatMessage[] = [...history, { role: 'user', content: message, timestamp: new Date() }].slice(-10);
  const reply = await askClaude(system, messages);
  return NextResponse.json({ reply });
}
