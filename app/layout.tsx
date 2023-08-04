import { Inter } from 'next/font/google';

import { AuthContextProvider } from '@/contexts/AuthContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IF Estágio',
  description:
    'Plataforma para auxiliar na validação e preenchimento do formulário de estágio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
