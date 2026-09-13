import type { RefObject } from "react";

type BirdPathProps = {
  birdRef: RefObject<SVGPolygonElement | null>;
};

function BirdPath({ birdRef }: BirdPathProps) {
  return (
    <svg className="bird-path" viewBox="0 -100 1400 500">
      <path
        id="birdPath"
        d="M0.0057373 325.807C58.3391 326.473 202.406 294.107 312.006 159.307C449.006 -9.19322 719.506 -54.6932 896.506 76.8068C1073.51 208.307 1349.01 371.307 1349.01 146.807C1349.01 -77.6931 1386.01 11.8069 1386.01 146.807"
        fill="none"
        stroke="black"
      />

      <polygon
        ref={birdRef}
        points="0,-10 25,0 0,10"
        fill="red"
      />
    </svg>
  );
}

export default BirdPath;