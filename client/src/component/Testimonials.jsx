import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'motion/react'

const Testimonials = () => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center my-20 py-12 px-4'
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
        Customer Testimonials
      </motion.h1>

      <motion.p
        className='text-gray-500 mb-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        What our users are saying
      </motion.p>

      {/* Cards */}
      <div className='flex flex-wrap gap-6 justify-center max-w-5xl'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className='relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-72
              cursor-pointer flex flex-col'
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.2 + index * 0.15,
              duration: 0.5,
              type: 'spring',
              stiffness: 120
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.15)',
              borderColor: '#a5b4fc'
            }}
          >
            {/* Decorative quote mark */}
            <span className='absolute top-4 right-5 text-5xl text-indigo-100 font-serif leading-none select-none'>
              "
            </span>

            {/* Avatar + identity */}
            <div className='flex items-center gap-3 mb-4'>
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className='rounded-full w-12 h-12 object-cover ring-2 ring-indigo-100'
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
              <div>
                <h2 className='font-semibold text-gray-800 text-sm'>
                  {testimonial.name}
                </h2>
                <span className='text-xs text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full'>
                  {testimonial.role}
                </span>
              </div>
            </div>

            {/* Stars */}
            <div className='flex gap-0.5 mb-3'>
              {Array(testimonial.stars).fill(0).map((_, i) => (
                <motion.img
                  key={i}
                  src={assets.rating_star}
                  alt='star'
                  width={16}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.4 + index * 0.15 + i * 0.08,
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </div>

            {/* Quote */}
            <p className='text-gray-600 text-sm leading-relaxed'>
              "{testimonial.text}"
            </p>
          </motion.div>
        ))}
      </div>

    </motion.div>
  )
}

export default Testimonials