/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

type FeedBlock =
  | { type: "header"; icon: string; name: string; whiteIcon?: boolean }
  | { type: "text"; title?: string; body: string }
  | { type: "video"; src: string; caption?: string; narrow?: boolean }
  | { type: "assets"; srcs: string[]; narrow?: boolean };

// Mirrors the portfolio work page: per-project order, text between assets,
// square assets kept in their original pairs
const FEED: FeedBlock[] = [
  { type: "header", icon: "/brickanta.png", name: "Brickanta AI", whiteIcon: true },
  {
    type: "text",
    body: "Founded by Lucas Otterling and Linus Bein Fahlander, Brickanta brings AI to the construction sector, and has raised over $8M in funding.",
  },
  {
    type: "text",
    title: "Role",
    body: "Joined as a product designer to re-imagine their platform tool, improve their information architecture, and revamp their UI while bringing agentic workflows in the UX.",
  },
  {
    type: "text",
    title: "Impact",
    body: "Shipped a new design system, redesigned all screens and flows, navigation. Concepts for conversational UI and agentic workflows.",
  },
  { type: "assets", srcs: ["/brick0.png"] },
  { type: "assets", srcs: ["/brick1.png"] },
  { type: "assets", srcs: ["/brick2.png"] },
  { type: "assets", srcs: ["/brick3.png", "/brick4.png"] },
  { type: "assets", srcs: ["/brick5.png"] },

  { type: "header", icon: "/depict.jpg", name: "Depict AI" },
  {
    type: "text",
    body: "Founded by Oliver Edholm at 17y/o, and Anton Osika, co-founder and CEO of Lovable, Depict AI is an E-commerce tool. Started as one of the first ai companies for recommendations online, it grew to add search and merchandising features.",
  },
  {
    type: "video",
    src: "/depictvid1.mp4",
    caption: "Launch video made for Product Hunt - Got #1 product of the day",
    // square video — text-column width
    narrow: true,
  },
  {
    type: "text",
    title: "Role",
    body: "I joined as Head of Design then grew to Head of Product & Design. I was responsible for the brand identity, the product design, the design system, the product building process, and roadmap with a team of around 20 people. I supported the CEO in people management, company strategy, recruiting, sales, and marketing.",
  },
  {
    type: "text",
    title: "Impact",
    body: "The product took 3 months to integrate, now takes 3 minutes: 99% time to value reduction. Onboarding is now fully self-served: 96% internal cost reduction. From $500k to $2M ARR: 300% increase in revenue. Used by 1000+ online stores, certified built for Shopify, rated 4.5 stars.",
  },
  { type: "assets", srcs: ["/depict1.png"] },
  { type: "assets", srcs: ["/depict2.png"] },
  { type: "assets", srcs: ["/depict3.png", "/depict4.png"] },
  { type: "assets", srcs: ["/depict5.png"] },
  { type: "assets", srcs: ["/depict6.png"] },
  { type: "video", src: "/depictvid2.mp4" },

  { type: "header", icon: "/zettle.png", name: "Zettle by PayPal" },
  {
    type: "text",
    body: "Formerly called iZettle, a Swedish scale-up FinTech company offering payments and point of sale solutions to small businesses. It got acquired by PayPal in 2018 for $2.2B and scaled to 1000+ employees.",
  },
  {
    type: "text",
    title: "Role",
    body: "I joined as product designer in the growth team when the company had 300 people. I then grew to senior product designer and then Lead Product Designer, as well as interim product lead.",
  },
  {
    type: "text",
    title: "Impact",
    body: "I contributed to the re-design of the onboarding flow in all platforms, web, iOS and Android. Aligned multiple areas within the organization to ship the new flow with their respective features and deadlines. Put in place notifications, activation and experimentation tactics. Put in place design critiques rituals, motion design guidelines and ways of working. Fully re-designed the hardware e-shop. Increased sign-up metrics with market-specific improvements of the KYC and document upload flows.",
  },
  { type: "assets", srcs: ["/zettle1.png"] },
  { type: "assets", srcs: ["/zettle6.gif", "/zettle7.gif"] },
  { type: "assets", srcs: ["/zettle2.png"] },
  { type: "assets", srcs: ["/zettle4.png", "/zettle5.gif"] },
  { type: "assets", srcs: ["/zettle3.png"] },

  { type: "header", icon: "/minesquad.png", name: "Minesquad" },
  { type: "text", body: "An iOS minesweeper give back game." },
  {
    type: "text",
    title: "Role",
    body: "From concept to delivery, I have made almost everything in this app. I wanted to find a way to use what I know to benefit society. This minesweeper collects money to remove real landmines in the world. I partnered with Fredrik Johansson for the 3D model and animation, and Josef Falkensjöld for the music.",
  },
  {
    type: "text",
    title: "Impact",
    body: "Signed a partnership with The HALO Trust, the biggest non-profit organisation in the world for mine removal. I am donating 50% of my profits to them. So far 150+ downloads :D",
  },
  { type: "assets", srcs: ["/minesquad1.png"] },
  { type: "assets", srcs: ["/minesquad2.png"] },
  { type: "assets", srcs: ["/minesquad3.png"], narrow: true },
  { type: "assets", srcs: ["/msvid1.mp4", "/msvid2.mp4", "/msvid3.mp4", "/msvid4.mp4"] },

  { type: "header", icon: "/datasweeper.png", name: "Datasweeper" },
  { type: "text", body: "A MacOS app to clean your Mac, powered by on-device AI safety scoring." },
  {
    type: "text",
    title: "Role",
    body: "Conceptualised and shipped solo. I needed to clean my \"system data\" that was very hard to find. Apps were I believed too expensive. So I solved my own problem, started to have fun with it and released it to the world.",
  },
  {
    type: "text",
    title: "Impact",
    body: "So far got 10+ customers :D",
  },
  { type: "video", src: "/dsvid1.mp4" },
  { type: "video", src: "/dsvid2.mp4" },

  { type: "header", icon: "/pictokit.png", name: "PictoKit" },
  { type: "text", body: "Your shortcut to icons, special characters, pictures and gifs on MacOS." },
  {
    type: "text",
    title: "Role",
    body: "Conceptualised to shipped. I spent a lot of time finding the right icons, finding special characters, pictures and gifs. I did not want to have to open the browser, so I solved my own problem.",
  },
  {
    type: "text",
    title: "Impact",
    body: "Released it to the world for free. 300+ users so far :D",
  },
  { type: "video", src: "/pictokit_demo_small.mp4" },
  { type: "assets", srcs: ["/picto1.png"] },
  { type: "assets", srcs: ["/picto2.png"] },
  { type: "assets", srcs: ["/picto3.png"] },
];

