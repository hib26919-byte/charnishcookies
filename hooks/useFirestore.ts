export function useFirestoreCollection<T>(fallback: T[]) {
  return { data: fallback, loading: false, error: null as Error | null };
}
