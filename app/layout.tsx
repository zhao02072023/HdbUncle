import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HDBUNCLE',
  description: 'HDB Analytics',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  // const currentUser = await prisma?.user.find({})
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser = {currentUser}/>
        <div className="pb-20 pt-28">
         {children}
        </div>
        
      </body>
    </html>
  )
}
