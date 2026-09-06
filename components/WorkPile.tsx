import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

type Slide = { srcs: string[]; company: string };

// Every image and video from the focus-mode feed (no headers or text),
// keeping the same solo / side-by-side pair layout
const SLIDES: Slide[] = [
  { srcs: ["/depictvid1.mp4"], company: "Depict" },
  { srcs: ["/depict1.png"], company: "Depict" },
  { srcs: ["/depict2.png"], company: "Depict" },
  { srcs: ["/depict3.png", "/depict4.png"], company: "Depict" },
  { srcs: ["/depict5.png"], company: "Depict" },
  { srcs: ["/depict6.png"], company: "Depict" },
  { srcs: ["/depictvid2.mp4"], company: "Depict" },
  { srcs: ["/zettle1.png"], company: "Zettle" },
  { srcs: ["/zettle6.gif", "/zettle7.gif"], company: "Zettle" },
  { srcs: ["/zettle2.png"], company: "Zettle" },
  { srcs: ["/zettle4.png", "/zettle5.gif"], company: "Zettle" },
  { srcs: ["/zettle3.png"], company: "Zettle" },
  { srcs: ["/brick0.png"], company: "Brickanta" },
  { srcs: ["/brick1.png"], company: "Brickanta" },
  { srcs: ["/brick2.png"], company: "Brickanta" },
  { srcs: ["/brick3.png", "/brick4.png"], company: "Brickanta" },
  { srcs: ["/brick5.png"], company: "Brickanta" },
  { srcs: ["/minesquad1.png"], company: "Minesquad" },
  { srcs: ["/minesquad2.png"], company: "Minesquad" },
  { srcs: ["/minesquad3.png"], company: "Minesquad" },
  { srcs: ["/msvid1.mp4", "/msvid2.mp4", "/msvid3.mp4", "/msvid4.mp4"], company: "Minesquad" },
  { srcs: ["/dsvid1.mp4"], company: "Datasweeper" },
  { srcs: ["/dsvid2.mp4"], company: "Datasweeper" },
  { srcs: ["/pictokit_demo_small.mp4"], company: "PictoKit" },
  { srcs: ["/picto1.png"], company: "PictoKit" },
  { srcs: ["/picto2.png"], company: "PictoKit" },
  { srcs: ["/picto3.png"], company: "PictoKit" },
];

const isVideo = (src: string) => src.endsWith(".mp4");

// Flat list for the mobile strip
export const ALL_ASSETS = SLIDES.flatMap((s) => s.srcs);

// Safari won't autoplay from SSR HTML (React omits the muted attribute) —
// force the muted property and kick playback from a ref
const safariAutoplay = (v: HTMLVideoElement | null) => {
  if (!v) return;
  v.muted = true;
  v.defaultMuted = true;
  v.play().catch(() => {});
};

const AUTO_DELAY = 3000; // ms of idleness before auto-swap
const SCROLL_THRESHOLD = 90; // wheel px per swap

const mod = (n: number) => ((n % SLIDES.length) + SLIDES.length) % SLIDES.length;

// Snappy, precise spring for the flip-up entrance
const FLIP_SPRING = { type: "spring", stiffness: 520, damping: 44, mass: 1 } as const;

// Direction-aware slide poses: forward flips the new slide up and pushes the old
// one back; backward reverses it — the current slide flaps down flat while the
// previous one comes forward from the pushed-back depth.
const slideVariants = {
  enter: (dir: number) =>
    dir >= 0
      ? { rotateX: 75, y: 48, z: 0, opacity: 1 }
      : { rotateX: 0, y: 0, z: -320, opacity: 0 },
  center: (dir: number) => ({
    rotateX: 0,
    y: 0,
    z: 0,
    opacity: 1,
    transition:
      dir >= 0
        ? FLIP_SPRING
        : { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const },
  }),
  exit: (dir: number) =>
    dir >= 0
      ? {
          z: -320,
          opacity: 0,
          transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
        }
      : {
          rotateX: 75,
          y: 48,
          opacity: 0,
          transition: {
            rotateX: FLIP_SPRING,
            y: FLIP_SPRING,
            opacity: { duration: 0.18, delay: 0.22 },
          },
        },
};

