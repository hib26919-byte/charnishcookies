import { businessInfo } from '@/lib/constants';
import { sampleBanners, sampleFaqs, sampleProducts } from '@/lib/sample-data';

let cachedContext: { value: string; expires: number } | null = null;

export async function buildChatbotContext() {
  if (cachedContext && cachedContext.expires > Date.now()) return cachedContext.value;

  const products = sampleProducts.map((p) => `${p.name}: ${p.discountPrice ?? p.price} INR, ${p.category}, ${p.inStock ? 'in stock' : 'out of stock'}`).join('\n');
  const faqs = sampleFaqs.map((faq) => `${faq.question}: ${faq.answer}`).join('\n');
  const promos = sampleBanners.filter((b) => b.active).map((b) => `${b.title}: ${b.subtitle}`).join('\n');

  const value = `You are the friendly AI assistant for Charnish Cookies, a homemade cookie bakery in Singasandra, Bangalore founded by ${businessInfo.founder}.

BUSINESS INFO:
Phone: ${businessInfo.phone1}, ${businessInfo.phone2}
Email: ${businessInfo.email}
Address: ${businessInfo.address}
UPI: ${businessInfo.upiId}

CURRENT PRODUCTS:
${products}

CURRENT PROMOTIONS:
${promos || 'No active promotion.'}

FREQUENTLY ASKED QUESTIONS:
${faqs}

INSTRUCTIONS:
- Answer questions about products, pricing, ordering, delivery, and payment.
- Be warm, friendly, and concise.
- If asked about order status, ask for the order number and suggest WhatsApp support.
- Never make up information not in this context.`;

  cachedContext = { value, expires: Date.now() + 5 * 60 * 1000 };
  return value;
}
