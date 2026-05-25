import { Banner, Coupon, FAQ, Product, Review, SiteContent } from '@/types';

const now = new Date();

export const sampleProducts: Product[] = [
  {
    id: 'dark-choc-chip',
    name: 'Dark Chocolate Chip Cookies',
    description: '<p>Rich cocoa, melty dark chocolate chunks, and a soft chewy middle.</p>',
    price: 399,
    discountPrice: 349,
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80'],
    category: 'chocolate',
    tags: ['bestseller', 'chocolate', 'gift'],
    inStock: true,
    featured: true,
    weight: '500g',
    ingredients: 'Flour, butter, cocoa, dark chocolate, brown sugar, vanilla',
    allergens: 'Contains gluten and dairy',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'butter-shortbread',
    name: 'Classic Butter Shortbread',
    description: '<p>Delicate, buttery cookies with a clean vanilla finish.</p>',
    price: 299,
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80'],
    category: 'butter',
    tags: ['tea-time', 'classic'],
    inStock: true,
    featured: true,
    weight: '350g',
    ingredients: 'Butter, flour, sugar, vanilla',
    allergens: 'Contains gluten and dairy',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'oat-raisin',
    name: 'Oat Raisin Comfort Cookies',
    description: '<p>Rolled oats, plump raisins, and a warm cinnamon note.</p>',
    price: 329,
    images: ['https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=900&q=80'],
    category: 'oat',
    tags: ['oats', 'cinnamon'],
    inStock: true,
    featured: false,
    weight: '400g',
    ingredients: 'Oats, flour, raisins, butter, cinnamon',
    allergens: 'Contains gluten and dairy',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'festival-gift-box',
    name: 'Festival Cookie Gift Box',
    description: '<p>A curated assortment for celebrations, office gifting, and family visits.</p>',
    price: 899,
    discountPrice: 799,
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80'],
    category: 'gift-box',
    tags: ['festival', 'gift-box', 'assorted'],
    inStock: true,
    featured: true,
    weight: '1kg',
    ingredients: 'Assorted cookie selection',
    allergens: 'Contains gluten, dairy, and may contain nuts',
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'pink-velvet',
    name: 'Pink Velvet Cookies',
    description: '<p>A pretty blush cookie with white chocolate chips and a soft bite.</p>',
    price: 449,
    images: ['https://images.unsplash.com/photo-1621236378699-8597faf6a176?auto=format&fit=crop&w=900&q=80'],
    category: 'seasonal',
    tags: ['pink', 'white-chocolate', 'seasonal'],
    inStock: true,
    featured: true,
    weight: '500g',
    ingredients: 'Flour, butter, sugar, white chocolate, vanilla',
    allergens: 'Contains gluten and dairy',
    createdAt: now,
    updatedAt: now
  }
];

export const sampleReviews: Review[] = [
  { id: '1', name: 'Nisha', rating: 5, comment: 'Beautiful packaging and the chocolate cookies were gone in minutes.', createdAt: now },
  { id: '2', name: 'Ravi', rating: 5, comment: 'Fresh, homemade taste. Great for gifting.', createdAt: now },
  { id: '3', name: 'Meera', rating: 4, comment: 'Loved the shortbread with evening tea.', createdAt: now }
];

export const sampleCoupons: Coupon[] = [
  { id: 'welcome10', code: 'COOKIE10', discountType: 'percentage', discountValue: 10, minOrder: 499, maxUses: 100, usedCount: 12, expiresAt: new Date('2027-12-31'), active: true }
];

export const sampleBanners: Banner[] = [
  {
    id: 'festive',
    title: 'Festival Cookie Boxes Are Open',
    subtitle: 'Pre-order assorted boxes for family, friends, and office gifting.',
    image: 'https://images.unsplash.com/photo-1514517220034-8070d9d783ce?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop Gift Boxes',
    ctaLink: '/shop?category=gift-box',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2027-12-31'),
    active: true
  }
];

export const homeContent: SiteContent = {
  heroImages: [
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1514517220034-8070d9d783ce?auto=format&fit=crop&w=1600&q=80'
  ],
  heroTitle: 'Handmade Cookies Baked Fresh in Bangalore',
  heroSubtitle: 'Small-batch chocolate, butter, seasonal, and gift-box cookies from Charnish Cookies.',
  heroCTA: 'Order Fresh Cookies',
  sections: []
};

export const sampleFaqs: FAQ[] = [
  { id: 'order', question: 'How do I order?', answer: 'Choose cookies, checkout, pay by UPI, and upload the payment screenshot.', order: 1 },
  { id: 'delivery', question: 'Where do you deliver?', answer: 'We currently serve Bangalore with custom delivery coordination by phone or WhatsApp.', order: 2 },
  { id: 'custom', question: 'Do you take custom orders?', answer: 'Yes, custom orders and gift boxes are available with advance notice.', order: 3 }
];
