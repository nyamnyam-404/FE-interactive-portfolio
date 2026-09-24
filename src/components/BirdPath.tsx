import type { RefObject } from "react";

import birdStand from "../assets/scene01/robin_stand_1_1x.webp"

type BirdPathProps = {
  birdRef: RefObject<SVGGElement | null>;
  birdImageRef: RefObject<SVGImageElement | null>;
};

function BirdPath({ birdRef, birdImageRef }: BirdPathProps) {
  return (
    <svg className="bird-path" viewBox="0 0 4096 1280" preserveAspectRatio="xMinYMin meet">
      <path
        id="birdPath"
        d="M620.5 672C703.667 515.167 959.6 227.2 1318 330C1766 458.5 1972.5 800 2335.5 736C2698.5 672 2763 344 3118.5 266C3402.9 203.6 3644.67 282.667 3730 330"
        fill="none"
        stroke="black"
      />

      <g ref={birdRef}>
        <image
          ref={birdImageRef}
          href={birdStand}
          width="180"
          height="180"
        />
      </g>
    </svg>
  );
}

export default BirdPath;