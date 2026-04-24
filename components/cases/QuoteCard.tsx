import { motion } from "framer-motion";
import Image from "next/image";

export interface Quote {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

interface QuoteCardProps {
  quote: Quote;
  index?: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index = 0 }) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="max-w-[500px] rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] px-6 py-6"
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
      <div className="space-y-4">
        {quote.text.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.blockquote>
  );
};
