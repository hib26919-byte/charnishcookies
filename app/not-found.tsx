import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center text-center">
      <section>
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-cream-dark p-4 cookie-bite">
          <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="#C4855A" stroke="#8B4513" strokeWidth="3" /><circle cx="23" cy="24" r="4" fill="#3D1A00" /><circle cx="41" cy="37" r="4" fill="#3D1A00" /></svg>
        </div>
        <h1 className="font-heading text-4xl font-bold text-choc-800">Page Not Found</h1>
        <p className="mt-3 text-choc-500">This page is unavailable.</p>
        <Link href="/"><Button className="mt-6">Go Home</Button></Link>
      </section>
    </div>
  );
}
