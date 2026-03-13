import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowitWorks from '@/components/HowitWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const COLORS = {
    text: "#F1F5F9",
}

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1E] selection:bg-blue-500/30 font-['Inter']" style={{ color: COLORS.text }}>
      <Navbar />
      <Hero />
      <HowitWorks />
      <CTA />
      <Footer />
    </div>
  );
}

export default HomePage