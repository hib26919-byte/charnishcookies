import { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-page py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="pill bg-pink-100 px-4 py-2 text-sm text-pink-900">Customer favourites</span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-choc-800">Fresh From the Oven</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
