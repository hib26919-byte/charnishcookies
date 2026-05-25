import { Gift, Truck, Wheat } from 'lucide-react';

const items = [
  { title: 'Fresh Daily', body: 'Small batches baked with careful timing and warm ingredients.', icon: Wheat },
  { title: 'Custom Orders', body: 'Gift boxes, festival assortments, and personal cookie requests.', icon: Gift },
  { title: 'Fast Delivery', body: 'Simple Bangalore delivery coordination through WhatsApp.', icon: Truck }
];

export function WhyUs() {
  return (
    <section className="bg-white py-16">
      <div className="container-page grid gap-6 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-choc-300/20 p-6">
              <Icon className="text-pink-500" />
              <h3 className="mt-4 font-heading text-2xl font-bold text-choc-800">{item.title}</h3>
              <p className="mt-2 text-choc-500">{item.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
