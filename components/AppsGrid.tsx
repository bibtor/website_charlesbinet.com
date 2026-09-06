/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const APPS = [
  {
    name: "Datasweeper",
    tagline: "Clean your Mac",
    icon: "/datasweeper.png",
    href: "https://datasweeper.app",
  },
  {
    name: "Minesquad",
    tagline: "A giveback game",
    icon: "/minesquad.png",
    href: "https://www.minesquad.app/",
  },
  {
    name: "Whale's Nest",
    tagline: "Investor tracking",
    icon: "/whalesnest.png",
    href: "https://www.whalesnest.app/",
  },
  {
    name: "PictoKit",
    tagline: "Your shortcut to icons",
    icon: "/pictokit.png",
    href: "https://pictokit.app",
  },
];

// App card with the same cursor-following 3D tilt as the work assets —
// signals that the card is interactive.
function TiltCard({ app }: { app: (typeof APPS)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [-14, 14]), { stiffness: 320, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [14, -14]), { stiffness: 320, damping: 28 });

  return (
    <div style={{ perspective: 600 }}>
      <motion.a
        ref={ref}
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className="fade-unit rounded-2xl p-4 flex flex-col items-start md:flex-row md:items-center gap-3"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", rotateX, rotateY }}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set((e.clientX - rect.left) / rect.width);
          my.set((e.clientY - rect.top) / rect.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-10 h-10 rounded-lg shadow-md flex-shrink-0"
        />
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold text-white">{app.name}</span>
          <span className="text-[14px] leading-snug text-white/40">{app.tagline}</span>
        </div>
      </motion.a>
    </div>
  );
}

// 2x2 grid of app cards — same row layout and text sizes as the quote attribution
export function AppsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {APPS.map((app) => (
        <TiltCard key={app.name} app={app} />
      ))}
    </div>
  );
}
