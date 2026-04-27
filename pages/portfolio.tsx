import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/ThemeContext";
import { AboutSection } from "@/components/cases/AboutSection";
import { CreationSection } from "@/components/cases/CreationSection";
import { WorkSection } from "@/components/cases/WorkSection";
import { Home, Sun, Moon } from "lucide-react";

const sections = [
  { slug: "work", label: "Work" },
  { slug: "creation", label: "Creation" },
  { slug: "about", label: "About" },
] as const;

type SectionSlug = (typeof sections)[number]["slug"];

export default function Portfolio() {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SectionSlug>(sections[0].slug);

  useEffect(() => {
    const { section } = router.query;
    if (
      typeof section === "string" &&
      sections.some((s) => s.slug === section)
    ) {
      setActiveTab(section as SectionSlug);
    }
  }, [router.query]);

  const handleTabClick = (slug: SectionSlug) => {
    setActiveTab(slug);
    router.replace({ query: { section: slug } }, undefined, { shallow: true });
  };

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
      {/* Top bar: progressive blur layers */}
      {[4, 3, 2, 1].map((i) => (
        <div
          key={i}
          className="fixed top-0 left-0 right-0 z-20 pointer-events-none"
          style={{
            height: `${i * 25}px`,
            backdropFilter: `blur(${i * 1.5}px)`,
            WebkitBackdropFilter: `blur(${i * 1.5}px)`,
            maskImage: `linear-gradient(to bottom, black 0%, transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, transparent 100%)`,
          }}
        />
      ))}
      {/* Top bar: color fade */}
      <div
        className="fixed top-0 left-0 right-0 z-20 h-[100px] pointer-events-none"
        style={{
          background:
            resolvedTheme === "dark"
              ? "linear-gradient(to bottom, rgba(24,24,24,0.85) 0%, rgba(24,24,24,0.5) 35%, rgba(24,24,24,0) 100%)"
              : "linear-gradient(to bottom, rgba(232,232,232,0.85) 0%, rgba(232,232,232,0.5) 35%, rgba(232,232,232,0) 100%)",
        }}
      />

      {/* Top bar: Home | Nav pill | Theme toggle */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <Link
          href="/"
          className="p-3 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white pointer-events-auto"
          style={{ color: "#75777A" }}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </Link>

        {/* Nav pill */}
        <nav className="flex items-center gap-1 rounded-full px-1.5 py-1.5 shadow-lg border border-black/[0.06] dark:border-white/[0.08] bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-xl pointer-events-auto">
          {sections.map((section) => (
            <button
              key={section.slug}
              onClick={() => handleTabClick(section.slug)}
              className={`relative px-3 sm:px-4 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                activeTab === section.slug
                  ? "text-light-bg dark:text-dark-bg"
                  : "hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              style={
                activeTab !== section.slug ? { color: "#75777A" } : undefined
              }
            >
              {activeTab === section.slug && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white"
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          ))}
        </nav>

        <motion.button
          onClick={toggleTheme}
          className="p-3 pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5" style={{ color: "#e8e8e8" }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: "#181818" }} />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "work" ? (
              <WorkSection key="work" />
            ) : activeTab === "creation" ? (
              <CreationSection key="creation" />
            ) : (
              <AboutSection key="about" />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
