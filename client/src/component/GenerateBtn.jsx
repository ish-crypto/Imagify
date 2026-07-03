import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { AppContext } from '../context/App.Context'

const GenerateBtn = () => {
  const navigate = useNavigate()

  const { user, setShowLogin } = useContext(AppContext)
 
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
      className='pb-16 text-center px-4'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >

      {/* Heading */}
      <motion.h1
        className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        See the magic.{' '}
        <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
          Try now
        </span>
      </motion.h1>

      {/* CTA Button with pulse ring */}
      <motion.div
        className='relative inline-block'
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 150 }}
        viewport={{ once: true }}
      >

        {/* Animated glow ring */}
        <span className='absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500
          opacity-30 blur-md animate-pulse pointer-events-none' />

        <motion.button
          onClick={onClickHandler}
          className='relative inline-flex items-center gap-2 px-12 py-3 rounded-full
            bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium
            hover:shadow-lg hover:shadow-fuchsia-200 transition-shadow duration-300'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Generate Images
          <motion.img
            src={assets.star_group}
            alt=''
            className='h-5'
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.button>

      </motion.div>

    </motion.div>
  )
}

export default GenerateBtn