import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QueueLess Kacheri – NagrikSeva AI',
  description: 'Zero physical queues for Gujarat Government Kacheris and Jan Seva Kendras',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="gu">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
