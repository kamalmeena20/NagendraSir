import { motion } from "framer-motion";

/* PAGE LOAD ANIMATION */
export default function PageAnimation({ children }) {
    return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

/* SCROLL REVEAL ANIMATION */
export function ScrollReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

/* HOVER SCALE ANIMATION */
export function HoverScale({ children }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      {children}
    </motion.div>
  );
}

/* STAGGER CONTAINER */
export function StaggerContainer({ children }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

/* STAGGER ITEM */
export function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {children}
    </motion.div>
  );
}