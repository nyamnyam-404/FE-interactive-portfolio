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
        d="M623.5 687C671 687 1013 480.5 1247 645.5C1627.9 914.08 1845 1092 2294.5 914.5C2652.94 772.957 2832.5 402 3149 199.5C3465.5 -2.99995 3763 253 3816.5 253"
        transform="translate(0 -50)"
        fill="none"
        stroke="none"
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