import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import { Linkedin, Calendar, Dribbble, X } from "lucide-react";
import Image from "next/image";
import Head from "next/head";
import { WorkPile, ALL_ASSETS } from "@/components/WorkPile";
import { WorkFeed } from "@/components/WorkFeed";
import { MobileWorkStrip } from "@/components/MobileWorkStrip";
import { ClientTicker } from "@/components/ClientTicker";
import { QuoteStack } from "@/components/QuoteStack";
import { AppsGrid } from "@/components/AppsGrid";
import { RevealText } from "@/components/RevealText";

const inter = Inter({ subsets: ["latin"] });

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});


const contactButtons = [
  { href: "https://www.linkedin.com/in/charles-binet/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://cal.com/charlesbinet/30min?overlayCalendar=true", label: "Book a call", Icon: Calendar },
  { href: "https://dribbble.com/charles_b", label: "Dribbble", Icon: Dribbble },
];

// Muted body with white inline emphasis, plkv-style
const Em = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white">{children}</span>
);

export default function Home() {
  const asideRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [seedSrc, setSeedSrc] = useState<string | undefined>(undefined);

  // Easter egg: nuggets unlock after playing through all the work assets ~3 times
  const [nuggetsUnlocked, setNuggetsUnlocked] = useState(false);
  const nuggetsRef = useRef<HTMLDivElement>(null);
  const unlockNuggets = useCallback(() => setNuggetsUnlocked(true), []);
  useEffect(() => {
    if (!nuggetsUnlocked) return;
    const t = setTimeout(
      () => nuggetsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      400
    );
    return () => clearTimeout(t);
  }, [nuggetsUnlocked]);

  // Escape leaves focus mode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocusMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The portfolio trigger lives inside kugiri-split text; the split clones DOM
  // nodes, which drops React's synthetic handlers — so delegate the click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-open-portfolio]")) {
        setSeedSrc(undefined);
        setFocusMode(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Content fades out progressively as it scrolls up toward the fixed header.
  // Text dissolves line by line thanks to kugiri's [data-line] splits; other
  // blocks (badges, cards, quote paragraphs) fade as .fade-unit elements.
  useEffect(() => {
    const aside = asideRef.current;
    const header = headerRef.current;
    if (!aside || !header) return;
    const FADE = 72; // px of travel over which a unit dissolves
    let raf = 0;
    const update = () => {
      raf = 0;
      const headerBottom = header.getBoundingClientRect().bottom;
      aside
        .querySelectorAll<HTMLElement>("[data-line], .fade-unit")
        .forEach((el) => {
          const top = el.getBoundingClientRect().top;
          const p = Math.min(1, Math.max(0, (top - headerBottom) / FADE));
          el.style.opacity = String(p * p); // ease-in — snappy dissolve near the header
        });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    aside.addEventListener("scroll", onScroll, { passive: true });
    // on mobile the page body scrolls, not the aside
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      aside.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main
      className={`${inter.className} min-h-screen text-white antialiased`}
      style={{ backgroundColor: "#0D0D0F", letterSpacing: "-0.01em" }}
    >
      <Head>
        <title>Charles - Product & Design leader</title>
        <meta name="theme-color" content="#0D0D0F" />
        <meta
          name="description"
          content="I fix early SaaS companies' chaos — turning complex, messy products into clear, scalable, and high-converting software."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Charles - Product & Design leader" />
        <meta
          property="og:description"
          content="I fix early SaaS companies' chaos — turning complex, messy products into clear, scalable, and high-converting software."
        />
        <meta property="og:url" content="https://www.charlesbinet.com" />
        <meta property="og:image" content="https://www.charlesbinet.com/avatar.jpeg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Charles - Product & Design leader" />
        <meta
          name="twitter:description"
          content="I fix early SaaS companies' chaos — turning complex, messy products into clear, scalable, and high-converting software."
        />
        <meta name="twitter:image" content="https://www.charlesbinet.com/avatar.jpeg" />
      </Head>

      <div className="flex flex-col md:flex-row md:h-screen">
        {/* Fixed header — persists across normal and focus mode.
            Top padding matches the 20px side padding. */}
        <motion.div
          ref={headerRef}
          className="fixed top-0 left-0 z-30 w-full md:w-1/3 px-5 pt-5 pb-3 flex flex-col gap-2.5"
          {...fadeUp(0)}
        >
          {/* ID card collapses away in focus mode, morphing the header into just the × */}
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{
              height: focusMode ? 0 : "auto",
              opacity: focusMode ? 0 : 1,
              marginBottom: focusMode ? -10 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div
              className="rounded-2xl p-4 flex items-start justify-between gap-4"
              style={{ backgroundColor: "#171719" }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-medium text-white">Charles Binet</span>
                <span className="text-[13px] text-white/50">Product & Design leader</span>
                <span className="text-[13px] text-white/50">SaaS, AI and indie products</span>
              </div>
              <Image
                src="/avatar.jpeg"
                alt="Charles Binet's avatar"
                width={48}
                height={48}
                className="rounded-lg w-12 h-12 object-cover flex-shrink-0"
              />
            </div>
          </motion.div>
          <div className="h-10 relative">
            <AnimatePresence initial={false} mode="wait">
              {focusMode ? (
                <motion.button
                  key="close"
                  aria-label="Close portfolio"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
                  style={{ backgroundColor: "#171719" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFocusMode(false)}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.div
                  key="contacts"
                  className="flex gap-2 h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {contactButtons.map(({ href, label, Icon }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex-1 h-full rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
                      style={{ backgroundColor: "#171719" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Left column — collapses away in focus mode */}
        <aside
          ref={asideRef}
          className={`w-full md:h-screen md:overflow-y-auto scrollbar-hide flex flex-col gap-20 overflow-x-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            focusMode
              ? "max-h-0 overflow-hidden pt-0 pb-0 md:max-h-none md:w-[0%] px-0 opacity-0 pointer-events-none"
              : "max-h-none pt-[248px] pb-10 md:w-1/3 px-5 opacity-100"
          }`}
          style={{
            // Spatial fade near the fixed header: dissolves everything the JS
            // per-unit fade can't reach — card backgrounds included
            maskImage: "linear-gradient(to bottom, transparent 178px, black 250px)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 178px, black 250px)",
          }}
        >
          {/* Mobile-only work strip — right after the header, auto-playing.
              Unmounted in focus mode so its rAF loop doesn't drain the phone. */}
          <motion.div {...fadeUp(0.1)} className="md:hidden">
            {!focusMode && (
              <MobileWorkStrip
                assets={ALL_ASSETS}
                onExplored={unlockNuggets}
                onAssetClick={(src) => {
                  setSeedSrc(src);
                  setFocusMode(true);
                }}
              />
            )}
          </motion.div>

          {/* Statement — both paragraphs together, kugiri line reveals */}
          <div className="flex flex-col gap-4">
            <RevealText className="text-[19px] leading-[1.5] text-white/50" delay={0.15}>
              <Em>I fix early SaaS companies' chaos</Em>, turning complex, messy products into{" "}
              <Em>clear, scalable, and high-converting software</Em>.
            </RevealText>

            <RevealText className="text-[19px] leading-[1.5] text-white/50" delay={0.3}>
              I audit your product, build your foundational design system, scope and execute your
              product flows and website, async.
            </RevealText>
          </div>

          {/* Client ticker */}
          <motion.div {...fadeUp(0.4)}>
            <ClientTicker />
          </motion.div>

          {/* Domains */}
          <motion.div className="grid grid-cols-2 gap-x-4 gap-y-1.5" {...fadeUp(0.45)}>
            {[
              "Zero to One projects",
              "Interface design",
              "Branding",
              "Motion design",
              "Wireframing",
              "Product strategy",
              "Illustration & 3D",
              "Prototyping",
              "Design System",
              "Copywriting",
              "Growth",
            ].map((domain) => (
              <span key={domain} className="fade-unit text-[19px] leading-[1.5] text-white/50">
                {domain}
              </span>
            ))}
          </motion.div>

          {/* Creator of — inline emphasis */}
          <RevealText className="text-[19px] leading-[1.5] text-white/50" delay={0.5}>
            Creator of MacOS apps{" "}
            <a href="https://datasweeper.app" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
              Datasweeper
            </a>
            , and{" "}
            <a href="https://pictokit.app" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
              PictoKit
            </a>
            . iOS minesweeper give back app{" "}
            <a href="https://www.minesquad.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
              Minesquad
            </a>
            . Web app investor tracker{" "}
            <a href="https://www.whalesnest.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">
              Whale's Nest
            </a>
            .
          </RevealText>

          {/* Apps grid */}
          <motion.div {...fadeUp(0.6)}>
            <AppsGrid />
          </motion.div>

          {/* Prompts */}
          <RevealText className="text-[19px] leading-[1.5] text-white/50" delay={0.7}>
            Check out my{" "}
            <button
              data-open-portfolio
              className="text-white hover:opacity-70 transition-opacity cursor-pointer"
            >
              portfolio
            </button>
            , level up your design career with{" "}
            <a
              href="https://adplist.org/mentors/charles-binet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              coaching
            </a>
            , or just{" "}
            <a
              href="https://www.linkedin.com/in/charles-binet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
            >
              connect with me
            </a>{" "}
            to chat.
          </RevealText>

          {/* Quotes from the about page */}
          <motion.div {...fadeUp(0.8)}>
            <QuoteStack />
          </motion.div>

          {/* Principles */}
          <motion.div className="flex flex-col gap-2 pb-8" {...fadeUp(0.9)}>
            <span className="fade-unit text-[19px] leading-[1.5] text-white">Principles</span>
            {[
              "Converge for decisions",
              "Disperse for execution",
              "Execute small & fast",
              "Envision big & thoughtfully",
              "Visuals over manuals",
              "Don't simplify, make it easy",
              "Details, details, details",
              "Solutions already exists, just look around",
            ].map((principle) => (
              <span key={principle} className="fade-unit text-[19px] leading-[1.5] text-white/50">
                {principle}
              </span>
            ))}
          </motion.div>

          {/* Nuggets — easter egg, unlocked by playing through all the work */}
          {nuggetsUnlocked && (
            <motion.div
              ref={nuggetsRef}
              className="flex flex-col gap-2 pb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <span className="fade-unit text-[19px] leading-[1.5] text-white">
                Nuggets (well deserved scroll master!)
              </span>
              {[
                "Married. Dad of three.",
                "French expat. Living in the North of Sweden.",
                "Assumed fan of the show How things work.",
                "Doing Squash, Judo, Swimming, and walking.",
                "Playing video games at 3, I was amazed. To this day, interacting with a screen still feels like magic.",
              ].map((nugget) => (
                <span key={nugget} className="fade-unit text-[19px] leading-[1.5] text-white/50">
                  {nugget}
                </span>
              ))}
            </motion.div>
          )}
        </aside>

        {/* Right column — grows to full screen in focus mode */}
        <motion.section
          className={`relative w-full md:flex-1 md:h-screen ${
            focusMode ? "h-[100dvh]" : "hidden md:block"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Snappy crossfade: the pressed asset scales up as the pile hands
              off to the feed, which opens centered on that same asset */}
          <AnimatePresence initial={false}>
            {focusMode ? (
              <motion.div
                key="feed"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <WorkFeed initialSrc={seedSrc} />
              </motion.div>
            ) : (
              <motion.div
                key="pile"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <WorkPile
                  onExplored={unlockNuggets}
                  onAssetClick={(src) => {
                    setSeedSrc(src);
                    setFocusMode(true);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
}
