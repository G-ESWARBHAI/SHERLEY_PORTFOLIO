import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Ventures from './components/Ventures';
import Gallery from './components/Gallery';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream-neutral">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Ventures />
      <Gallery />
      <Recognition />
      <Contact />
      <Footer />
      </div>
  );
}

export default App;
