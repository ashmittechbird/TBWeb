import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import SEO from '../components/SEO';
import useAppInit from '../hooks/useAppInit';
import useScrollAnimations from '../hooks/useScrollAnimations';

/* Below-fold components — lazy loaded for faster initial paint */
const Marquee       = lazy(() => import('../components/Marquee'));
const Services      = lazy(() => import('../components/Services'));
const Recognition   = lazy(() => import('../components/Recognition'));
const Products      = lazy(() => import('../components/Products'));
const Industries    = lazy(() => import('../components/Industries'));
const Clients       = lazy(() => import('../components/Clients'));
const Testimonials  = lazy(() => import('../components/Testimonials'));
const CaseStudies   = lazy(() => import('../components/CaseStudies'));
const Contact       = lazy(() => import('../components/Contact'));
const Footer        = lazy(() => import('../components/Footer'));

/* SplashCursor already self-disables on mobile/reduced-motion */
const SplashCursor  = lazy(() => import('../components/SplashCursor'));

const Placeholder = () => <div style={{ minHeight: '40vh' }} />;

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
        <Suspense fallback={<Placeholder />}>
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
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <SplashCursor />
      </Suspense>
    </>
  );
}
