import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Recognition from '../components/Recognition';
import Products from '../components/Products';
import Industries from '../components/Industries';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import CaseStudies from '../components/CaseStudies';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import useAppInit from '../hooks/useAppInit';
import useScrollAnimations from '../hooks/useScrollAnimations';

/* Only lazy-load the heavy GPU canvas — it self-disables on mobile anyway */
const SplashCursor = lazy(() => import('../components/SplashCursor'));

export default function HomePage() {
  useAppInit();
  useScrollAnimations();

  return (
    <>
      <SEO
        title={null}
        description="Premier technology partner for startups to enterprises. Custom software development, AI solutions, cloud & DevOps, ERP (ERPNext), mobile apps, and marketing technology. 50+ enterprise clients in Pune, India."
        keywords="software development company, ERP solutions, ERPNext, Frappe, AI solutions, cloud DevOps, custom software, web development, mobile app development, IT services India, Pune, digital transformation, SaaS, enterprise software"
      />
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="stage" id="stage">
        <div className="card" id="heroCard" data-screen-label="Hero">
          <Navbar />
          <Hero />
        </div>
        <div className="scroll-hint" id="scrollHint">
          <span>Scroll to explore</span>
          <i></i>
        </div>
      </header>

      <main id="content">
        <About />
        <Marquee />
        <Services />
        <Recognition />
        <Products />
        <Industries />
        <Clients />
        <CaseStudies />
        <Testimonials />
        <Contact />
        <Footer />
      </main>

      <Suspense fallback={null}>
        <SplashCursor />
      </Suspense>
    </>
  );
}
