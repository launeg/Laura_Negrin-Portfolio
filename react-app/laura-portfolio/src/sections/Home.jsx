import { useRef, useState, useEffect } from 'react';
import GameCanvas from '../components/GameCanvas';
import Instructions from '../components/Instructions';

export default function Home() {
  const homeRef = useRef(null);

  const [score, setScore] = useState(0);

  const [nearBoundary, setNearBoundary] = useState(false);

  useEffect(() => {
    if (!homeRef.current) return;

    const sentinel = document.createElement('div');
    Object.assign(sentinel.style, {
      position: 'absolute', bottom: '200px', left: '0',
      width: '1px', height: '1px', pointerEvents: 'none'
    });
    homeRef.current.appendChild(sentinel);

    const obs = new IntersectionObserver(([entry]) => {
      setNearBoundary(!entry.isIntersecting);
    }, { threshold: 0 });

    obs.observe(sentinel);

    return () => {
      obs.disconnect();
      if (homeRef.current?.contains(sentinel)) {
        homeRef.current.removeChild(sentinel);
      }
    };
  }, []);

  return (
    <section id="home" ref={homeRef} className="top-container">
      <img className="top-cloud" src="/Laura_Negrin-Portfolio/images/cloud.png" alt="cloud" />
      <h1>I'm Laura.</h1>
      <h2>A programmer passionate about cloud and web development.</h2>
      <img className="bottom-cloud" src="/Laura_Negrin-Portfolio/images/cloud.png" alt="cloud" />

      <div className={`score-hud ${nearBoundary ? 'fade' : ''}`}>
        Score: {score}
      </div>

      <GameCanvas
        sectionRef={homeRef}
        onScore={(s) => setScore(s)}
      />

      <Instructions fade={nearBoundary} /> 
    </section>
  );
}
