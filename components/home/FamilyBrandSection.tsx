import Image from 'next/image';

export function FamilyBrandSection() {
  return (
    <section className="container-page grid gap-8 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold-300 bg-cream-dark shadow-warm">
        <Image src="/family-home.png" alt="Charnish Cookies family" fill className="object-cover" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-gold-300 bg-white/92 p-3 shadow-warm backdrop-blur">
          <span className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-pink-300 bg-gold-100">
            <Image src="/logo.png" alt="Charnish Cookies logo" fill className="object-cover" />
          </span>
          <span>
            <span className="block font-heading text-2xl font-bold text-choc-800">Charnish Cookies</span>
            <span className="block text-xs font-bold uppercase text-pink-700">Family baked freshness</span>
          </span>
        </div>
      </div>
      <div>
        <span className="pill bg-gold-100 px-4 py-2 text-sm text-gold-700">From our home to yours</span>
        <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-choc-800">Cookies made for families, festivals, and everyday happiness.</h2>
        <p className="mt-4 text-choc-500">Replace `public/family-home.png` with your real family photo whenever ready. The Charnish logo will remain highlighted over the image.</p>
      </div>
    </section>
  );
}
