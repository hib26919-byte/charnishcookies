import Image from 'next/image';

export const metadata = { title: 'About | Charnish Cookies' };

const storyParagraphs = [
  <>
    Charnish Cookies was founded by <strong className="font-semibold text-[#6B3E26]">Lalitha and Ashok</strong> with a simple vision&nbsp;&mdash;&nbsp;creating fresh, homemade cookies that bring happiness to every home.
  </>,
  'What began as a passion for baking in their kitchen at Singasandra, Bangalore, gradually evolved into a trusted cookie brand known for quality ingredients, handcrafted recipes, and authentic homemade taste.',
  'Every cookie is baked in small batches with care, ensuring freshness, consistency, and a personal touch in every order. Our goal is not just to sell cookies but to create memorable moments for families, celebrations, gifts, and everyday treats.',
  'Today, Charnish Cookies proudly serves customers across Bangalore while maintaining the same commitment to quality, hygiene, and customer satisfaction that inspired its beginning.'
];

const addressLines = [
  'No. 3/6A, House No. 81',
  'AECS Layout A Block',
  'Singasandra, Hosur Main Road',
  'Bangalore - 560068',
  'Karnataka, India'
];

const verificationBadges = ['Government Registered', 'FSSAI Certified', 'Food Safety Compliant'];

export default function AboutPage() {
  return (
    <div className="container-page py-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start">
        <article className="rounded-2xl border border-[#D4A373]/40 bg-[#FFF8F0] p-6 shadow-[0_18px_60px_rgba(107,62,38,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(107,62,38,0.18)] sm:p-8">
          <span className="pill bg-[#D4A373]/20 px-4 py-2 text-sm text-[#6B3E26]">Founder Story</span>
          <p className="mt-5 text-sm font-bold text-[#8B4513]">Founded by Lalitha &amp; Ashok</p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-[#6B3E26] md:text-5xl">From a Home Kitchen to Charnish Cookies</h1>
          <div className="mt-6 space-y-4 text-base leading-8 text-choc-500">
            {storyParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#D4A373]/45 bg-white p-5 shadow-[0_12px_42px_rgba(107,62,38,0.10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_52px_rgba(107,62,38,0.14)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4A373]/35 pb-4">
              <div>
                <p className="text-sm font-bold text-green-700">Food Safety Certified</p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-[#6B3E26]">FSSAI Registration</h2>
              </div>
              <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700 ring-1 ring-green-200">Verified</div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {verificationBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700 ring-1 ring-green-200">
                  <span aria-hidden="true">&#9989;</span>
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-4 text-sm text-choc-500 sm:grid-cols-2">
              <div>
                <p className="font-bold text-[#6B3E26]">FSSAI Registration Number</p>
                <p className="mt-1 font-semibold text-choc-700">21226007001387</p>
              </div>
              <div>
                <p className="font-bold text-[#6B3E26]">Food Business Operator</p>
                <p className="mt-1 font-semibold text-choc-700">Atmakuri Ashok</p>
              </div>
              <div>
                <p className="font-bold text-[#6B3E26]">Business Type</p>
                <p className="mt-1 font-semibold text-choc-700">Retailer</p>
              </div>
              <div>
                <p className="font-bold text-[#6B3E26]">Certificate Validity</p>
                <p className="mt-1 font-semibold text-choc-700">30 May 2026 &ndash; 29 May 2027</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-bold text-[#6B3E26]">Address</p>
                <address className="mt-1 not-italic leading-7 text-choc-700">
                  {addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
                <p className="mt-3 text-choc-500"><strong className="text-[#6B3E26]">Nearest Landmark:</strong> Near Post Office, Singasandra</p>
              </div>
            </div>
          </div>

          <blockquote className="mt-8 rounded-2xl bg-[#6B3E26] p-5 text-[#FFF8F0] shadow-[0_14px_42px_rgba(107,62,38,0.20)] sm:p-6">
            <p className="font-heading text-xl font-bold leading-8">&quot;Every cookie is made with care, quality ingredients, and a commitment to bringing joy to our customers.&quot;</p>
            <footer className="mt-5 text-sm leading-6 text-[#FFF8F0]/85">
              <strong className="block text-base text-white">&ndash; Lalitha &amp; Ashok</strong>
              Founders, Charnish Cookies
            </footer>
          </blockquote>
        </article>

        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-cream-dark shadow-[0_18px_60px_rgba(107,62,38,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(107,62,38,0.22)]">
          <Image src="/founder-photo.png" alt="Charnish Cookies founder photo" fill sizes="(min-width: 1024px) 528px, calc(100vw - 32px)" className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/95 px-4 py-2 text-sm font-bold text-green-700 shadow-[0_10px_30px_rgba(26,8,0,0.18)] backdrop-blur">
            <span aria-hidden="true">&#9989;</span>
            FSSAI Verified
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 text-[#6B3E26] shadow-[0_12px_32px_rgba(26,8,0,0.18)] backdrop-blur">
            <p className="text-sm font-bold text-green-700">Government Registered Bakery</p>
            <p className="mt-1 font-heading text-xl font-bold">Founded by Lalitha &amp; Ashok</p>
          </div>
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
