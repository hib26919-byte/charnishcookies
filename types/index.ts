export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  weight: string;
  ingredients: string;
  allergens: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'PhonePe' | 'GooglePay' | 'Paytm';
  paymentScreenshot: string;
  paymentStatus: 'pending' | 'verified' | 'rejected';
  orderStatus: 'received' | 'preparing' | 'out_for_delivery' | 'delivered';
  notes?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  expiresAt: Date;
  active: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SiteContent {
  heroImages: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  sections: ContentSection[];
}

export interface ContentSection {
  id: string;
  type: 'text' | 'image' | 'text+image' | 'gallery';
  heading: string;
  body: string;
  image?: string;
  images?: string[];
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}
