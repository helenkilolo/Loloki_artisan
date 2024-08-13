import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Marketplace() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the homepage
    router.push('/');
  }, [router]);

  return null; // No need to render anything, just redirect
}

