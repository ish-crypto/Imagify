import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Discreption = () => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold mb-2'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Create AI Images
      </motion.h1>

      <motion.p
        className='text-gray-500 mb-8'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Turn your imagination into visuals
      </motion.p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>

        {/* Image */}
        <motion.img
          src={assets.sample_img_1}
          alt=""
          className='w-80 xl:w-96 rounded-lg shadow-md'
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, rotate: 1 }}
        />

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className='text-3xl font-medium max-w-lg mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Introducing the AI-Powered Text to Image Generator
          </motion.h2>

          <motion.p
            className='text-gray-600 mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few clicks.
            Imagine it, describe it, and watch it come to life instantly.
          </motion.p>

          <motion.p
            className='text-gray-600 mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds.
          </motion.p>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Discreption