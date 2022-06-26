import { motion } from "framer-motion";

export default function FloatRight({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ x: [-80, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
