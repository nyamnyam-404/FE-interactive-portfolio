import { useEffect } from "react";
import type { RefObject } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { createHomeToSignpostTimeline } from "../animations/homeToSignpost";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type UseHorizontalStoryProps = {
  sectionRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  birdRef: RefObject<SVGGElement | null>;
  birdImageRef: RefObject<SVGImageElement | null>;
  signpostSceneRef: RefObject<HTMLDivElement | null>;
  homeSceneLandscapeRef: RefObject<HTMLImageElement | null>;
  cloudRef: RefObject<HTMLImageElement | null>;
  storyCanvasRef: RefObject<HTMLDivElement | null>;
};



export function useHorizontalStory({
  sectionRef,
  containerRef,
  storyCanvasRef,
  birdRef,
  birdImageRef,
  signpostSceneRef,
  homeSceneLandscapeRef,
  cloudRef,
}: UseHorizontalStoryProps) {
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const bird = birdRef.current;
    const birdImage = birdImageRef.current;
    const signpostScene = signpostSceneRef.current;
    const homeSceneBg = homeSceneLandscapeRef.current;
    const cloud = cloudRef.current;
    const storyCanvas = storyCanvasRef.current;

    if (!section || !container || !storyCanvas || !bird || !birdImage || !signpostScene || !homeSceneBg || !cloud) return;

    const ctx = gsap.context(() => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const homeToSignpostTimeline = createHomeToSignpostTimeline({
        container,
        storyCanvas,
        bird,
        birdImage,
        signpostScene,
        homeLandscape: homeSceneBg,
        cloud,
      });

      masterTimeline.addLabel("home", 0);
      masterTimeline.add(homeToSignpostTimeline, "home");
      masterTimeline.addLabel("signpost");
    }, section);

    return () => {
      ctx.revert();
    };
    
  }, [sectionRef, containerRef, storyCanvasRef, birdRef, birdImageRef, signpostSceneRef, homeSceneLandscapeRef, cloudRef]);
}