import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Recognition from '../components/Recognition';
import Products from '../components/Products';
import Industries from '../components/Industries';
import Insights from '../components/Insights';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';
import useAppInit from '../hooks/useAppInit';
import useScrollAnimations from '../hooks/useScrollAnimations';

export default function HomePage() {
  useAppInit();
  useScrollAnimations();

  return (
    <>
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
        <Insights />
        <Contact />
        <Footer />
      </main>

      <SplashCursor />
    </>
  );
}
