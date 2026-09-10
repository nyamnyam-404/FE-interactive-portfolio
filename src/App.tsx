import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
        },
      });
    }, section);
  
    return () => {
      ctx.revert();
    }
  }, []);


  return (
    <main>
      <section ref={sectionRef} className="horizontal-section">
        <div ref={containerRef}className="horizontal-container">
          <div className="scene scene-1">
            <h1>SCENE 01</h1>
          </div>

          <div className="scene scene-2">
            <h1>SCENE 02</h1>
          </div>

          <div className="scene scene-3">
            <h1>SCENE 03</h1>
          </div>
        </div>

      </section>
    </main>
  );
}

export default App;