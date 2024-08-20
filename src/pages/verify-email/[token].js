import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email/${token}`);
        const data = await res.json();
        if (res.ok) {
          alert('Email verified successfully');
          router.push('/SignIn');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (token) verifyEmail();
  }, [token, router]);

  return (
    <div>
      <h2>Verifying your email...</h2>
    </div>
  );
}

