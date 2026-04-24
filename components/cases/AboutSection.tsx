import { motion } from "framer-motion";

const snippets = [
  "Married. Dad of three.",
  "French, living in the North of Sweden.",
  "Assumed fan of How things work.",
  "Training Squash, Judo, Swimming, and more.",
];

const principles = [
  "Converge for decisions",
  "Disperse for execution",
  "Execute small & fast",
  "Envision big & thoughtfully",
  "Visuals over manuals",
  "Don't simplify, make it easy",
  "Details, details, details",
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

      {/* Snippets */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Snippets</h3>
        <ul className="space-y-1">
          {snippets.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Design & Work principles */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">
          Design &amp; Work principles
        </h3>
        <ul className="space-y-1">
          {principles.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Services</h3>
        <ul className="space-y-1">
          {services.map((item) => (
            <li key={item} className="text-base font-light">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Work at and with */}
      <section className="mt-16">
        <h3 className="text-base font-medium mb-4">Work at and with</h3>
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
