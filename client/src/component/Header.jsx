import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/App.Context'

const Header = () => {
 const {user,setShowLogin}=useContext(AppContext)
 const navigate=useNavigate()
const onClickHandler=()=>{
  if(user)
  {
    navigate('/result')
  }
  else{
     setShowLogin(true);
  }
}
  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center my-20 px-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Badge */}
      <motion.div
        className='inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border
          border-violet-200 shadow-sm text-stone-500 text-sm mb-8'
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
      >
        <span className='w-2 h-2 rounded-full bg-violet-500 animate-pulse' />
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" className='w-4' />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className='text-5xl max-w-[320px] sm:text-7xl sm:max-w-[640px] mx-auto font-bold
          leading-tight tracking-tight'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        Your Imagination,{' '}
        <span className='bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500
          bg-clip-text text-transparent'>
          Instantly Visualized.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className='text-base sm:text-lg text-gray-500 max-w-xl mx-auto mt-6 leading-relaxed'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Turn ideas into beautiful AI-generated images with a single prompt.
        Fast, effortless, and endlessly creative.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onClickHandler}
        className='relative inline-flex items-center gap-3 mt-10 px-10 py-3 rounded-full
          bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-medium
          shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:opacity-95 transition-all duration-300'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow ring */}
        <span className='absolute inset-0 rounded-full bg-gradient-to-r from-violet-500
          to-fuchsia-500 opacity-20 blur-md animate-pulse pointer-events-none' />
        Generate Images
        <img className='h-5' src={assets.star_group} alt="" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className='flex flex-wrap justify-center items-center gap-3 mt-16'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.img
            key={index}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            alt={`AI generated artwork ${index + 1}`}
            width={80}
            className='rounded-2xl shadow-md cursor-pointer max-sm:w-14 object-cover
              ring-2 ring-white'
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 1.1 + index * 0.08,
              duration: 0.5,
              type: 'spring',
              stiffness: 200
            }}
            whileHover={{ scale: 1.15, y: -6, rotate: 2,
              transition: { duration: 0.2 } }}
          />
        ))}
      </motion.div>

      {/* Social proof */}
      <motion.div
        className='flex items-center gap-2 mt-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        {/* Mini avatars */}
        <div className='flex -space-x-2'>
          {[assets.sample_img_1, assets.sample_img_2, assets.sample_img_1].map((src, i) => (
            <img
              key={i}
              src={src}
              className='w-6 h-6 rounded-full ring-2 ring-white object-cover'
              alt=""
            />
          ))}
        </div>
        <p className='text-xs sm:text-sm text-neutral-400'>
          Join <span className='text-violet-500 font-medium'>50,000+</span> creators generating stunning artwork every day.
        </p>
      </motion.div>

    </motion.div>
  )
} 

export default Header