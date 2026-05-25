// seed-firestore.mjs
// Run with: node --env-file=.env seed-firestore.mjs

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

function now()         { return Timestamp.now(); }
function future(days)  { return Timestamp.fromDate(new Date(Date.now() + days * 86400000)); }
function past(days)    { return Timestamp.fromDate(new Date(Date.now() - days * 86400000)); }

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
const products = [
  {
    name: 'Classic Chocolate Chip Cookies',
    description: 'Our signature cookies packed with premium Belgian chocolate chips. Crispy on the outside, chewy on the inside — baked fresh daily.',
    price: 299, discountPrice: 249,
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600'],
    category: 'Classic', tags: ['bestseller', 'chocolate', 'classic'],
    inStock: true, featured: true, weight: '250g (approx. 12 cookies)',
    ingredients: 'Refined wheat flour, butter, brown sugar, eggs, Belgian chocolate chips, vanilla extract, baking soda, salt',
    allergens: 'Wheat, dairy, eggs', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Double Chocolate Fudge Cookies',
    description: 'Intensely chocolatey cookies with a fudgy centre and dark chocolate chunks. A dream for every chocoholic.',
    price: 349,
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600'],
    category: 'Chocolate', tags: ['chocolate', 'fudge', 'indulgent'],
    inStock: true, featured: true, weight: '250g (approx. 10 cookies)',
    ingredients: 'Refined wheat flour, cocoa powder, butter, sugar, eggs, dark chocolate chunks, vanilla extract, baking powder, salt',
    allergens: 'Wheat, dairy, eggs', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Butter Shortbread Cookies',
    description: 'Melt-in-your-mouth Scottish-style shortbread made with pure desi ghee and the finest flour.',
    price: 249,
    images: ['https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=600'],
    category: 'Classic', tags: ['butter', 'shortbread', 'classic'],
    inStock: true, featured: false, weight: '200g (approx. 14 cookies)',
    ingredients: 'Refined wheat flour, pure butter, powdered sugar, vanilla extract, salt',
    allergens: 'Wheat, dairy', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Oatmeal Raisin Cookies',
    description: 'Wholesome rolled oats with plump golden raisins, cinnamon and a hint of nutmeg.',
    price: 279,
    images: ['https://images.unsplash.com/photo-1590080875897-c0b0c2aaacc8?w=600'],
    category: 'Healthy', tags: ['oats', 'raisin', 'healthy'],
    inStock: true, featured: false, weight: '250g (approx. 12 cookies)',
    ingredients: 'Rolled oats, refined wheat flour, butter, brown sugar, eggs, raisins, cinnamon, nutmeg, baking soda, salt',
    allergens: 'Wheat, dairy, eggs', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Peanut Butter Cookies',
    description: 'Rich and nutty peanut butter cookies with a classic criss-cross pattern.',
    price: 299,
    images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600'],
    category: 'Nut', tags: ['peanut butter', 'nut', 'protein'],
    inStock: true, featured: true, weight: '220g (approx. 10 cookies)',
    ingredients: 'Peanut butter, butter, sugar, egg, vanilla extract, baking soda, salt',
    allergens: 'Peanuts, dairy, eggs', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Red Velvet Cookies',
    description: 'Gorgeous deep-red cookies with cream cheese chips and a velvety cocoa flavour. Perfect for gifting.',
    price: 379,
    images: ['https://images.unsplash.com/photo-1547592180-85f173990554?w=600'],
    category: 'Premium', tags: ['red velvet', 'cream cheese', 'premium', 'gifting'],
    inStock: true, featured: true, weight: '200g (approx. 8 cookies)',
    ingredients: 'Refined wheat flour, butter, sugar, egg, cocoa powder, cream cheese chips, red food colour, vanilla extract, baking soda, salt',
    allergens: 'Wheat, dairy, eggs', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Coconut Jaggery Cookies',
    description: 'A desi twist — desiccated coconut and organic jaggery come together for a naturally sweet, tropical cookie.',
    price: 259,
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600'],
    category: 'Indian', tags: ['coconut', 'jaggery', 'indian', 'natural'],
    inStock: true, featured: false, weight: '230g (approx. 12 cookies)',
    ingredients: 'Whole wheat flour, desiccated coconut, jaggery powder, butter, egg, cardamom, baking powder, salt',
    allergens: 'Wheat, dairy, eggs', createdAt: now(), updatedAt: now(),
  },
  {
    name: 'Eggless Choco Chip Cookies',
    description: 'All the joy of our classic chocolate chip cookie — completely eggless and perfect for vegetarians.',
    price: 299,
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600'],
    category: 'Eggless', tags: ['eggless', 'vegetarian', 'chocolate'],
    inStock: false, featured: false, weight: '250g (approx. 12 cookies)',
    ingredients: 'Refined wheat flour, butter, brown sugar, flaxseed (egg replacer), chocolate chips, vanilla extract, baking soda, salt',
    allergens: 'Wheat, dairy', createdAt: now(), updatedAt: now(),
  },
];