export function WorkPile({
  focused = false,
  onAssetClick,
  onExplored,
}: {
  focused?: boolean;
  onAssetClick?: (src: string) => void;
  onExplored?: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollAcc = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const manualSteps = useRef(0);
  const exploredFired = useRef(false);

  const advance = useCallback(
    (steps: number, manual = false) => {
      if (steps !== 0) setDirection(steps > 0 ? 1 : -1);
      setCurrent((c) => c + steps);
      // Easter egg: fires after manually stepping through the whole set ~3 times
      if (manual && !exploredFired.current) {
        manualSteps.current += Math.abs(steps);
        if (manualSteps.current >= SLIDES.length * 3) {
          exploredFired.current = true;
          onExplored?.();
        }
      }
    },
    [onExplored]
  );

  // Auto-swap after 3s of no swaps — paused in focus mode so the visitor
  // can examine work at their own pace
  useEffect(() => {
    if (focused) return;
    const t = setTimeout(() => advance(1), AUTO_DELAY);
    return () => clearTimeout(t);
  }, [current, advance, focused]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") advance(-1, true);
      else if (e.key === "ArrowDown") advance(1, true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  // Wheel with momentum: big scrolls swap several cards at once.
  // Native listener so preventDefault works (React wheel listeners are passive).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAcc.current += e.deltaY;
      const steps = Math.trunc(scrollAcc.current / SCROLL_THRESHOLD);
      if (steps !== 0) {
        scrollAcc.current -= steps * SCROLL_THRESHOLD;
        advance(steps, true);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  // Cursor tracking: normalized position drives the 3D tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  // Dip the card toward the cursor
  const rotateX = useSpring(useTransform(my, [0, 1], [-7, 7]), { stiffness: 320, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [7, -7]), { stiffness: 320, damping: 28 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const slide = SLIDES[mod(current)];
  const next = SLIDES[mod(current + 1)];
  const prev = SLIDES[mod(current - 1)];

  return (
    <div
      ref={containerRef}
      onClick={() => onAssetClick?.(slide.srcs[0])}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className={`relative w-full h-full flex items-center justify-center select-none ${
        focused ? "" : "cursor-pointer"
      }`}
    >
      {/* Stage: real 3D space so the pushed-back card sorts behind the incoming one */}
      <div
        className={`relative ${
          focused ? "w-[94%] h-[88%]" : "w-[min(1040px,94%)] h-[min(700px,86%)]"
        }`}
        style={{ perspective: 1100, transformStyle: "preserve-3d" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.srcs.join()}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Inner layer carries the cursor-following tilt */}
            <motion.div
              className="w-full h-full flex items-center justify-center gap-4"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {slide.srcs.length === 4 ? (
                // 2x2 grid of square videos/images, sized to the stage height
                <div
                  className="grid grid-cols-2 grid-rows-2 gap-3 max-h-full max-w-full"
                  style={{ aspectRatio: "1", height: "100%" }}
                >
                  {slide.srcs.map((src, i) => {
                    const cls = "w-full h-full min-h-0 object-cover rounded-lg shadow-2xl";
                    const anim = {
                      initial: i === 0 ? false : { opacity: 0, y: 28 },
                      animate: { opacity: 1, y: 0 },
                      transition: { ...FLIP_SPRING, delay: i * 0.08 },
                    } as const;
                    return isVideo(src) ? (
                      <motion.video
                        key={src}
                        ref={safariAutoplay}
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={cls}
                        {...anim}
                      />
                    ) : (
                      <motion.img key={src} src={src} alt={`${slide.company} work`} className={cls} {...anim} />
                    );
                  })}
                </div>
              ) : (
                slide.srcs.map((src, i) => {
                  const media = {
                    className:
                      "max-h-full min-w-0 w-auto h-auto rounded-lg shadow-2xl object-contain",
                    style: {
                      maxWidth: slide.srcs.length > 1 ? "calc(50% - 8px)" : "100%",
                      // exception: source video has a white line baked into its bottom edge
                      ...(src === "/depictvid2.mp4"
                        ? { clipPath: "inset(0 0 2px 0 round 8px)" }
                        : {}),
                    },
                    // On pair slides the second item lands a beat after the first
                    initial: i === 0 ? false : { opacity: 0, y: 28 },
                    animate: { opacity: 1, y: 0 },
                    transition: { ...FLIP_SPRING, delay: i * 0.12 },
                  } as const;
                  return isVideo(src) ? (
                    <motion.video
                      key={src}
                      ref={safariAutoplay}
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      {...media}
                    />
                  ) : (
                    <motion.img key={src} src={src} alt={`${slide.company} work`} {...media} />
                  );
                })
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Up / down navigation arrows */}
      <div className="absolute right-5 bottom-5 z-10 flex flex-col gap-2">
        {[
          { Icon: ChevronUp, steps: -1, label: "Previous work" },
          { Icon: ChevronDown, steps: 1, label: "Next work" },
        ].map(({ Icon, steps, label }) => (
          <motion.button
            key={label}
            aria-label={label}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
            style={{ backgroundColor: "#171719" }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              advance(steps, true);
            }}
          >
            <Icon className="w-4 h-4" />
          </motion.button>
        ))}
      </div>

      {/* Preload adjacent slides so swaps in either direction never show a blank frame */}
      {[...next.srcs, ...prev.srcs].filter((src) => !isVideo(src)).map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" className="hidden" aria-hidden />
      ))}
    </div>
  );
}
