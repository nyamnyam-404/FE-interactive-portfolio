import gsap from "gsap";

import birdStand from "../assets/scene01/robin_stand_1_1x.webp";
import birdUp from "../assets/scene01/robin_wingup_1_1x.webp";
import birdDown from "../assets/scene01/robin_wingdown_1_1x.webp";

type HomeToSignpostTargets = {
  container: HTMLDivElement;
  storyCanvas: HTMLDivElement;
  bird: SVGGElement;
  birdImage: SVGImageElement;
  signpostScene: HTMLDivElement;
  homeLandscape: HTMLImageElement;
  cloud: HTMLImageElement;
};

function addSignpostSceneReveal(
  timeline: gsap.core.Timeline,
  signpostScene: HTMLDivElement
) {
  timeline.fromTo(
    signpostScene,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      ease: "power2.out",
      duration: 0.25,
    }, 0.65
  );
}

function addHomeSceneExit(
  timeline: gsap.core.Timeline,
  landscape: HTMLImageElement
) {
  timeline.to(
    landscape,
    {
      yPercent: -100,
      ease: "power2.inOut",
      duration: 0.25,
    },
    0.7
  );
}

function addBirdFlapping(
  timeline: gsap.core.Timeline,
  birdImage: SVGImageElement
) {
  const frameInterval = 0.05;
  const firstFlightPosition = 0.001;
  const frames = [birdDown, birdUp];

  // 스크롤이 시작되자마자 첫 비행 이미지로 변경
  timeline.set(
    birdImage,
    {
      attr: {
        href: birdUp,
      },
    },
    firstFlightPosition
  );

  let frameIndex = 0;

  // 이후 스크롤 진행도에 따라 날개 프레임 반복
  for (
    let position = frameInterval;
    position <= 1;
    position += frameInterval
  ) {
    const frame = frames[frameIndex % frames.length];

    timeline.set(
      birdImage,
      {
        attr: {
          href: frame,
        },
      },
      position
    );

    frameIndex++;
  }

  timeline.set(
    birdImage,
    {
      attr: {
        href: birdStand,
      },
    }, 1
  );
}

function addHorizontalScroll(
  timeline: gsap.core.Timeline,
  container: HTMLDivElement,
  storyCanvas: HTMLDivElement
) {
  timeline.to(
    container,
    {
      x: () => {
        const canvasWidth = storyCanvas.getBoundingClientRect().width;
        const viewportWidth = window.innerWidth;
        const travelDistance = Math.max(0, canvasWidth - viewportWidth);

        return -travelDistance;
      },
      ease: "none",
      duration: 0.85,
    },
    0.15
  );
}

function addBirdMotion(
  timeline: gsap.core.Timeline,
  bird: SVGGElement
) {
  timeline.to(
    bird,
    {
      motionPath: { 
        path: "#birdPath",
        align: "#birdPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      ease: "none",
      duration: 1,
    },
    0
  );
}

function addCloudMotion(
  timeline: gsap.core.Timeline,
  cloud: HTMLImageElement
) {
  timeline.to(
    cloud,
    {
      x: 700,
      ease: "none",
      duration: 1,
    }, 0
  );
}

export function createHomeToSignpostTimeline({
  container,
  storyCanvas,
  bird,
  birdImage,
  signpostScene,
  homeLandscape,
  cloud,
}: HomeToSignpostTargets) {
  const timeline = gsap.timeline();

  addHorizontalScroll(timeline, container, storyCanvas);
  addBirdMotion(timeline, bird);
  addBirdFlapping(timeline, birdImage);
  addSignpostSceneReveal(timeline, signpostScene);
  addHomeSceneExit(timeline, homeLandscape);
  addCloudMotion(timeline, cloud);

  return timeline;
}