import { ChatMessage } from '@/types';

export async function askClaude(system: string, messages: ChatMessage[]) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return 'I can help with cookies, prices, orders, delivery, and payment. For a quick human answer, please WhatsApp 7676818313.';
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system,
      messages: messages.map((message) => ({ role: message.role, content: message.content }))
    })
  });

  if (!response.ok) throw new Error('Claude request failed');
  const data = await response.json();
  return data.content?.[0]?.text ?? 'Please call or WhatsApp us at 7676818313 for help.';
}
