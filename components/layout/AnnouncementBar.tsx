import { Gift, Sparkles, Truck } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-r from-choc-900 via-choc-800 to-pink-900 text-white">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#E8CC7A_0,transparent_28%),radial-gradient(circle_at_80%_40%,#E8819D_0,transparent_24%)]" />
      <div className="container-page relative flex min-h-11 flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2 text-center text-xs font-black uppercase tracking-wide md:text-sm">
        <span className="inline-flex items-center gap-2 text-gold-300"><Sparkles size={16} /> Charnish Cookies</span>
        <span className="hidden h-4 w-px bg-white/30 md:inline-block" />
        <span className="inline-flex items-center gap-2"><Gift size={16} /> Website made by <strong className="text-gold-300">WayzenTech</strong> 9398724704</span>
        <span className="hidden h-4 w-px bg-white/30 md:inline-block" />
        <span className="inline-flex items-center gap-2 text-pink-100"><Truck size={16} /> Free shipping on celebration orders</span>
      </div>
    </div>
  );
}
