import { motion } from "framer-motion";
import { QuoteCard, Quote } from "./QuoteCard";

const snippets = [
  "Married. Dad of three.",
  "French expat. Living in the North of Sweden.",
  "Assumed fan of the show How things work.",
  "Doing Squash, Judo, Swimming, and walking.",
  "Played video games at 3, and still to this day feels like interacting with a screen is magical.",
];

const principles = [
  "Converge for decisions",
  "Disperse for execution",
  "Execute small & fast",
  "Envision big & thoughtfully",
  "Visuals over manuals",
  "Don't simplify, make it easy",
  "Details, details, details",
  "Solutions already exists, just look around",
];

const services = [
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
];

const workedWith = [
  "Depict ai",
  "Validio",
  "Curb food",
  "PayPal",
  "iZettle",
  "Daresay",
  "Ikea",
  "Microsoft",
  "ABB",
  "Renault",
  "Canal+",
  "Ericsson",
];

const quotes: Quote[] = [
  {
    name: "John Tan",
    role: "CEO / Founder",
    avatar: "/john.jpeg",
    collapsible: true,
    rotation: -1.5,
    text: "Charles is one of the best leaders I have ever worked with. He never ceases to amaze me with how he inspires and builds high-trust, high-performance teams, without shying away from difficult situations.\n\nHe has a brilliant ability to seamlessly zoom out on vision/strategy, and zoom in on all aspects of design execution, making him instrumental in driving design/product/tech organizations that consistently delivered on strong outcomes.\n\nHe always takes the time to sincerely care for people, balancing it with strong purpose and clear processes to bring a multiplier effect everywhere he goes. Charles is a true superstar hire, and more importantly, he has made a genuinely positive impact on me and the people around him.",
  },
  {
    name: "Keren Tal",
    role: "Product Design @ Motherbrain",
    avatar: "/keren.jpeg",
    collapsible: true,
    rotation: 1.2,
    text: "I've had the pleasure to work with Charles since 2015 and can sincerely say that he is one of the best and most versatile designers I've met.\n\nAs he masters both design leadership and craftsmanship, Charles is that person who can deliver both high-level visions and pixel-perfect designs.\n\nHis work is well thought out and I'm often impressed by his way to convey the message, process or user need behind it in a visual and engaging way.\n\nTo top all that, he is the nicest, most humble guy whom many find inspiring.\n\nThe team that gets Charles onboard is a truly lucky one.",
  },
  {
    name: "Jason Gregory",
    role: "Product & Design Leader",
    avatar: "/jason.jpeg",
    rotation: -0.8,
    text: "I had the great privilege of working with Charles at Zettle. An inspirational leader and holistic design thinker. I look forward to a future where one day we may work together again.",
  },
];

export const AboutSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="py-16 max-w-[500px] mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Designing crafted software
        <br />
        that customers love
      </h2>
      <p className="text-lg" style={{ color: "#75777A" }}>
        I&apos;m Charles, an indie software designer and builder who turns
        problems into opportunities, ideas into products.
      </p>

      {/* Nuggets */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Nuggets</h3>
        <ul className="space-y-1">
          {snippets.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quote 1 */}
      <div className="mt-16">
        <QuoteCard quote={quotes[0]} />
      </div>

      {/* Principles */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Principles</h3>
        <ul className="space-y-1">
          {principles.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quote 2 */}
      <div className="mt-16">
        <QuoteCard quote={quotes[1]} />
      </div>

      {/* Domains */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Domains</h3>
        <ul className="space-y-1">
          {services.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Quote 3 */}
      <div className="mt-16">
        <QuoteCard quote={quotes[2]} />
      </div>

      {/* Worked at & with */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Worked at &amp; with</h3>
        <ul className="space-y-1">
          {workedWith.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
};