// ── BANNERS ───────────────────────────────────────────────────────────────────
const banners = [
  {
    title: 'Freshly Baked Every Morning',
    subtitle: 'Order before 10 AM for same-day delivery in Hyderabad',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=1200',
    ctaText: 'Shop Now', ctaLink: '/shop',
    startDate: past(1), endDate: future(30), active: true,
  },
  {
    title: 'Gift Boxes Now Available',
    subtitle: 'Curated cookie gift boxes for every occasion — starting ₹499',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200',
    ctaText: 'View Gift Boxes', ctaLink: '/shop?category=gifting',
    startDate: past(1), endDate: future(60), active: true,
  },
];

// ── COUPONS ───────────────────────────────────────────────────────────────────
const coupons = [
  { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minOrder: 200, maxUses: 100, usedCount: 0, expiresAt: future(90), active: true },
  { code: 'FLAT50',    discountType: 'fixed',       discountValue: 50, minOrder: 400, maxUses: 50,  usedCount: 0, expiresAt: future(30), active: true },
  { code: 'COOKIE20',  discountType: 'percentage', discountValue: 20, minOrder: 500, maxUses: 200, usedCount: 0, expiresAt: future(60), active: false },
];

// ── SITE SETTINGS ─────────────────────────────────────────────────────────────
const siteSettings = {
  storeName: 'Charnish Cookies',
  tagline: 'Baked with love, delivered with care',
  phone: '+91 98765 43210',
  email: 'hello@charnishcookies.in',
  address: 'Hyderabad, Telangana, India',
  instagram: 'https://instagram.com/charnishcookies',
  whatsapp: '+91 98765 43210',
  deliveryAreas: ['Hyderabad', 'Secunderabad', 'Cyberabad'],
  minOrderAmount: 199,
  deliveryCharge: 40,
  freeDeliveryAbove: 499,
  upiId: 'charnishcookies@ybl',
  updatedAt: now(),
};

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqs = [
  { question: 'How fresh are your cookies?',         answer: 'We bake fresh every morning. Orders placed before 10 AM are baked the same day. All cookies are best consumed within 7 days.', order: 1 },
  { question: 'Do you deliver outside Hyderabad?',   answer: 'Currently we deliver within Hyderabad, Secunderabad and Cyberabad. Pan-India shipping via courier is coming soon!', order: 2 },
  { question: 'How do I place an order?',            answer: 'Browse our shop, add items to cart, proceed to checkout and pay via PhonePe, Google Pay or Paytm. Upload your payment screenshot and we\'ll confirm your order within 30 minutes.', order: 3 },
  { question: 'Do you have eggless options?',        answer: 'Yes! We have several eggless cookies in our Eggless range. Look for the "eggless" tag when browsing.', order: 4 },
  { question: 'Can I customise a gift box?',         answer: 'Absolutely! WhatsApp us and we\'ll put together a custom box for you.', order: 5 },
  { question: 'What payment methods do you accept?', answer: 'We accept PhonePe, Google Pay and Paytm. After payment, upload a screenshot at checkout for verification.', order: 6 },
];

// ── SITE CONTENT ──────────────────────────────────────────────────────────────
const siteContent = {
  heroImages: [
    'https://images.unsplash.com/photo-1612203985729-70726954388c?w=1200',
    'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200',
  ],
  heroTitle: 'Baked with Love',
  heroSubtitle: 'Artisan cookies made fresh daily in Hyderabad',
  heroCTA: 'Shop Now',
  sections: [
    {
      id: 'our-story',
      type: 'text+image',
      heading: 'Our Story',
      body: 'Charnish Cookies started in a small home kitchen with a simple belief: everyone deserves a truly great cookie. What began as weekend baking for family and friends quickly grew as word spread about our recipes.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      order: 1,
    },
    {
      id: 'our-promise',
      type: 'text',
      heading: 'Our Promise',
      body: 'No preservatives. No artificial flavours. Just real butter, premium chocolate and honest ingredients. Every batch is baked to order so you always get the freshest cookie possible.',
      order: 2,
    },
  ],
};

// ── RUN ───────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🍪 Seeding Firestore for Charnish Cookies...\n');

  console.log('📦 Writing products...');
  for (const p of products) {
    const ref = db.collection('products').doc();
    await ref.set({ ...p, id: ref.id });
    console.log(`   ✓ ${p.name}`);
  }

  console.log('\n🖼️  Writing banners...');
  for (const b of banners) {
    const ref = db.collection('banners').doc();
    await ref.set({ ...b, id: ref.id });
    console.log(`   ✓ ${b.title}`);
  }

  console.log('\n🎟️  Writing coupons...');
  for (const c of coupons) {
    const ref = db.collection('coupons').doc();
    await ref.set({ ...c, id: ref.id });
    console.log(`   ✓ ${c.code}`);
  }

  console.log('\n⚙️  Writing site settings...');
  await db.collection('siteSettings').doc('main').set(siteSettings);
  console.log('   ✓ siteSettings/main');

  console.log('\n❓ Writing FAQs...');
  for (const f of faqs) {
    const ref = db.collection('faqs').doc();
    await ref.set({ ...f, id: ref.id });
    console.log(`   ✓ ${f.question}`);
  }

  console.log('\n📄 Writing site content...');
  await db.collection('siteContent').doc('about').set(siteContent);
  console.log('   ✓ siteContent/about');

  console.log('\n✅ Done! All collections seeded.');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
