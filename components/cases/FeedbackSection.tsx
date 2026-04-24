import { motion } from "framer-motion";
import { QuoteCard, Quote } from "./QuoteCard";

const quotes: Quote[] = [
  {
    name: "John Tan",
    role: "CEO / Founder",
    avatar: "/john.jpeg",
    text: "Charles is one of the best leaders I have ever worked with. He never ceases to amaze me with how he inspires and builds high-trust, high-performance teams, without shying away from difficult situations.\n\nHe has a brilliant ability to seamlessly zoom out on vision/strategy, and zoom in on all aspects of design execution, making him instrumental in driving design/product/tech organizations that consistently delivered on strong outcomes.\n\nHe always takes the time to sincerely care for people, balancing it with strong purpose and clear processes to bring a multiplier effect everywhere he goes. Charles is a true superstar hire, and more importantly, he has made a genuinely positive impact on me and the people around him.",
  },
  {
    name: "Keren Tal",
    role: "Product Design @ Motherbrain",
    avatar: "/keren.jpeg",
    text: "I've had the pleasure to work with Charles since 2015 and can sincerely say that he is one of the best and most versatile designers I've met.\n\nAs he masters both design leadership and craftsmanship, Charles is that person who can deliver both high-level visions and pixel-perfect designs.\n\nHis work is well thought out and I'm often impressed by his way to convey the message, process or user need behind it in a visual and engaging way.\n\nTo top all that, he is the nicest, most humble guy whom many find inspiring.\n\nThe team that gets Charles onboard is a truly lucky one.",
  },
  {
    name: "Jason Gregory",
    role: "Product & Design Leader",
    avatar: "/jason.jpeg",
    text: "I had the great privilege of working with Charles at Zettle. An inspirational leader and holistic design thinker. I look forward to a future where one day we may work together again.",
  },
];

export const FeedbackSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="py-16 space-y-12 flex flex-col items-center"
    >
      {quotes.map((quote, i) => (
        <QuoteCard key={quote.name} quote={quote} index={i} />
      ))}
    </motion.div>
  );
};
