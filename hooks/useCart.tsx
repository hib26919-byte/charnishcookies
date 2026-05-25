'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product, OrderItem } from '@/types';

interface CartContextValue {
  items: OrderItem[];
  add: (product: Product, quantity?: number) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('charnish-cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('charnish-cart', JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    add(product, quantity = 1) {
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id);
        if (existing) return current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item);
        return [...current, { productId: product.id, name: product.name, quantity, price: product.discountPrice ?? product.price, image: product.images[0] }];
      });
    },
    update(productId, quantity) {
      setItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
    },
    remove(productId) {
      setItems((current) => current.filter((item) => item.productId !== productId));
    },
    clear() {
      setItems([]);
    },
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
