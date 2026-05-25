import { Star } from 'lucide-react';
import { Review } from '@/types';

export function Testimonials({ reviews }: { reviews: Review[] }) {
  return (
    <section className="container-page py-16">
      <h2 className="font-heading text-4xl font-bold text-choc-800">Sweet Words</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="brand-card p-6">
            <div className="flex gap-1 text-gold-500">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={17} fill="currentColor" />)}</div>
            <p className="mt-4 text-choc-500">{review.comment}</p>
            <p className="mt-4 font-bold text-choc-800">{review.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
