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
  const sceneOneLandscapeRef = useRef<HTMLImageElement | null>(null);
  const cloudRef = useRef<HTMLImageElement | null>(null);

  useHorizontalStory({
    sectionRef,
    containerRef,
    birdRef,
    birdImageRef,
    sceneTwoRef,
    sceneOneLandscapeRef,
    cloudRef,
  });

  return (
    <main>
      <section ref={sectionRef} className="horizontal-section">

        <div ref={containerRef} className="horizontal-container">
          <SceneOne
            birdRef={birdRef}
            birdImageRef={birdImageRef}
            sceneTwoRef={sceneTwoRef}
            sceneOneLandscapeRef={sceneOneLandscapeRef}
            cloudRef={cloudRef}
          />
        </div>

      </section>
    </main>
  );
}

export default App;