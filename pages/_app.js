import '@/styles/globals.css'
import '../firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default function App({ Component, pageProps }) {
  return (
    <div className='site'>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
