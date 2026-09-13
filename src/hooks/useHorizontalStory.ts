import { useEffect } from "react";
import type { RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type UseHorizontalStoryProps = {
  sectionRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  birdRef: RefObject<SVGPolygonElement | null>;
};

function addHorizontalScroll(
  timeline: gsap.core.Timeline,
  container: HTMLDivElement
) {
  timeline.to(
    container,
    {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      duration: 1,
    },
    0
  );
}

function addBirdMotion(
  timeline: gsap.core.Timeline,
  bird: SVGPolygonElement
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
}: UseHorizontalStoryProps) {
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const bird = birdRef.current;

    if (!section || !container || !bird) return;

    const ctx = gsap.context(() => {
      const layers =
        section.querySelectorAll<HTMLElement>(".parallax-layer");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      addHorizontalScroll(timeline, container);

      addBirdMotion(timeline, bird);

      addParallax(timeline, layers);
      
    }, section);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, containerRef, birdRef]);
}