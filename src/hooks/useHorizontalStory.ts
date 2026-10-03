import { useEffect } from "react";
import type { RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import birdStand from "../assets/scene01/robin_stand_1_1x.webp";
import birdUp from "../assets/scene01/robin_wingup_1_1x.webp"
import birdDown from "../assets/scene01/robin_wingdown_1_1x.webp"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type UseHorizontalStoryProps = {
  sectionRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  birdRef: RefObject<SVGGElement | null>;
  birdImageRef: RefObject<SVGImageElement | null>;
  sceneTwoRef: RefObject<HTMLDivElement | null>;
  sceneOneLandscapeRef: RefObject<HTMLImageElement | null>;
  cloudRef: RefObject<HTMLImageElement | null>;
};

function addSceneTwoReveal(
  timeline: gsap.core.Timeline,
  sceneTwo: HTMLDivElement
) {
  timeline.fromTo(
    sceneTwo,
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

function addSceneOneExit(
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
  container: HTMLDivElement
) {
  timeline.to(
    container,
    {
      x: () => -(container.scrollWidth - window.innerWidth),
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

export function useHorizontalStory({
  sectionRef,
  containerRef,
  birdRef,
  birdImageRef,
  sceneTwoRef,
  sceneOneLandscapeRef,
  cloudRef
}: UseHorizontalStoryProps) {
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const bird = birdRef.current;
    const birdImage = birdImageRef.current;
    const sceneTwo = sceneTwoRef.current;
    const sceneOneBg = sceneOneLandscapeRef.current;
    const cloud = cloudRef.current;

    if (!section || !container || !bird || !birdImage || !sceneTwo || !sceneOneBg || !cloud) return;

    const ctx = gsap.context(() => {

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      addHorizontalScroll(timeline, container);
      addBirdMotion(timeline, bird);
      addBirdFlapping(timeline, birdImage)
      addSceneTwoReveal(timeline, sceneTwo);
      addSceneOneExit(timeline, sceneOneBg);
      addCloudMotion(timeline, cloud);
      
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, containerRef, birdRef, birdImageRef, cloudRef]);
}