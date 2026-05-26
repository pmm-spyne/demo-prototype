import { useEffect, useRef } from "react";
import gsap from "gsap";
import Frame26 from "../../imports/Frame2147240605/Frame2147240605";

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide the static green segment from the Figma import
    const styleEl = document.createElement("style");
    styleEl.textContent = '[id="Line 4249"] { display: none !important; }';
    document.head.appendChild(styleEl);

    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      const clip = clipRef.current;
      const beam = beamRef.current;
      if (!container || !clip || !beam) return;

      const lineEl = container.querySelector('[id="Line 4248"]');
      const svgEl = lineEl?.closest("svg");
      if (!svgEl) return;

      const cr = container.getBoundingClientRect();
      const lr = svgEl.getBoundingClientRect();
      const lineWidth = lr.width;

      // Position the clipping container exactly over the gray line
      gsap.set(clip, {
        left: lr.left - cr.left,
        top: lr.top - cr.top,
        width: lineWidth,
        height: 6,
        display: "block",
      });

      // Start the beam off the left edge
      gsap.set(beam, { x: -43 });

      // Each sweep: 1s, 5 sweeps = 5s total, then call onComplete
      gsap.to(beam, {
        x: lineWidth,
        duration: 1,
        ease: "linear",
        repeat: 4,
        onComplete,
      });
    });

    return () => {
      document.head.removeChild(styleEl);
      cancelAnimationFrame(raf);
      gsap.killTweensOf(beamRef.current);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="relative size-full">
      <Frame26 />
      {/* Animated beam overlay — hidden until positioned by GSAP */}
      <div
        ref={clipRef}
        className="absolute pointer-events-none overflow-hidden rounded-full hidden"
      >
        <div
          ref={beamRef}
          className="absolute inset-y-0 left-0 w-[43px] rounded-full bg-[#027A48]"
        />
      </div>
    </div>
  );
}
