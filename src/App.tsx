import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { Trust } from './components/Trust';
import { Testimonials } from './components/Testimonials';
import { RequestForm } from './components/RequestForm';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Trust />
        <Testimonials />
        <RequestForm />
      </main>
      <Footer />
    </>
  );
}
