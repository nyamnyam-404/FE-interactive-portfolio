import type { RefObject } from "react";

import scene01Sky from "../assets/scene01/scene01_sky_1_1x.webp";
import scene01Landscape from "../assets/scene01/scene_01_1_1x.webp";
import scene01Cloud from "../assets/scene02/scene_02_cloud_1_1x.webp";

type HomeSceneProps = {
  homeSceneLandscapeRef: RefObject<HTMLImageElement | null>;
  cloudRef: RefObject<HTMLImageElement | null>;
};

function HomeScene({
  homeSceneLandscapeRef,
  cloudRef,
}: HomeSceneProps) {
  return (
    <>
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
        ref={homeSceneLandscapeRef}
        src={scene01Landscape}
        alt=""
        className="scene01-landscape"
      />
    </>
  );
}

export default HomeScene;