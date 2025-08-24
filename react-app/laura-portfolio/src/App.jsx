import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Certificates from './sections/Certificates';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function App(){
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Certificates />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
