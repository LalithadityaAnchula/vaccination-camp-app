import { motion } from "framer-motion";

function ExpandOnHover({ children, noBrighten = false }) {
  const handleHoverStart = (e) => {
    e.target.style.zIndex = "1";
  };

  const handleHoverEnd = (e) => {
    e.target.style.zIndex = "0";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {children}
    </motion.div>
  );
}

export default ExpandOnHover;
