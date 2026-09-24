import { useRef } from "react";

// import BirdPath from "./components/BirdPath";
import SceneOne from "./components/SceneOne";

import { useHorizontalStory } from './hooks/useHorizontalStory';

import "./App.css";

function App() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<SVGGElement | null>(null);
  const birdImageRef = useRef<SVGImageElement>(null);
  const sceneTwoRef = useRef<HTMLDivElement | null>(null);
  const sceneOneBgRef = useRef<HTMLImageElement | null>(null);

  useHorizontalStory({
    sectionRef,
    containerRef,
    birdRef,
    birdImageRef,
    sceneTwoRef,
    sceneOneBgRef
  });

  return (
    <main>
      <section ref={sectionRef} className="horizontal-section">

        <div ref={containerRef} className="horizontal-container">
          <SceneOne
            birdRef={birdRef}
            birdImageRef={birdImageRef}
            sceneTwoRef={sceneTwoRef}
            sceneOneBgRef={sceneOneBgRef}
          />
        </div>

      </section>
    </main>
  );
}

export default App;