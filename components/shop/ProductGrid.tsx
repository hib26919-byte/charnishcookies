import { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
