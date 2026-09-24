import { useEffect } from "react";
import type { RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import birdUp from "../assets/scene01/robin_wingup_1_1x.webp"
import birdDown from "../assets/scene01/robin_wingdown_1_1x.webp"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type UseHorizontalStoryProps = {
  sectionRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  birdRef: RefObject<SVGGElement | null>;
  birdImageRef: RefObject<SVGImageElement | null>;
  sceneTwoRef: RefObject<HTMLDivElement | null>;
  sceneOneBgRef: RefObject<HTMLImageElement | null>;
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
  sceneOneBg: HTMLImageElement
) {
  timeline.to(
    sceneOneBg,
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
  const frames = [birdUp, birdDown];

  let frameIndex = 0;
  
  for (let position = frameInterval; position <= 1; position += frameInterval) {
      const frame = frames[frameIndex % frames.length];

      timeline.set(
        birdImage,
        {
          attr: {
            href: frame,
          },
        }, position
      );

      frameIndex++;
  };
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
      motionPath: { // todo: responsive 작업시 MotionPath alignment resize 확인
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

function addParallax(
  timeline: gsap.core.Timeline,
  layers: NodeListOf<HTMLElement>
) {
  layers.forEach((layer) => {
    const speed = Number(layer.dataset.speed ?? 0);

    timeline.to(
      layer,
      {
        x: () => window.innerWidth * speed,
        ease: "none",
        duration: 1,
      },
      0
    );
  });
}

export function useHorizontalStory({
  sectionRef,
  containerRef,
  birdRef,
  birdImageRef,
  sceneTwoRef,
  sceneOneBgRef,
}: UseHorizontalStoryProps) {
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const bird = birdRef.current;
    const birdImage = birdImageRef.current;
    const sceneTwo = sceneTwoRef.current;
    const sceneOneBg = sceneOneBgRef.current;

    if (!section || !container || !bird || !birdImage || !sceneTwo || !sceneOneBg) return;

    const ctx = gsap.context(() => {
      const layers =
        section.querySelectorAll<HTMLElement>(".parallax-layer");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      addHorizontalScroll(timeline, container);
      addBirdMotion(timeline, bird);
      addParallax(timeline, layers);
      addBirdFlapping(timeline, birdImage)
      addSceneTwoReveal(timeline, sceneTwo);
      addSceneOneExit(timeline, sceneOneBg)
      
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, containerRef, birdRef, birdImageRef]);
}