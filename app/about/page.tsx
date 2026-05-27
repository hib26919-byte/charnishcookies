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
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-dark shadow-warm">
          <Image src="/founder-photo.png" alt="Atmakuri Lalitha founder photo" fill className="object-cover" />
        </div>
      </section>
      <section className="mt-16 grid gap-8 rounded-2xl border border-gold-300 bg-gold-100 p-6 md:grid-cols-[280px_1fr] md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-warm">
          <Image src="/god-nidanampati-sri-lakshmi.png" alt="Nidanampati Sri Lakshmi" fill className="object-cover" />
        </div>
        <div>
          <span className="pill bg-white px-4 py-2 text-sm text-gold-700">Blessings</span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-choc-800">Nidanampati Sri Lakshmi</h2>
          <p className="mt-3 text-choc-500">With gratitude and blessings, every Charnish Cookies box is prepared with care, warmth, and a wish for sweetness in every home.</p>
        </div>
      </section>
      <section className="mt-16 grid gap-4 rounded-2xl bg-white p-6 text-center md:grid-cols-3">
        {['5+ Years', '10,000+ Cookies', '500+ Happy Customers'].map((stat) => <strong key={stat} className="font-heading text-3xl text-choc-800">{stat}</strong>)}
      </section>
    </div>
  );
}
