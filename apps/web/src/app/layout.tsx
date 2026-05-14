import '@9ja/ui/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '9ja Messenger | Connect with Africa',
  description: 'A world-class, secure messaging platform for Nigeria and the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#008751',
                  accent: '#fcd116',
                },
                fontFamily: {
                  sans: ['Outfit', 'Inter', 'sans-serif'],
                },
              }
            }
          }
        `}} />
        <style dangerouslySetInnerHTML={{ __html: `
          .glass {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 20px 40px -15px rgba(0, 135, 81, 0.15);
          }
          .premium-gradient {
            background: linear-gradient(135deg, #008751 0%, #00a86b 100%);
            box-shadow: 0 10px 20px -5px rgba(0, 135, 81, 0.3);
          }
          .text-gradient {
            background: linear-gradient(135deg, #008751 0%, #00a86b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .pattern-bg {
            background-image: 
              radial-gradient(at 0% 0%, rgba(0, 135, 81, 0.05) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(252, 209, 22, 0.05) 0px, transparent 50%),
              url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008751' fill-opacity='0.03'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20S0 28.954 0 40s8.954 20 20 20 20-8.954 20-20zm40 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
        `}} />
      </head>
      <body className={`${inter.className} pattern-bg`}>
        {children}
      </body>
    </html>
  );
}
