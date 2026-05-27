import { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
