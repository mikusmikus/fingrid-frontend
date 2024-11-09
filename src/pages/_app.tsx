import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '@/components/layout';
import { getUser } from '@/helpers/get-user';
import QueryProvider from '@/providers/query-provider';
import { UserProvider } from '@/providers/user-provider';

type User = {
  email: string;
  role: string;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUser();
    setUser(user);
    setLoading(false);
    // if (!user) {
    //   router.push('/login'); // Redirect to login if no user found
    // }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Loading screen
  }

  return (
    <UserProvider user={user} setUser={setUser} isLoading={loading}>
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </QueryProvider>
    </UserProvider>
  );
}
