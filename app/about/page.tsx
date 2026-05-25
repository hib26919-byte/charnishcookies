import Image from 'next/image';

export const metadata = { title: 'About | Charnish Cookies' };

export default function AboutPage() {
  return (
    <div className="container-page py-10">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <span className="pill bg-gold-100 px-4 py-2 text-sm text-gold-700">Founder story</span>
          <h1 className="mt-5 font-heading text-4xl font-bold text-choc-800">Baked by Atmakuri Lalitha</h1>
          <p className="mt-5 text-choc-500">Charnish Cookies is a homemade cookie bakery in Singasandra, Bangalore, built around fresh batches, thoughtful gifting, and flavours that feel personal.</p>
          <p className="mt-3 text-choc-500">Every box is prepared with care for families, friends, celebrations, and everyday tea-time joy.</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-dark">
          <Image src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80" alt="Bakery preparation" fill className="object-cover" />
        </div>
      </section>
      <section className="mt-16 grid gap-4 rounded-2xl bg-white p-6 text-center md:grid-cols-3">
        {['5+ Years', '10,000+ Cookies', '500+ Happy Customers'].map((stat) => <strong key={stat} className="font-heading text-3xl text-choc-800">{stat}</strong>)}
      </section>
    </div>
  );
}
