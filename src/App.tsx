import { useRef } from "react";

import BirdPath from "./components/BirdPath";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";

import { useHorizontalStory } from './hooks/useHorizontalStory';

import "./App.css";

function App() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<SVGPolygonElement | null>(null);

  useHorizontalStory({
    sectionRef,
    containerRef,
    birdRef
  });

  return (
    <main>
      <section ref={sectionRef} className="horizontal-section">
        <BirdPath birdRef={birdRef} />

        <div ref={containerRef} className="horizontal-container">
          <SceneOne />

          <SceneTwo />

          <SceneThree />
        </div>

      </section>
    </main>
  );
}

export default App;