const TEXT_W = "w-[min(560px,92%)]";
const ASSET_W = "w-[min(1200px,94%)]";

// Intrinsic dimensions for every asset: the browser reserves the exact space
// before anything loads, so the feed's layout NEVER shifts. Stable layout is
// what keeps the loop-wrap math and seed centering exact.
const DIMS: Record<string, [number, number]> = {
  "/depict1.png": [3392, 1744],
  "/depict2.png": [3392, 1744],
  "/depict3.png": [1704, 1744],
  "/depict4.png": [1704, 1744],
  "/depict5.png": [3392, 1744],
  "/depict6.png": [3392, 1744],
  "/zettle1.png": [3392, 1744],
  "/zettle2.png": [3392, 1744],
  "/zettle3.png": [3392, 1744],
  "/zettle4.png": [1600, 1200],
  "/minesquad1.png": [3392, 1744],
  "/minesquad2.png": [3392, 1744],
  "/minesquad3.png": [1600, 1200],
  "/picto1.png": [3644, 1874],
  "/picto2.png": [3644, 1874],
  "/picto3.png": [3644, 1874],
  "/brick0.png": [3644, 1874],
  "/brick1.png": [3644, 1874],
  "/brick2.png": [3644, 1874],
  "/brick3.png": [2400, 2400],
  "/brick4.png": [2400, 2400],
  "/brick5.png": [3644, 1874],
  "/zettle5.gif": [800, 600],
  "/zettle6.gif": [1600, 1200],
  "/zettle7.gif": [1600, 1200],
  "/depictvid1.mp4": [1080, 1080],
  "/depictvid2.mp4": [1824, 1080],
  "/dsvid1.mp4": [1976, 1080],
  "/dsvid2.mp4": [1452, 1080],
  "/msvid1.mp4": [1000, 1000],
  "/msvid2.mp4": [1000, 1000],
  "/msvid3.mp4": [1000, 1000],
  "/msvid4.mp4": [1000, 1000],
  "/pictokit_demo_small.mp4": [1696, 1080],
};

const aspectStyle = (src: string): React.CSSProperties | undefined => {
  const d = DIMS[src];
  return d ? { aspectRatio: `${d[0]} / ${d[1]}` } : undefined;
};

// Video that only plays (and decodes) while near the viewport — with three
// loop copies of the feed, always-on autoplay melts phones.
function FeedVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Safari: React doesn't render the muted attribute into SSR HTML, and
    // Safari only autoplays muted video — force the property before playing
    v.muted = true;
    v.defaultMuted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "300px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
      style={{ ...aspectStyle(src), ...style }}
    />
  );
}

