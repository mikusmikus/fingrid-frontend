import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { Layout } from '@/components/layout';
import QueryProvider from '@/providers/query-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </QueryProvider>
    </>
  );
}
