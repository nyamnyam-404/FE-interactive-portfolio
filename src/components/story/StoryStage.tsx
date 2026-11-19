import { useRef } from "react";

import HomeScene from "../HomeScene";
import SignpostScene from "../SignpostScene";
import BirdPath from "../BirdPath";

import { useHorizontalStory } from "../../hooks/useHorizontalStory";

function StoryStage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const birdRef = useRef<SVGGElement | null>(null);
  const birdImageRef = useRef<SVGImageElement | null>(null);

  const signpostSceneRef = useRef<HTMLDivElement | null>(null);
  const homeSceneLandscapeRef = useRef<HTMLImageElement | null>(null);
  const cloudRef = useRef<HTMLImageElement | null>(null);

  const storyCanvasRef = useRef<HTMLDivElement | null>(null);

  useHorizontalStory({
    sectionRef,
    containerRef,
    birdRef,
    birdImageRef,
    signpostSceneRef,
    homeSceneLandscapeRef,
    cloudRef,
    storyCanvasRef
  });

  return (
    <section ref={sectionRef} className="horizontal-section">
      <div ref={containerRef} className="horizontal-container">
        <div ref={storyCanvasRef} className="story-canvas">
          <div className="story-layers">
            <HomeScene
              homeSceneLandscapeRef={homeSceneLandscapeRef}
              cloudRef={cloudRef}
            />

            <SignpostScene
              signpostSceneRef={signpostSceneRef}
            />

            <BirdPath
              birdRef={birdRef}
              birdImageRef={birdImageRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoryStage;