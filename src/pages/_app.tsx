import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/reset.min.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ margin: 0 }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;