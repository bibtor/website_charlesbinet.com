import { motion } from "framer-motion";

interface CaseStudyPlaceholderProps {
  title: string;
}

export const CaseStudyPlaceholder: React.FC<CaseStudyPlaceholderProps> = ({
  title,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="py-16 max-w-[500px] mx-auto"
    >
      <h2 className="text-2xl font-heading mb-4">{title}</h2>
      <p className="text-lg" style={{ color: "#75777A" }}>
        Coming soon.
      </p>
    </motion.div>
  );
};
