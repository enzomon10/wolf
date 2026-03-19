import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full overflow-x-hidden" // <--- ESTA CLASE ES LA CLAVE
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;