import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Quote {
  name: string;
  role: string;
  avatar: string;
  text: string;
  collapsible?: boolean;
  rotation?: number;
}

interface QuoteCardProps {
  quote: Quote;
  index?: number;
}

const COLLAPSED_HEIGHT = 144; // ~6 lines

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const isCollapsible = quote.collapsible ?? false;
  const contentRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState(COLLAPSED_HEIGHT);

  useEffect(() => {
    if (contentRef.current) {
      setFullHeight(contentRef.current.scrollHeight);
    }
  }, [quote.text]);

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="max-w-[500px] rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] px-6 py-6 cursor-pointer select-none"
      style={{ rotate: quote.rotation ?? 0 }}
      onClick={() => isCollapsible && setExpanded(!expanded)}
    >
      {/* Attribution */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src={quote.avatar}
          alt={quote.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">{quote.name}</p>
          <p className="text-sm" style={{ color: "#75777A" }}>
            {quote.role}
          </p>
        </div>
      </div>

      {/* Quote text */}
      <motion.div
        className="overflow-hidden"
        animate={{
          height: !isCollapsible
            ? "auto"
            : expanded
              ? fullHeight
              : COLLAPSED_HEIGHT,
        }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={
          isCollapsible && !expanded
            ? {
                maskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
              }
            : {
                maskImage: "none",
                WebkitMaskImage: "none",
              }
        }
      >
        <div ref={contentRef} className="space-y-4">
          {quote.text.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </motion.blockquote>
  );
};
