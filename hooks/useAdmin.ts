'use client';

import { useEffect, useState } from 'react';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(document.cookie.includes('admin-token='));
  }, []);
  return { isAdmin };
}
