export function TypingIndicator() {
  return (
    <div className="flex gap-1 rounded-2xl border border-choc-300/20 bg-white p-3">
      {[0, 1, 2].map((item) => <span key={item} className="h-2 w-2 animate-pulse rounded-full bg-pink-500" style={{ animationDelay: `${item * 120}ms` }} />)}
    </div>
  );
}
