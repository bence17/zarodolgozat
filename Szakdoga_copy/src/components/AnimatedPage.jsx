import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const AnimatedPage = ({ children, ...props }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        {...props}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedPage
