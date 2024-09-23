import { Metadata } from 'next';
import Nav from './Navbar/page';
import { CartProvider } from "@/app/Context/CardContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { outfit } from '@/app/ui/fonts';

export const metadata:Metadata = {
  title: {
    template: '%s | AdeGadgets Dashboard',
    default: 'AdeGadgets Dashboard',
  }
}
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CartProvider>
      <Nav />
      <body className={`${outfit.className} antialiased`}>{children}</body>
      </CartProvider>
      <ToastContainer />
    </div>
  );
}