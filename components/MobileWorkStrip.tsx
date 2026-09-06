/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

const isVideo = (s: string) => s.endsWith(".mp4");

/**
 * Mobile-only horizontal work strip: drifts sideways on its own, loops forever,
 * and can be scrolled by hand (auto-play pauses while touching, resumes after).
 * Images only — keeps the strip light on mobile; videos live in focus mode.
 */
export function MobileWorkStrip({
  assets,
  onAssetClick,
  onExplored,
}: {
  assets: string[];
  onAssetClick?: (src: string) => void;
  onExplored?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const images = assets.filter((s) => !isVideo(s));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let resumeTimer: ReturnType<typeof setTimeout>;
    // True drift position kept as a float: iOS rounds scrollLeft on read, so
    // sub-pixel `scrollLeft += 0.6` reads back unchanged and the drift stalls.
    let pos = el.scrollLeft;

    // Easter egg: fire after hand-scrolling roughly three full loops
    let handDistance = 0;
    let lastLeft = el.scrollLeft;
    let exploredFired = false;
    const onScroll = () => {
      const third = el.scrollWidth / 3;
      const delta = el.scrollLeft - lastLeft;
      lastLeft = el.scrollLeft;
      // resync the float position on real user scrolls (not our own rounding)
      if (Math.abs(el.scrollLeft - pos) > 1.5) pos = el.scrollLeft;
      // ignore the seamless-loop teleports; count only hand scrolling
      if (paused.current && Math.abs(delta) < third * 0.4) {
        handDistance += Math.abs(delta);
        if (!exploredFired && handDistance >= third * 3) {
          exploredFired = true;
          onExplored?.();
        }
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const third = el.scrollWidth / 3;
      if (third > el.clientWidth) {
        if (!paused.current) el.scrollLeft += 0.6;
        // seamless loop in both directions
        if (el.scrollLeft >= third * 2) el.scrollLeft -= third;
        else if (el.scrollLeft < third * 0.5) el.scrollLeft += third;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const stop = () => {
      paused.current = true;
      clearTimeout(resumeTimer);
    };
    const resume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused.current = false;
      }, 1500);
    };
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("pointerdown", stop, { passive: true });
    el.addEventListener("pointerup", resume, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("pointerup", resume);
    };
  }, [onExplored]);

  return (
    <div ref={ref} className="md:hidden -mx-5 overflow-x-auto scrollbar-hide">
      <div className="flex items-stretch gap-3 px-5 w-max h-[280px]">
        {[0, 1, 2].map((copy) =>
          images.map((src) => (
            <img
              key={`${copy}-${src}`}
              src={src}
              alt="Work asset"
              loading="lazy"
              className="h-full w-auto rounded-xl"
              onClick={() => onAssetClick?.(src)}
            />
          ))
        )}
      </div>
    </div>
  );
}
