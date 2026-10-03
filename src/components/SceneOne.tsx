import scene01Sky from "../assets/scene01/scene01_sky_1_1x.webp";
import scene01Landscape from "../assets/scene01/scene_01_1_1x.webp"
import scene01Cloud from "../assets/scene02/scene_02_cloud_1_1x.webp"

import SceneTwo from "./SceneTwo";
import type { RefObject } from "react";
import BirdPath from "./BirdPath";

type SceneOneProps = {
  birdRef: RefObject<SVGGElement | null>;
  birdImageRef: RefObject<SVGImageElement | null>;
  sceneTwoRef: RefObject<HTMLDivElement | null>;
  sceneOneLandscapeRef: RefObject<HTMLImageElement | null>;
  cloudRef: RefObject<HTMLImageElement | null>;
};

function SceneOne({birdRef, birdImageRef, sceneTwoRef, sceneOneLandscapeRef, cloudRef}:SceneOneProps) {
  return (
    <div className="scene scene-1">
      <div className="scene01-artwork">

        <img
          src={scene01Sky}
          alt=""
          className="scene01-sky"
        />
        <img
          ref={cloudRef}
          src={scene01Cloud}
          alt=""
          className="scene01-cloud"
        />
        <img
          ref={sceneOneLandscapeRef}
          src={scene01Landscape}
          alt=""
          className="scene01-landscape"
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