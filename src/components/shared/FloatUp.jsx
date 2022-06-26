import { motion } from "framer-motion";

export default function FloatUp({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: [100, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
