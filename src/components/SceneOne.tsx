import scene01Bg from "../assets/scene01/scene_01_1_1x.webp";
import SceneTwo from "./SceneTwo";
import type { RefObject } from "react";
import BirdPath from "./BirdPath";

type SceneOneProps = {
  birdRef: RefObject<SVGGElement | null>;
  birdImageRef: RefObject<SVGImageElement | null>;
  sceneTwoRef: RefObject<HTMLDivElement | null>;
  sceneOneBgRef: RefObject<HTMLImageElement | null>;
};

function SceneOne({birdRef, birdImageRef, sceneTwoRef, sceneOneBgRef}:SceneOneProps) {
  return (
    <div className="scene scene-1">
      <div className="scene01-artwork">

        <img
          ref={sceneOneBgRef}
          src={scene01Bg}
          alt=""
          className="scene01-background"
        />

        <SceneTwo sceneTwoRef={sceneTwoRef} />

        <BirdPath
          birdRef={birdRef}
          birdImageRef={birdImageRef}
        />

      </div>
    </div>
  );
}

export default SceneOne;