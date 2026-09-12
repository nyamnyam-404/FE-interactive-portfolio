import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import "./App.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function App() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<SVGPolygonElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const bird = birdRef.current;

    if (!section || !container || !bird) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,

          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        container,
        {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: "none",
          duration: 1,
        }, 0
      );

      timeline.to(
        bird,
        {
          motionPath: {
            path: "#birdPath",
            align: "#birdPath",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          duration: 1,
        }, 0
      );
    }, section);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    }
  }, []);


  return (
    <main>
      <section ref={sectionRef} className="horizontal-section">
        <svg className="bird-path" viewBox="0 -100 1400 500">
          <path
            id="birdPath"
            d="M0.0057373 325.807C58.3391 326.473 202.406 294.107 312.006 159.307C449.006 -9.19322 719.506 -54.6932 896.506 76.8068C1073.51 208.307 1349.01 371.307 1349.01 146.807C1349.01 -77.6931 1386.01 11.8069 1386.01 146.807"
            fill="none"
            stroke="black"
          />
          <polygon
            ref={birdRef}
            points="0,-10 25,0 0,10"
            fill="red"
          />
        </svg>


        <div ref={containerRef} className="horizontal-container">
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