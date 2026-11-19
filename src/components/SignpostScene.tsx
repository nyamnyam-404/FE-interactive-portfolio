import type { RefObject } from "react";

import scene02Bg from "../assets/scene02/scene_02_1_1x.webp";

type SignpostSceneProps = {
  signpostSceneRef: RefObject<HTMLDivElement | null>;
};

function SignpostScene({ signpostSceneRef }: SignpostSceneProps) {
  return (
    <div ref={signpostSceneRef} className="scene scene-2">
      <div className="scene02-artwork">
        <img
          src={scene02Bg}
          alt=""
          className="scene02-background"
        />
      </div>
    </div>
  );
}

export default SignpostScene;