function FeedBlockView({ block }: { block: FeedBlock }) {
  if (block.type === "header") {
    return (
      <div data-feed-header className={`${TEXT_W} flex items-center gap-3 pt-20 pb-2`}>
        <img
          src={block.icon}
          alt={block.name}
          className={`w-10 h-10 rounded-xl ${block.whiteIcon ? "bg-white p-1 object-contain" : ""}`}
        />
        <span className="text-[16px] font-medium text-white">{block.name}</span>
      </div>
    );
  }
  if (block.type === "text") {
    return (
      <div className={`${TEXT_W} flex flex-col gap-2 py-2`}>
        {block.title && (
          <span className="text-[15px] font-medium text-white">{block.title}</span>
        )}
        <p className="text-[15px] leading-relaxed text-white/60">{block.body}</p>
      </div>
    );
  }
  if (block.type === "video") {
    return (
      <div className={`${block.narrow ? TEXT_W : ASSET_W} flex flex-col gap-2`}>
        <FeedVideo
          src={block.src}
          className="w-full h-auto rounded-xl"
          // exception: the source video has a white line baked into its bottom edge
          style={
            block.src === "/depictvid2.mp4"
              ? { clipPath: "inset(0 0 2px 0 round 12px)" }
              : undefined
          }
        />
        {block.caption && <span className="text-[13px] text-white/40">{block.caption}</span>}
      </div>
    );
  }
  // assets — pairs render side by side, four make a 2x2 grid
  return block.srcs.length > 1 ? (
    <div className={`${ASSET_W} grid grid-cols-2 gap-3`}>
      {block.srcs.map((src) =>
        src.endsWith(".mp4") ? (
          <FeedVideo key={src} src={src} className="w-full h-auto rounded-xl" />
        ) : (
          <img
            key={src}
            src={src}
            alt="Work asset"
            width={DIMS[src]?.[0]}
            height={DIMS[src]?.[1]}
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-xl"
          />
        )
      )}
    </div>
  ) : (
    <img
      src={block.srcs[0]}
      alt="Work asset"
      width={DIMS[block.srcs[0]]?.[0]}
      height={DIMS[block.srcs[0]]?.[1]}
      loading="lazy"
      decoding="async"
      className={`${block.narrow ? TEXT_W : ASSET_W} h-auto rounded-xl`}
    />
  );
}

/**
 * Forever-scrolling vertical feed (plkv-style focus mode). The list renders
 * three times; when the scroll position drifts out of the middle copy it
 * silently jumps back by one copy — scrolling never ends in either direction.
 */
export function WorkFeed({ initialSrc }: { initialSrc?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // While an arrow-triggered smooth scroll is in flight, the loop-wrap teleport
  // must not fire — it would shift the scroll mid-animation and strand the jump
  // at the copy seam (which sat in the middle of the Zettle section).
  const jumping = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ready = false;

    // Center the clicked asset (middle copy) so focus mode opens exactly on
    // the media the visitor pressed; fall back to the top of the middle copy.
    // Every asset has intrinsic dimensions, so layout is stable immediately —
    // one positioning pass is exact.
    const position = () => {
      if (initialSrc) {
        const matches = el.querySelectorAll<HTMLElement>(
          `img[src="${initialSrc}"], video[src="${initialSrc}"]`
        );
        const target = matches[1] ?? matches[0];
        if (target) {
          const r = target.getBoundingClientRect();
          const c = el.getBoundingClientRect();
          el.scrollTop += r.top - c.top - (c.height - r.height) / 2;
          return;
        }
      }
      const third = el.scrollHeight / 3;
      if (third > el.clientHeight) el.scrollTop = third;
    };
    position();
    const t = setTimeout(() => {
      ready = true;
    }, 150);

    const wrap = () => {
      const third = el.scrollHeight / 3;
      if (el.scrollTop < third * 0.5) el.scrollTop += third;
      else if (el.scrollTop > third * 1.5) el.scrollTop -= third;
    };
    const onScroll = () => {
      if (!ready) return;
      if (jumping.current) {
        // wait for the smooth jump to settle, then normalize invisibly
        clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(() => {
          jumping.current = false;
          wrap();
        }, 160);
        return;
      }
      wrap();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      clearTimeout(settleTimer.current);
      el.removeEventListener("scroll", onScroll);
    };
  }, [initialSrc]);

  // Arrows jump to the previous / next project section top
  const jumpToSection = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const containerTop = el.getBoundingClientRect().top;
    const tops = [...el.querySelectorAll<HTMLElement>("[data-feed-header]")].map(
      (h) => h.getBoundingClientRect().top - containerTop + el.scrollTop
    );
    const current = el.scrollTop;
    const target =
      dir > 0
        ? tops.find((t) => t > current + 10)
        : [...tops].reverse().find((t) => t < current - 10);
    if (target !== undefined) {
      jumping.current = true;
      // safety: if the scroll never fires (already at target), release the lock
      clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        jumping.current = false;
      }, 400);
      el.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={ref} className="w-full h-full overflow-y-auto scrollbar-hide">
        {/* extra top padding on mobile clears the fixed × header */}
        <div className="flex flex-col items-center gap-3 pb-3 pt-24 md:pt-3">
          {[0, 1, 2].map((copy) =>
            FEED.map((block, i) => <FeedBlockView key={`${copy}-${i}`} block={block} />)
          )}
        </div>
      </div>

      {/* Up / down navigation */}
      <div className="absolute right-5 bottom-5 z-10 flex flex-col gap-2">
        {[
          { Icon: ChevronUp, dir: -1, label: "Previous project" },
          { Icon: ChevronDown, dir: 1, label: "Next project" },
        ].map(({ Icon, dir, label }) => (
          <motion.button
            key={label}
            aria-label={label}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
            style={{ backgroundColor: "#171719" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => jumpToSection(dir)}
          >
            <Icon className="w-4 h-4" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
