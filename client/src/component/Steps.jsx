import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'motion/react'

const Steps = () => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center my-32 px-4'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <motion.h1
        className='text-3xl sm:text-4xl font-semibold mb-3 text-gray-900'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        How it works
      </motion.h1>

      <motion.p
        className='text-lg text-gray-500 mb-12 text-center max-w-md'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Transform your words into stunning images instantly
      </motion.p>

      {/* Steps list */}
      <div className='space-y-4 w-full max-w-3xl'>
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className='flex items-center gap-5 p-5 px-8 bg-white shadow-sm border border-gray-100
              rounded-xl cursor-pointer hover:shadow-md hover:border-indigo-200
              transition-all duration-300 group'
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.5, type: 'spring', stiffness: 120 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01, x: 4 }}
          >
            {/* Step number */}
            <span className='text-xs font-bold text-indigo-400 w-5 shrink-0 group-hover:text-indigo-600 transition-colors'>
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <motion.div
              className='p-2 bg-indigo-50 rounded-lg shrink-0 group-hover:bg-indigo-100 transition-colors'
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <img width={28} src={item.icon} alt='' />
            </motion.div>

            {/* Text */}
            <div>
              <h2 className='font-semibold text-gray-800 mb-0.5'>{item.title}</h2>
              <p className='text-sm text-gray-500 leading-relaxed'>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps