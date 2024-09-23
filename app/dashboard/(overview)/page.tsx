import { Metadata } from 'next';
import Header from '../Header/page';
import ProductSection from '../ProductSection/page';
import Footer from '../Footer/page';

export const metadata:Metadata = {
    title:'Homepage'
}

export default function Home () {
    return(
        <>
        <Header />
        <ProductSection />
        <Footer />
        </>
    )
}